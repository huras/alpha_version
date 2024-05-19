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
  router.get("/:id", event.findOne);

  // Update a Entrega with id
  router.put("/:id", event.update);

  // Delete a Entrega with id
  router.delete("/:id", event.delete);


  app.use('/event', router);
};