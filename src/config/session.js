import Sequelize from "sequelize";
import session from "express-session";
import "dotenv/config";
import passport from "passport";

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

  const myStore = new SequelizeStore({
    db: sequelize,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: myStore,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      saveUninitialized: false,
      proxy: true, // if you do SSL outside of node.
    })
  );

  myStore.sync();

  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      // cb(null, { id: user.id, username: user.username });
      cb(null, user);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
