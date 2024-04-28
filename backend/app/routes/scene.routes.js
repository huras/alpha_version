module.exports = app => {
  const scene = require("../controllers/scene.controller.js");

  var router = require("express").Router();

  // Retrieve a single Scene with id
  router.get("/:id", scene.findOne);

  // Create a new Scene
  // router.post("/", scene.create);

// Retrieve all Scenes
  router.get("/", scene.findAll);


  // Retrieve all Events
  // router.get("/:id/events", scene.findAllEvents);

  // Retrieve all Backgrounds
  // router.get("/:id/backgrounds", scene.findAllBackgrounds);

  // Retrieve all Characters
  // router.get("/:id/characters", scene.findAllCharacters);


  // // Update a Entrega with id
  // router.put("/:id", scene.update);

  // Delete a Scene with id
  // router.delete("/:id", scene.delete);


  app.use('/scene', router);
};