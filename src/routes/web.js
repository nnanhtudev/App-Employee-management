import express from "express";
import { getHomepage, getUsers } from "../controllers/homeControllers";
const router = express.Router();

/**
 * express app
 */

const initWebRoutes = (app) => {
  router.get("/", getHomepage);
  router.get("/users", getUsers);
  return app.use("/", router);
};

export default initWebRoutes;
