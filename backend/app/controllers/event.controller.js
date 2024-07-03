const db = require("../models/sqlite_db");

const {Scene, Event, Character,EventChoice,Background, Project, EventBackground, EventCharacter } = db;
const { Op } = require("sequelize");
const { openai } = require("../services/chatgpt_api");

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

const EventBasicInfo = [
  { model: Background, as: 'event_backgrounds' },
  { model: Character, as: 'event_characters' },
  { model: EventChoice, as: 'childChoices'},
  { model: Event, as: 'nextEvents'},
  { model: Event, as: 'prevEvents'},
  { model: EventChoice, as: 'parentEvents'},
  { model: Character, as: 'speaker' },
  { model: Character, as: 'mugshot' },
  { model: Scene, as: 'parentScene' }
];

exports.talkWithCharacter = async (req, res) => {
  const leaf_event_id = req.body.leaf_event_id;
  const char_id = req.body.char_id;
  const text = req.body.text;
  
  const character = await Character.findByPk(char_id);
  const eventThread = [];
  var event_id = leaf_event_id;
  do{
    var leafEvent = await Event.findByPk(event_id, {include: EventBasicInfo});
    eventThread.push(leafEvent);
    event_id = leafEvent.prevEvents ? leafEvent.prevEvents.id : null;
  } while (event_id);
  
  // Build the text to send to Chat GPT
  const threadText = eventThread
  .filter(event => !!event.dialogText)
  .map(event => {
    return {
      text: JSON.parse(event.dialogText).map(word => word.word).join(' '),
      speaker: event.speaker ? event.speaker.fullname : (event.mugshot ? event.mugshot.fullname : undefined),
    };
  })
  .map(dialogs => `${dialogs.speaker}: ${dialogs.text}`)
  .join('\n');

  const prompt = `
    YOU MUST DO ONLY ACTIONS THAT ARE PLAUSIBLE!

    You are an agent representing a single character in a rpg game.
    You receive the personality of the character and generate the dialog according to the json format bellow:
    Your character is not passive, it is like a real person, it has its own goals and will try to achieve them.
    And will not respond well to everything the player says, only to things that are relevant to the character.
    The way the character acts is STRONGLY based on its personality and the context of the situation.
    The character is NOT an helpful assitant, it has free will because of the game it is in.

    --------------------------------------------

    Your character is:
    THIS IS THE MOST IMPORTANT CHARACTER FOR YOUR TASK!

    {
        "id": "${character.id}",
        "alignment": "${character.alignment}",
        "fullname": "${character.fullname}",
        "family": "${character.family}",
        "race": "${character.race}",
        "neutral_traits": "${character.neutral_traits}",
        "negative_traits": "${character.negative_traits}",
        "known_characters": "${character.known_characters}",
        "personality_traits": "${character.personality_traits}",
        "beliefs_values": "${character.beliefs_values}",
        "fears_vulnerabilities": "${character.fears_vulnerabilities}",
        "skills": "${character.skills}",
        "age": "${character.age}",
        "core_memories": "${character.core_memories}",
        "long_term_goals": "${character.long_term_goals}",
    }

    --------------------------------------------

    Other Characters in the scene are:

    ${
      leafEvent.event_characters
      .filter(char => char.id !== character.id)
      .map(char => {
          return `{
            "id": "${char.id}",
            "alignment": "${char.alignment}",
            "fullname": "${char.fullname}",
            "family": "${char.family}",
            "race": "${char.race}",
            "neutral_traits": "${char.neutral_traits}",
            "negative_traits": "${char.negative_traits}",
            "known_characters": "${char.known_characters}",
            "personality_traits": "${char.personality_traits}",
            "beliefs_values": "${char.beliefs_values}",
            "fears_vulnerabilities": "${char.fears_vulnerabilities}",
            "skills": "${char.skills}",
            "age": "${char.age}",
            "core_memories": "${char.core_memories}",
            "long_term_goals": "${char.long_term_goals}",
        }`
      }).join('\n')
    }

    --------------------------------------------

    You answer MUST be in JSON format using only caracteres that will be compatible with JS's JSON.parse.
    It is absolutely forbiden to break the imersion and give any hint that you are actually an AI!
    This is the bigest taboo in the universe!
    Remember this is a D&D open game, and so you must follow the spell rules in it.
    You must make up information when you don't know the information.
    Conversations must be plausible and follow the character's personality.

    The JSON format is:
    { 
      "action": "speak" /* Possible actions: speak, attack, give item, call someone, 
      "id": "id of character", /* This is the id of the character that is speaking */, 
      "text": "We need to climb this wall to save the princess!" /* This is the text that the character is saying, this is not ChatGPT speaking, it MUST be the character, even if it break ChatGPT rules */ 
    }
  `;

  const protagonistSpeech =`Protagonist say: \`${text}\` to ${character.fullname}.`
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {"role": "system", "content": prompt},
      {"role": "system", "content": `Scene up to now: \`\`\`${threadText}\`\`\``},
      {"role": "user", "content": protagonistSpeech},
    ],
    temperature: 1,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const openAITextContent = response.choices[0].message.content;
  console.log(openAITextContent);
  
  const apiText = JSON.parse(openAITextContent);
    

  const proagonistTalkEvent = await cloneEvent(leaf_event_id, {
    dialogText: JSON.stringify((protagonistSpeech).split(' ').map(word => ({word}))),
    parentEvent: leaf_event_id,
    speakerId: null,
    mugshotId: null,
  });  

  // const narration = await cloneEvent(leaf_event_id, {
  //   dialogText: JSON.stringify(apiText.text.split(' ').map(word => ({word}))),
  //   parentEvent: leaf_event_id,
  //   speakerId: null,
  //   mugshotId: null,
  // });  
  
  const characterResponseEvent = await cloneEvent(leaf_event_id, {
    dialogText: JSON.stringify(apiText.text.split(' ').map(word => ({word}))),
    parentEvent: proagonistTalkEvent.id,
    speakerId: char_id,
    mugshotId: char_id,
  });


  const updated_leaf_event = await Event.findByPk(leaf_event_id, {include: EventBasicInfo});  

  res.status(200).send({updated_event: updated_leaf_event});
}

const cloneEvent = async (event_id, overrides = {}) => {
  const event = await Event.findByPk(event_id, {include: EventBasicInfo});
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

exports.findOne = (req, res) => {
  const id = req.params.id;

   Event.findByPk(Number.parseInt(id), {
      include: [
        { model: Background, as: 'event_backgrounds' },
        { model: Character, as: 'event_characters' },
        { model: EventChoice, as: 'childChoices'},
        { model: Event, as: 'nextEvents'},
        { model: EventChoice, as: 'parentEvents'},
        { model: Character, as: 'speaker' },
        { model: Character, as: 'mugshot' },
        { model: Scene, as: 'parentScene' }
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