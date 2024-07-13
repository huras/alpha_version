const db = require("../models/sqlite_db");

const {Scene, Event, Character,EventChoice,Background, Project, EventBackground, EventCharacter } = db;
const { Op } = require("sequelize");
const { openai } = require("../services/chatgpt_api");
const project = require("../controllers/project.controller.js");
const {VNEvent, SceneContinuator, StoryContextKeeper} = require("../text_generators/event.generator.js");

exports.attachFresh = async (req, res) => {
  
  const { parentScene, order } = req.body;

  // Validate request
  // if (!req.body.nome) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  //check if the image uploaded is from a valid extension
  // if (!req.file) {
  //   res.status(500).send({ msg: 'The app must have a cover image!' })
  // };
  // if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
  //   res.status(500).send({ msg: 'Only image files (jpg, jpeg, png) are allowed for the cover!' })
  // };
  // const imageName = req.file.filename;

  // Create a Event
  const event = {
    order: req.body.order,
  };

  // const data = await Event.create(event)

  // Save Event in the database
  await Event.create(event)
    .then(data => {

      //relate event to scene
      data.setParentScene(parentScene);
      data.save();
      

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

exports.EventBasicInfo = [
  { model: Background, as: 'event_backgrounds' },
  { model: Character, as: 'event_characters' },
  { model: EventChoice, as: 'childChoices'},
  { model: Event, as: 'nextEvents'},
  { model: Event, as: 'prevEvents'},
  { model: EventChoice, as: 'parentEvents'},
  { model: Character, as: 'speaker' },
  { model: Character, as: 'mugshot' },
  { model: Scene, as: 'parentScene'},
];

function isJSON(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

exports.protagonistThinkSomething = async (req, res) => {
  const leaf_event_id = req.body.leaf_event_id;
  const text = req.body.text;
  const min_events = req.body.min_events ?? 3;
  const max_events = req.body.max_events ?? 7;

  const mainLeafEvent = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});
  
  const protagonist = await Character.findOne({where: {is_protagonist: true}});
  const protagonistSpeech =`Protagonist thinks silently: \`${text}\`.`
  const proagonistTalkEvent = await cloneEvent(leaf_event_id, {
    dialogText: JSON.stringify((protagonistSpeech).split(' ').map(word => ({word}))),
    parentEvent: leaf_event_id,
    speakerId: protagonist.id,
    mugshotId: protagonist.id,
  });

  const sceneContinuator = await SceneContinuator.Instantiate({sceneID: mainLeafEvent.parentScene.id});
  const apiTexts = await sceneContinuator.ContinueStory({
      eventID: proagonistTalkEvent.id, 
      min_events, 
      max_events
  });
  
  // try{
    console.log("Creating events with openAI response");
  
    await SceneContinuator.StoreSceneContinuation(apiTexts, proagonistTalkEvent.id);

    console.log("Fetching updated leaf event");
  
    const updated_leaf_event = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});  
  
    res.status(200).send({updated_event: updated_leaf_event});
  // } catch (err) {
  //   debugger
  //   console.error(err);
  //   res.status(500).send({ message: `Error talking with character` });
  // }
}

exports.continueEvent = async (req, res) => {
    const leaf_event_id = req.body.leaf_event_id;
    const min_events = req.body.min_events ? req.body.min_events : 2;
    const max_events = req.body.max_events ? req.body.max_events : 5;

    const mainLeafEvent = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});
    
    const sceneContinuator = await SceneContinuator.Instantiate({sceneID: mainLeafEvent.parentScene.id});
    const apiTexts = await sceneContinuator.ContinueStory({
        eventID: leaf_event_id, 
        min_events, 
        max_events
    });

    // debugger
    try{
    
        console.log("Creating events with openAI response");
    
        await SceneContinuator.StoreSceneContinuation(apiTexts, leaf_event_id);
    
        console.log("Fetching updated leaf event");
        
        const updated_leaf_event = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});  
        
        res.status(200).send({updated_event: updated_leaf_event});
    } catch (err) {
        debugger
        console.error(err);
        res.status(500).send({ message: `Error talking with character` });
    }
}

