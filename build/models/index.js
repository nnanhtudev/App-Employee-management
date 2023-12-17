"use strict";

require("dotenv").config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var process = require("process");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
var db = {};
var sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

var customizeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  timezone: "+07:00"
};
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, customizeConfig);
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;