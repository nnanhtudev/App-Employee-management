import express from "express";
import { testAPI, handleRegister, handleLogin } from "../controllers/APIControllers";
const router = express.Router();

/**
 * express app
 */

const initAPIRoutes = (app) => {
  router.get("/test", testAPI);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  return app.use("/api/v1", router);
};

export default initAPIRoutes;
