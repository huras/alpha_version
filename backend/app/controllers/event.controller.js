const db = require("../models/sqlite_db");

const {Scene, EventChoice, Background, Character, Event} = db;
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

  // Create a Event
  const event = {
    nome: req.body.nome,
    cover: imageName,
    ordem: req.body.ordem,
    audio: req.body.audio,
  };

  // Save Event in the database
  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event."
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

  Event.findAll({ 
      where: condition,
      order: [
        ['createdAt', 'ASC'],
      ],
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

   Event.findByPk(Number.parseInt(id), {
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
        as: 'EventCharacters',
        required: false,
        attributes: ['image', 'id']
      },
      {
        model: EventChoice,
        as: 'ChildEvents'
      }, 
      {
        model: EventChoice,
        as: 'ParentEvents'
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
        message: "Error retrieving Event with id=" + id + ' ' + err
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Event.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};

// exports.uploadImage = (req, res, err) => {



//   const id = req.params.id;

//   const event = await Event.update()

// };