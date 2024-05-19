const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Chama models
db.EventCharacter = require("./event_character.model.js")(sequelize, Sequelize);
db.EventBackground = require("./event_background.model.js")(sequelize, Sequelize);
db.Character = require("./character.model.js")(sequelize, Sequelize);
db.Scene = require("./scene.model.js")(sequelize, Sequelize);
db.Event = require("./event.model.js")(sequelize, Sequelize);
db.EventChoice = require("./eventChoice.model.js")(sequelize, Sequelize);
db.Background = require("./background.model.js")(sequelize, Sequelize);

// Relaciona models
Object.keys(db).forEach(function lala (modelName)  {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;