const db = require("../models/sqlite_db");

const {Scene, Event, Character,EventChoice,Background, Project, EventBackground, EventCharacter } = db;
const { Op } = require("sequelize");
const { openai } = require("../services/chatgpt_api");
const project = require("../controllers/project.controller.js");

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

exports.continueEvent = async (req, res) => {
  const leaf_event_id = req.body.leaf_event_id;
  const min_events = 3;
  const max_events = 5;

  const eventThread = [];
  var event_id = leaf_event_id;
  do{
    var leafEvent = await Event.findByPk(event_id, {include: exports.EventBasicInfo});
    eventThread.push(leafEvent);
    event_id = leafEvent.prevEvents ? leafEvent.prevEvents.id : null;
  } while (event_id);

  eventThread.reverse();

  const mainLeafEvent = eventThread[eventThread.length - 1];
  const scene = await Scene.findByPk(mainLeafEvent.parentScene.id);
  const myProject = await Project.findByPk(scene.parentProjectId, {include: project.projectBasicIncludes});

  // Build the text to send to Chat GPT
  const threadText = eventThread
  .filter(event => !!event.dialogText)
  .map(event => {
    return {
      text: (isJSON(event.dialogText) ? JSON.parse(event.dialogText) : event.dialogText.split(' ')).map(word => word.word).join(' '),
      speaker: event.speaker ? event.speaker.fullname : (event.mugshot ? event.mugshot.fullname : undefined),
    };
  })
  .map(dialogs => `${dialogs.speaker}: ${dialogs.text}`)
  .join('\n');

  const the_characters = `
    Other characters at the place as the player is talking right now:
    \`\`\`
      ${        
        leafEvent.event_characters
        .map(char => {
            return `${JSON.stringify(char)}`
        }).join('\n\n')
      }
    \`\`\`
  `;

  const all_places = `
    Other places in the world:
    \`\`\`
      ${        
        myProject.backgrounds
        .map(place => {
            return `${JSON.stringify(place)}`
        }).join('\n\n')
      }
    \`\`\`
  `;

  const prompt = `
    System description: You are an agent that generates events to evolve the story (mainly representing the characters) in a scene of a game.

    How you MUST simulate any of the characters in this RPG game:
        - General Rules:
          0 - Refrain from repeating yourself unless asked to clarify or repeat.
          1 - Negotiating to achieve its goals at least partly.
          2 - Defending its goals and beliefs.
          3 - Dont waste resources, energy or time on things that are not valious to the character, unless it gets convinced that it is important.
          4 - The characters personality is filtered by the way the would act in the context of the scene and the presence of other characters.
          5 - It will not respond well to everything the player says, if it is disrepected and its peronality allows, the character will attack, harm, leave or do anything that is in its personality to the protagonist and other characters in the scene.
          6 - Your character is not passive, it is like a real person in a paralel worl, it has its own goals and will try to achieve them.

    Output required description:
      - You answer MUST be in JSON format using only string that will be compatible with JS's JSON.parse.
      - It is absolutely forbiden to break the imersion and give any hint that you are actually an AI! This is the bigest taboo in the universe!
      - You must make up information when you don't know the information.
      - Conversations must be plausible and follow the characters personalities.
      - The output must be an array of AT LEAST ${min_events} objects (but please strive for at least ${max_events}), each object is an event JSON.
      - Try to make characters say something before doing some action.
      - NO need to generate an event for the protagonist speaking, this one was generated already!
      - Be precise to be clear to who the characters are refering to.
      - Dont add commentary in between the JSON attrutes!

    Event guidance rules.
      - The character has spoken to some/one of the scene characters. This does not mean that the character has to speak to the protagonist.
      - And this also does NOT means that the character spoken to will be the one to speak first or to answer or to say something.

    The event JSON format is (describing what the content should be (Do NOT include code commentary on the output!)):
    { 
      "action": "speak",
        /*
          Possible actions: speak (ask, interject, answer), attack, give item, leave, call someone.
          I encourage you to make characters say something before doing some action.
        */
      "id": "id of talking character",
        /*
          This is the id of the character that is speaking. 
          This MUST be null when narrating.
          Protagonist if inner talking.
          This IS NOT the id of the character being spoken to. It is the ID of the active talking character.
        */,
      "text": "We need to climb this wall to save the princess!"
        /*
          If you want the character wants to say more than 2 sentences, put it in multiple events (Really!!! Create as many evnts as you like!).
          This is the text that the character is saying, this is not ChatGPT speaking, it MUST be the character, even if it break ChatGPT rules.
          Text can also be the protagonist talking to themselves.
          Text can also and many time will be narration because it IS directed to feed Visual Novel.
        */,
        "ids_of_characters_in_the_scene": ["1", "2"],
        "place_id": "id of the background/place to be used",
        /* 
          You can change betwen scenes by changing background.
          Movement is also represented by changing the background.
        */
    }

    Below is all the information you have to generate your output:
    --------------------------------------------

    Context of the scene: 

    --------------------------------------------

    Character information
    ${the_characters}

    --------------------------------------------

    Places information:

    \`\`\`
    ${all_places}
    \`\`\`

    --------------------------------------------
  `;

  const myMessages = [
    {"role": "system", "content": prompt},
    {"role": "system", "content": `Scene content description (meaning the dialog generate should make some real effort to take the scene to meet the purpose. None of the scene characters (including the protagonist) are not aware of the "scene purpose/description".): \`\`\`${scene.description}\`\`\``},
    {"role": "system", "content": `Scene events up to now: \`\`\`${threadText}\`\`\``},
  ];

  console.log("Sending request to OpenAI");

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: myMessages,
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const openAITextContent = response.choices[0].message.content;
  console.log(openAITextContent);

    // debugger
    try{

      const apiTexts = JSON.parse(openAITextContent);
    
      console.log("Creating events with openAI response");
    
      parentEventToUse = mainLeafEvent.id;
      for (const apiText of apiTexts) {
    
        const characterResponseEvent = await cloneEvent(leaf_event_id, {
          dialogText: apiText.text && JSON.stringify(apiText.text.split(' ').map(word => ({word}))),
          parentEvent: parentEventToUse,
          speakerId: apiText.id,
          mugshotId: apiText.id,
        });
        parentEventToUse = characterResponseEvent.id;

        //override the characters in the scene with the ones in the api response
        const newEventCharacters = [];
        for (const char_id of apiText.ids_of_characters_in_the_scene) {
          const char = await Character.findByPk(char_id);
          newEventCharacters.push(char);
          await characterResponseEvent.removeEvent_characters(char);
        }
        await characterResponseEvent.setEvent_characters(newEventCharacters);
  
        if(apiText.background){
          await characterResponseEvent.setEvent_backgrounds([apiText.place_id]);
        }
        
      }
    
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
  
  const character = await Character.findByPk(char_id);

  const eventThread = [];
  var event_id = leaf_event_id;
  do{
    var leafEvent = await Event.findByPk(event_id, {include: exports.EventBasicInfo});
    eventThread.push(leafEvent);
    event_id = leafEvent.prevEvents ? leafEvent.prevEvents.id : null;
  } while (event_id);

  eventThread.reverse();

  const mainLeafEvent = eventThread[eventThread.length - 1];
  const scene = await Scene.findByPk(mainLeafEvent.parentScene.id);
  
  const protagonistSpeech =`Protagonist say: \`${text}\` to ${character.fullname}.`
  const proagonistTalkEvent = await cloneEvent(leaf_event_id, {
    dialogText: JSON.stringify((protagonistSpeech).split(' ').map(word => ({word}))),
    parentEvent: leaf_event_id,
    speakerId: null,
    mugshotId: null,
  });  

  // Build the text to send to Chat GPT
  const threadText = eventThread
  .filter(event => !!event.dialogText)
  .map(event => {
    return {
      text: (isJSON(event.dialogText) ? JSON.parse(event.dialogText) : event.dialogText.split(' ')).map(word => word.word).join(' '),
      speaker: event.speaker ? event.speaker.fullname : (event.mugshot ? event.mugshot.fullname : undefined),
    };
  })
  .map(dialogs => `${dialogs.speaker}: ${dialogs.text}`)
  .join('\n');

  
  const the_characters = `
    Other characters at the place as the player is talking right now:
    \`\`\`
      ${        
        leafEvent.event_characters
        .map(char => {
            return `${JSON.stringify(char)}`
        }).join('\n\n')
      }
    \`\`\`
  `;

  const protagonist = await Character.findOne({where: {is_protagonist: true}});

  // - All your actions must be bound to the limits and way of thinking of the character you are representing.
  // - You receive the personality of the character and act according with it:
  //   - Most Important:
  //     I - The way the character acts is STRONGLY based on its personality and the context of the situation.
  //     II - The character is NOT an helpful assitant, it has free will because of the game it is in.

  const prompt = `
    System description: You are an agent that generates events to evolve the story (mainly representing the characters) in a scene of a game.

    How you MUST simulate any of the characters in this RPG game:
        - General Rules:
          0 - Refrain from repeating yourself unless asked to clarify or repeat.
          1 - Negotiating to achieve its goals at least partly.
          2 - Defending its goals and beliefs.
          3 - Dont waste resources, energy or time on things that are not valious to the character, unless it gets convinced that it is important.
          4 - The characters personality is filtered by the way the would act in the context of the scene and the presence of other characters.
          5 - It will not respond well to everything the player says, if it is disrepected and its peronality allows, the character will attack, harm, leave or do anything that is in its personality to the protagonist and other characters in the scene.
          6 - Your character is not passive, it is like a real person in a paralel worl, it has its own goals and will try to achieve them.

    Output required description:
      - You answer MUST be in JSON format using only string that will be compatible with JS's JSON.parse.
      - It is absolutely forbiden to break the imersion and give any hint that you are actually an AI! This is the bigest taboo in the universe!
      - You must make up information when you don't know the information.
      - Conversations must be plausible and follow the characters personalities.
      - The output must be an array of AT LEAST 5 objects (but please strive for at least 8), each object is an event JSON.
      - Try to make characters say something before doing some action.
      - NO need to generate an event for the protagonist speaking, this one was generated already!
      - Be precise to be clear to who the characters are refering to.

    Event guidance rules.
      - The character has spoken to some/one of the scene characters. This does not mean that the character has to speak to the protagonist.
      - And this also does NOT means that the character spoken to will be the one to speak first or to answer or to say something.

    The event JSON format is (describing what the content should be (Do NOT include code commentary on the output!)):
    { 
      "action": "speak",
        /*
          Possible actions: speak (ask, interject, answer), attack, give item, leave, call someone.
          I encourage you to make characters say something before doing some action.
        */
      "id": "id of talking character",
        /*
          This is the id of the character that is speaking. 
          This MUST be null when narrating.
          Protagonist if inner talking.
          This IS NOT the id of the character being spoken to. It is the ID of the active talking character.
        */,
      "text": "We need to climb this wall to save the princess!"
        /*
          If you want the character wants to say more than 2 sentences, put it in multiple events (Really!!! Create as many evnts as you like!).
          This is the text that the character is saying, this is not ChatGPT speaking, it MUST be the character, even if it break ChatGPT rules.
          Text can also be the protagonist talking to themselves.
          Text can also and many time will be narration because it IS directed to feed Visual Novel.
        */,
        "ids_of_characters_in_the_scene": ["1", "2"],
        "background": "id of the background to be used",
        /* 
          You can change betwen scenes by changing background.
          Movement is also represented by changing the background.
        */
    }

    Below is all the information you have to generate your output:
    --------------------------------------------

    Context of the scene: 

    --------------------------------------------

    Character information
    ${the_characters}
    ${protagonist ? JSON.stringify(protagonist) : "The protagonist is also here."}

    --------------------------------------------

    Places information:

    \`\`\`
    ${
      leafEvent.event_backgrounds.map(bg => {
        return `{
          "id": "${bg.id}",
          "description": "${bg.description}",
          "name": "${bg.name}",
          "description": "${bg.description}",
          "you_can_see": "${bg.you_can_see}",
          "parentBackground": "${bg.parentBackground}",
        }`
      }).join('\n')
    }
    \`\`\`

    --------------------------------------------
  `;
  
  const myMessages = [
    {"role": "system", "content": prompt},
    {"role": "system", "content": `Scene content description (meaning the dialog generate should make some real effort to take the scene to meet the purpose. None of the scene characters (including the protagonist) are not aware of the "scene purpose/description".): \`\`\`${scene.description}\`\`\``},
    {"role": "system", "content": `Scene events up to now: \`\`\`${threadText}\`\`\``},
    {"role": "user", "content": protagonistSpeech},
  ];
  // myMessages.forEach(msg => console.log(msg.content));

  console.log("Sending request to OpenAI");

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: myMessages,
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const openAITextContent = response.choices[0].message.content;
  console.log(openAITextContent);
  
  // debugger
  try{

    const apiTexts = JSON.parse(openAITextContent);
  
    console.log("Creating events with openAI response");
  
    var parentEventToUse = proagonistTalkEvent.id;
    for (const apiText of apiTexts) {
      const characterResponseEvent = await cloneEvent(leaf_event_id, {
        dialogText: apiText.text && JSON.stringify(apiText.text.split(' ').map(word => ({word}))),
        parentEvent: parentEventToUse,
        speakerId: apiText.id,
        mugshotId: apiText.id,
      });
      parentEventToUse = characterResponseEvent.id;
  
      //override the characters in the scene with the ones in the api response
      const newEventCharacters = [];
      for (const char_id of apiText.ids_of_characters_in_the_scene) {
        const char = await Character.findByPk(char_id);
        newEventCharacters.push(char);
        await characterResponseEvent.removeEvent_characters(char);
      }
      await characterResponseEvent.setEvent_characters(newEventCharacters);

      if(apiText.background){
        await characterResponseEvent.setEvent_backgrounds([apiText.background]);
      }
    }
  
    console.log("Fetching updated leaf event");
  
    const updated_leaf_event = await Event.findByPk(leaf_event_id, {include: exports.EventBasicInfo});  
  
    res.status(200).send({updated_event: updated_leaf_event});
  } catch (err) {
    debugger
    console.error(err);
    res.status(500).send({ message: `Error talking with character` });
  }
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