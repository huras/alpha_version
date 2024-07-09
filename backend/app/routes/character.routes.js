module.exports = app => {
  const character = require("../controllers/character.controller.js");

  var router = require("express").Router();

  // Retrieve a single Character with id
  router.get("/:id", character.findOne);

  router.post("/generate_by_image", character.create_from_image);

  // Create a new Character
  router.put("/:id", character.upsert);

// Retrieve all Characters
  // router.get("/", character.findAll);

  // router.post("/continue-character", character.continueCharacter);


  // Retrieve all Events
  // router.get("/:id/events", character.findAllEvents);

  // Retrieve all Backgrounds
  // router.get("/:id/backgrounds", character.findAllBackgrounds);

  // Retrieve all Characters
  // router.get("/:id/characters", character.findAllCharacters);

  // Delete a Character with id
  // router.delete("/:id", character.delete);


  app.use('/character', router);
};