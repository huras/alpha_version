module.exports = app => {
  const project = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Retrieve a single Scene with id
  router.get("/:id", project.findOne);

  // Create a new Scene
  // router.post("/", project.create);

// Retrieve all Scenes
  router.get("/", project.findAll);


  // Retrieve all Events
  // router.get("/:id/events", project.findAllEvents);

  // Retrieve all Backgrounds
  // router.get("/:id/backgrounds", project.findAllBackgrounds);

  // Retrieve all Characters
  // router.get("/:id/characters", project.findAllCharacters);


  // // Update a Entrega with id
  // router.put("/:id", project.update);

  // Delete a Scene with id
  // router.delete("/:id", project.delete);


  app.use('/project', router);
};