exports.talkWithCharacter = async (req, res) => {
  const leaf_event_id = req.body.leaf_event_id;
  const char_id = req.body.char_id;
  const text = req.body.text;
  const min_events = req.body.min_events ?? 3;
  const max_events = req.body.max_events ?? 7;
  
  const character = await Character.findByPk(char_id);

  const mainLeafEvent = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});
  
  const protagonist = await Character.findOne({where: {is_protagonist: true}});
  const protagonistSpeech =`Protagonist say: \`${text}\` to ${character.fullname}.`
  const proagonistTalkEvent = await cloneEvent(leaf_event_id, {
    dialogText: JSON.stringify((protagonistSpeech).split(' ').map(word => ({word}))),
    parentEvent: leaf_event_id,
    speakerId: protagonist.id,
    mugshotId: protagonist.id,
  });  

  const sceneContinuator = await SceneContinuator.Instantiate({sceneID: mainLeafEvent.parentScene.id});
  const apiTexts = await sceneContinuator.ContinueStory({
      eventID: proagonistTalkEvent.id, 
      min_events, 
      max_events
  });
  
  // try{
    console.log("Creating events with openAI response");
  
    await SceneContinuator.StoreSceneContinuation(apiTexts, proagonistTalkEvent.id);

    console.log("Fetching updated leaf event");
  
    const updated_leaf_event = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});  
  
    res.status(200).send({updated_event: updated_leaf_event});
  // } catch (err) {
  //   debugger
  //   console.error(err);
  //   res.status(500).send({ message: `Error talking with character` });
  // }
}

const cloneEvent = async (event_id, overrides = {}) => {
  const event = await Event.findByPk(event_id, {include: exports.EventBasicInfo});
  const newEvent = await Event.create({
    order: 999,
    dialogText: event.dialogText,
    parentEvent: event.parentEvent,
    speakerId: event.speakerId,
    mugshotId: event.mugshotId,
    ...overrides,
  });

  //relate event to scene
  newEvent.setParentScene(event.parentScene);
  newEvent.save();

  //relate event to backgrounds
  event.event_backgrounds.forEach(async bg => {
    const newBg = await Background.findByPk(bg.id);
    newEvent.addEvent_backgrounds(newBg);
  });

  //relate event to characters
  event.event_characters.forEach(async char => {
    const newChar = await Character.findByPk(char.id);
    newEvent.addEvent_characters(newChar);
  });

  //relate event to choices
  // event.childChoices.forEach(async choice => {
  //   const newChoice = await EventChoice.findByPk(choice.id);
  //   newEvent.addChildChoice(newChoice);
  // });

  return newEvent;
}
exports.cloneEvent = cloneEvent;

exports.getEventTree = async (req, res) => {
  //Build array of events from the leaf to the root
  const id = req.params.id;
  const eventThread = [];
  var event_id = id;
  //Get parents
  do{
    var leafEvent = await Event.findByPk(event_id, {include: exports.EventBasicInfo});
    leafEvent.setDataValue('event_brothers', await Event.getEventBrothers(event_id));
    eventThread.push(leafEvent);
    event_id = leafEvent.parentEvent ? leafEvent.parentEvent.id : null;
  } while (event_id);

  eventThread.reverse();

  //Get always the first event of nextEvents until there is none
  var nextEvent = eventThread[eventThread.length - 1];
  while(nextEvent.nextEvents.length > 0){
    nextEvent = nextEvent.nextEvents[0];
    nextEvent.setDataValue('event_brothers', await Event.getEventBrothers(nextEvent.id));
    eventThread.push(nextEvent);
  }

  res.send(eventThread);
}

exports.findOne = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }

    const event = await Event.findByPk(id, {
      include: exports.EventBasicInfo,
    });

    if (!event) {
      return res.status(404).send({ message: `Event with id=${id} not found` });
    }

    const eventBrothers = await Event.getEventBrothers(id);
    event.setDataValue('event_brothers', eventBrothers);

    res.send(event);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Error retrieving Event with id=${req.params.id}` });
  }
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

module.exports = exports;