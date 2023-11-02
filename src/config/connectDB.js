import { Sequelize } from "sequelize";
import config from "./config";

const host = config.development.host;
const database = config.development.database;
const username = config.development.username;
const password = config.development.password;
const port = config.development.port;
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port, // Specify the port you've configured for MySQL
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default connection;
