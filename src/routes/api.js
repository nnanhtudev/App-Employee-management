import express from "express";
import { testAPI, handleRegister, handleLogin } from "../controllers/APIControllers";
import userControllers from "../controllers/userControllers";
import groupControllers from "../controllers/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 * express app
 */

const initAPIRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.get("/account", userControllers.getUserAccount);

  router.get("/user/read", userControllers.readFunc);
  router.post("/user/create", userControllers.createFunc);
  router.put("/user/update", userControllers.updateFunc);
  router.delete("/user/delete", userControllers.deleteFunc);

  router.get("/group/read", groupControllers.readFunc);
  return app.use("/api/v1", router);
};

export default initAPIRoutes;
