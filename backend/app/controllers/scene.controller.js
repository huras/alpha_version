const db = require("../models/sqlite_db");
const {Scene, Event, Character,EventChoice,Background, Project, EventBackground, EventCharacter } = db;
const { Op } = require("sequelize");

exports.create = (req, res) => {
  console.log('13213=============');
  console.log(req.file);
  console.log('13213=============');
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //check if the image uploaded is from a valid extension
  if (!req.file) {
    res.status(500).send({ msg: 'The app must have a cover image!' })
  };
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.status(500).send({ msg: 'Only image files (jpg, jpeg, png) are allowed for the cover!' })
  };
  const imageName = req.file.filename;

  // Create a Scene
  const scene = {
    nome: req.body.nome,
    cover: imageName,
    ordem: req.body.ordem,
    audio: req.body.audio,
  };

  // Save Scene in the database
  Scene.create(scene)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Scene."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      [Op.like]: `%${title}%`
    }
  } : null;

  Scene.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving scenes.",
        err
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Scene.findByPk(id, {
    include: [
      {
        model: Event,
        as: 'childEvents',
        include: [
          { model: Background, as: 'event_backgrounds'},
          { model: Character, as: 'event_characters'},
          { model: EventChoice, as: 'childEvents'},
          { model: EventChoice, as: 'parentEvents'},
          { model: Character, as: 'speaker'},
          { model: Character, as: 'mugshot'},
          { model: Scene, as: 'parentScene', include: [ { model: Project, as: 'parentProject'}]},
        ],
      },
      { model: Project, as: 'parentProject', include: [ 
        { model: Background, as: 'backgrounds' },
        { model: Character, as: 'characters' },
      ]},
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      debugger
      res.status(500).send({
        message: "Error retrieving Scene with id=" + id,
        ...err
      });
    });
};

//Find events by Scene id using field 'parentSceneId' from Event model
exports.findAllEvents = (req, res) => {
  const id = req.params.id;

  Event.findAll({
    where: {
      parentSceneId: id
    },
    include: [
      {
        model: Character,
        as: 'speaker',
        required: false,
        attributes: ['fullname', 'id']
      },
      {
        model: Character,
        as: 'mugshot',
        required: false,
        attributes: ['image', 'mugshot', 'id']
      },
      {
        model: Character,
        as: 'Characters',
        required: false,
        // attributes: ['image', 'id']
      },
      {
        model: EventChoice,
        as: 'ChildEvents',
        // attributes: ['RelatedEventId'],
      }, 
      {
        model: EventChoice,
        as: 'ParentEvents',
        // attributes: ['EventId']
      }, 
      { model: Background, required: false, attributes: ['image', 'name', 'id'] }, 
      { model: Scene, as: 'parentScene', required: false, attributes: ['id'] },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Events with parentSceneId=" + id + ' ' + err
      });
    });
};

exports.update = async (req, res) => {
  const { scene, project } = req.body;
  const {id, title, order, parentProjectId, childEvents} = scene;

  const t = await db.sequelize.transaction();
  try {

    // Update Scene
    const scene = await db.Scene.findByPk(id, { transaction: t });
    if (!scene) {
      await t.rollback();
      return res.status(404).send({ message: "Scene not found" });
    }

    await scene.update({ title, order, parentProjectId }, { transaction: t });
    
    // Update each Event
    for (const event of childEvents) {
      var { id: eventId, dialogText, speakerId, mugshotId, mugshot, event_backgrounds, event_characters } = event;

      const eventInstance = await db.Event.findByPk(eventId, { transaction: t });
      if (eventInstance) {
        
        console.log("Updating event:", eventId);
        if(!speakerId) speakerId = null;
        if(!mugshotId) mugshotId = null;
        await eventInstance.update({ dialogText, speakerId, mugshotId }, { transaction: t });
        // if(mugshotId){
        //   const mugshot_character = await db.Character.findByPk(mugshotId, { transaction: t });
        //   if (mugshot_character) {
        //     const mugshotata = JSON.stringify((typeof mugshot === 'string') ? JSON.parse(mugshot.mugshot) : mugshot.mugshot);
        //     // mugshot_data = JSON.stringify(JSON.parse(mugshot).mugshot); 
        //     await mugshot_character.update({ mugshot: mugshotata }, { transaction: t });
        //   }
        // }
        console.log("Updated event:", eventId);

        // Update or recreate relationships for Backgrounds
        if (event_backgrounds && event_backgrounds.length) {
          await db.EventBackground.destroy({ where: { EventId: eventId }, transaction: t });
          for (const background of event_backgrounds) {
            await db.EventBackground.create({
              EventId: eventId,
              BackgroundId: background.id
            }, { transaction: t });
          }
        }

        
        // Update or recreate relationships for Characters
        if (event_characters && event_characters.length) {
          await db.EventCharacter.destroy({ where: { EventId: eventId }, transaction: t });
          for (const character of event_characters) {
            await db.EventCharacter.create({
              EventId: eventId,
              CharacterId: character.data.id,
              order: character.EventCharacter.order,
            }, { transaction: t });
          }
        }


      }
    }
    
    // Update project characters
    if (project && project.characters) {
      for (const character of project.characters) {
        const characterInstance = await db.Character.findByPk(character.id, { transaction: t });
        if (characterInstance) {
          character.mugshot = character?.mugshot ? (((typeof character?.mugshot === 'object')) ? JSON.stringify(character?.mugshot) : character?.mugshot) : null;
          await characterInstance.update(character, { transaction: t });
        }
      }
    }

    await t.commit();
    res.send({ message: "Scene updated successfully with all related entities!" });
  } catch (err) {
    await t.rollback();
    res.status(500).send({
      message: "Failed to update Scene and its relationships",
      error: err.stack,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Scene.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Scene was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Scene with id=${id}. Maybe Scene was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Scene with id=" + id
      });
    });
};

// exports.uploadImage = (req, res, err) => {



//   const id = req.params.id;

//   const scene = await Scene.update()

// };