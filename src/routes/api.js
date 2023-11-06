import express from "express";
import { testAPI, handleRegister } from "../controllers/APIControllers";
const router = express.Router();

/**
 * express app
 */

const initAPIRoutes = (app) => {
  router.get("/test", testAPI);
  router.post("/register", handleRegister);
  return app.use("/api/v1", router);
};

export default initAPIRoutes;
