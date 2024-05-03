const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})
sequelize.Sequelize = Sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Chama models
db.Character = require("./character.model.js")(sequelize, Sequelize);
db.Project = require("./project.model.js")(sequelize, Sequelize);
db.Scene = require("./scene.model.js")(sequelize, Sequelize);
db.Event = require("./event.model.js")(sequelize, Sequelize);
db.EventChoice = require("./eventChoice.model.js")(sequelize, Sequelize);
db.Background = require("./background.model.js")(sequelize, Sequelize);
db.EventCharacter  = require("./event_character.model.js")(sequelize, Sequelize);
db.EventBackground  = require("./event_background.model.js")(sequelize, Sequelize);

// Relaciona models
Object.keys(db).forEach(function lala (modelName)  {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;