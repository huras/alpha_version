module.exports = app => {
  const event = require("../controllers/event.controller.js");

  var router = require("express").Router();

  // Create a new Entrega
  // router.post("/", event.create);

  // Create a new Entrega
  router.post("/fresh", event.attachFresh);

  // Retrieve all Entregas
  router.get("/", event.findAll);

  
  // Retrieve a single Entrega with id
  router.post("/talkWithCharacter", event.talkWithCharacter);
  router.post("/protagonistThinkSomething", event.protagonistThinkSomething);

  // Retrieve a single Entrega with id
  router.post("/continueEvent", event.continueEvent);

  // Retrieve a single Entrega with id
  router.get("/event_tree/:id", event.getEventTree);

  // Retrieve a single Entrega with id
  router.get("/:id", event.findOne);

  // Update a Entrega with id
  router.put("/:id", event.update);

  // Delete a Entrega with id
  router.delete("/:id", event.delete);


  app.use('/event', router);
};