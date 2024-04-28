const db = require("../models/sqlite_db");
const {Scene, Event, Character,EventChoice,Background } = db;
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
    include: {
      model: Event,
      as: 'childEvents',
      include: [
        { model: Background, as: 'event_backgrounds'},
        { model: Character, as: 'event_characters'},
        { model: EventChoice, as: 'childEvents'},
        { model: EventChoice, as: 'parentEvents'},
        { model: Character, as: 'speaker'},
        { model: Character, as: 'mugshot'},
      ],
    }
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

exports.update = (req, res) => {
  const id = req.params.id;

  Scene.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Scene was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Scene with id=${id}. Maybe Scene was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Scene with id=" + id
      });
    });
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