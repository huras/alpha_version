const db = require("../models/sqlite_db.js");
const {Scene, Event, Character,EventChoice,Background, Project, EventBackground, EventCharacter } = db;
const { Op } = require("sequelize");
const event = require("./event.controller.js");
const { openai } = require("../services/chatgpt_api");
const fs = require('fs');
const path = require('path');

exports.findAll = (req, res) => {

};

exports.BasicCharacterInfo = [
  {
    model: Event,
    as: 'childEvents',
    include: event.EventBasicInfo,
  },
  {
    model: Project, as: 'parentProject', include: [
      { model: Background, as: 'backgrounds' },
      { model: Character, as: 'characters' },
    ]
  },
];

exports.findOne = (req, res) => {
  const id = req.params.id;

  Scene.findByPk(id, {
    include: exports.BasicSceneInfo
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

function encodeImageToBase64(filePath) {
  const file = fs.readFileSync(filePath);
  return Buffer.from(file).toString('base64');
}

exports.create_from_image = async (req, res) => {
  const image = req.body.image;

  const prompt = `
          You are a character creator.
          You always create characters related to pre-existent characters. (Except when there is none in this log)
          You are smart enough to build an intricate world, one character at a time, in a network of relationships.
          You define the characters always in JSON format like the one below.
          ${(`{
              "id": "an_elf_spearman", 
              "alignment": "Neutral Good", 
              "fullname": "John The Guard", 
              "family": "Kirjikol", 
              "race": "Human", 
              "neutral_traits": "['Bold', 'Mysterious', 'Serious']", 
              "negative_traits": "['Aggressive', 'Careless']", 
              "known_characters": "['anna_the_healer']", 
              "skills": "['Smithing Lv 2', 'Shield Lv 3', 'Spear Lv 5', 'Fire Magic Lv 1']", 
              "short_backstory": "", 
              "age": 17, 
              "core_memories": { 
                  sad: "['losing his father']", 
                  joy: "['robbing an idiot or full-of-itself person']", 
                  fear: "['spiders']", 
                  disgust: "['beans']", 
                  anger: "['politicians']", 
              }, 
              "long_term_goals": "['Become a knight', 'Become a king']", 
              "physical_appearance": {
                  "hair_color": "blonde",
                  "eye_color": "green",
                  "height": "6 feet",
                  "build": "athletic"
              }, 
              "personality_traits": "['compassionate', 'ambitious']", 
              "beliefs_values": {
                  "justice": "strong belief in justice and fairness",
                  "honor": "values personal honor and integrity",
                  "family": "prioritizes the well-being of family"
              }, 
              "relationships": {
                  "friends": "['elena_the_archer']",
                  "enemies": "['roderick_the_bandit']",
                  "romantic_interests": "['lara_the_druid']"
              }, 
              "fears_vulnerabilities": {
                  "fears": "['fear of the dark']",
                  "vulnerabilities": "['easily swayed by flattery']"
              }, 
              "unique_abilities_powers": "['Invisibility spell']", 
              "hobbies_interests": "['painting', 'playing the flute']", 
              "quirks_habits": "['always wears a lucky charm necklace', 'whistles while working']"
          }`).replace(/[\n\t\r]/g, '')}

          Don't include the characters included in the example.

          You output MUST a simple JSON text with no line breaks!!!
          It must be compatible with Javascript JSON.parse.
      `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [{
            type: 'text',
            'text': prompt}],
        },
        {
          role: "user",
          content: [{
            type: "text",
            text: "`Create one for the character of this image."
          }],
        },
        {
          role: "user",
          content: [{
            type: "image_url",
            image_url: {
              url: image,
            },
          }],
        },
      ],
      temperature: 1,
      max_tokens: 1452,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    const characterData = JSON.parse(response.choices[0].message.content.replace(/[\n\t\r]/g, '').replace('\\n', ''));

    res.status(200).send(response.choices[0].message.content);
  } catch (error) {
    console.error('Error creating character from image:', error);
    res.status(500).json({ error: 'Failed to create character from image' });
  }
};

exports.upsert = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return exports.create(req, res);
  } else {
    return exports.update(req, res);
  }
};

exports.create = async (req, res) => {
  const { character } = req.body;
  const {
    fullname, alignment, family, race, age, image, mugshot, neutral_traits,
    negative_traits, known_characters, skills, short_backstory, core_memories,
    long_term_goals, physical_appearance, personality_traits, beliefs_values,
    relationships, fears_vulnerabilities, unique_abilities_powers, hobbies_interests,
    quirks_habits
  } = character;

  // Validate request
  if (!fullname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Check if the image uploaded is from a valid extension
  if (!req.file) {
    res.status(500).send({ msg: 'The app must have a cover image!' });
    return;
  }

  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.status(500).send({ msg: 'Only image files (jpg, jpeg, png) are allowed for the cover!' });
    return;
  }

  const imageName = req.file.filename;

  // Create a Character
  const newCharacter = {
    fullname, alignment, family, race, age, image: imageName, mugshot, neutral_traits,
    negative_traits, known_characters, skills, short_backstory, core_memories,
    long_term_goals, physical_appearance, personality_traits, beliefs_values,
    relationships, fears_vulnerabilities, unique_abilities_powers, hobbies_interests,
    quirks_habits
  };

  // Save Character in the database
  try {
    const data = await db.Character.create(newCharacter);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Character."
    });
  }
};


exports.update = async (req, res) => {
  const { character } = req.body;
  const {
    id, fullname, alignment, family, race, age, image, mugshot, neutral_traits,
    negative_traits, known_characters, skills, short_backstory, core_memories,
    long_term_goals, physical_appearance, personality_traits, beliefs_values,
    relationships, fears_vulnerabilities, unique_abilities_powers, hobbies_interests,
    quirks_habits
  } = character;

  const t = await db.sequelize.transaction();
  try {
    // Update Character
    const character = await db.Character.findByPk(id, { transaction: t });
    if (!character) {
      await t.rollback();
      return res.status(404).send({ message: "Character not found" });
    }

    await character.update({
      fullname, alignment, family, race, age, image, mugshot, neutral_traits,
      negative_traits, known_characters, skills, short_backstory, core_memories,
      long_term_goals, physical_appearance, personality_traits, beliefs_values,
      relationships, fears_vulnerabilities, unique_abilities_powers, hobbies_interests,
      quirks_habits
    }, { transaction: t });

    await t.commit();
    res.send({ message: "Character updated successfully with all related entities!" });
  } catch (err) {
    await t.rollback();
    res.status(500).send({
      message: "Failed to update Character and its relationships",
      error: err.stack,
    });
  }
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Character.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Character was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Character with id=${id}. Maybe Character was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Character with id=" + id
      });
    });
};

// exports.uploadImage = (req, res, err) => {



//   const id = req.params.id;

//   const scene = await Scene.update()

// };