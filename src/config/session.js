import Sequelize from "sequelize";
import session from "express-session";
import "dotenv/config";

const configSession = (app) => {
  // initalize sequelize with session store
  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  // create database, ensure 'sqlite3' in your package.json
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    logging: false,
    define: {
      freezeTableName: true,
    },
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new SequelizeStore({
        db: sequelize,
      }),
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
    })
  );
};

export default configSession;
