import express from "express";
import { testAPI, handleRegister, handleLogin } from "../controllers/APIControllers";
import userControllers from '../controllers/userControllers'
const router = express.Router();

/**
 * express app
 */

const initAPIRoutes = (app) => {
  router.get("/test", testAPI);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);

  router.get("/user/read", userControllers.readFunc)
  router.post("/user/create", userControllers.createFunc)
  router.put("/user/update/:id", userControllers.updateFunc)
  router.delete("/user/delete/:id", userControllers.deleteFunc)
  return app.use("/api/v1", router);
};

export default initAPIRoutes;
