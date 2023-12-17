import { Sequelize } from "sequelize";
import "dotenv/config";

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port, // Specify the port you've configured for MySQL
  dialect: dialect,
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
