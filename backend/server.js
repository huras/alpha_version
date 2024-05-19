const express = require("express");
const cors = require("cors");


const app = express();

//alllow any
var corsOptions = {
  // origin: "*"
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({limit: '100mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/sqlite_db");

// Só conecta no bando de dados
// db.sequelize.sync()
// db.sequelize.sync({ force: true })

(async () => {
  const database = db;

  try {
    const resultado = await database.sequelize.sync(
      // { force: true }
    );
    // console.log(resultado);

    // const seed = require("./app/seeders/initial_seed");
    // seed.up( db.sequelize.queryInterface, db.Sequelize.DataTypes);
  } catch (error) {
    console.log(error);
  }
})();

// // Reconstrói o bando de dados do zero e conecta nele
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");

//   //run seeds
//   const seed = require("./app/seeders/initial_seed");
//   seed.up( db.sequelize.queryInterface, db.Sequelize.DataTypes);
// });

// simple route
app.get("/test", (req, res) => {
  res.json({ message: "Welcome to entregator API." });
});

require("./app/routes/event.routes.js")(app);
require("./app/routes/scene.routes.js")(app);
require("./app/routes/project.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});