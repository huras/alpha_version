module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123457",
  DB: "alpha_version",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};