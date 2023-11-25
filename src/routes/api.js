import express from "express";
import { testAPI, handleRegister, handleLogin, handleLogout } from "../controllers/APIControllers";
import userControllers from "../controllers/userControllers";
import groupControllers from "../controllers/groupController";
import roleControllers from "../controllers/roleControllers";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 * express app
 */

const initAPIRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.post("/logout", handleLogout);
  router.get("/account", userControllers.getUserAccount);

  //user routes
  router.get("/user/read", userControllers.readFunc);
  router.post("/user/create", userControllers.createFunc);
  router.put("/user/update", userControllers.updateFunc);
  router.delete("/user/delete", userControllers.deleteFunc);

  //role routes
  router.get("/role/read", roleControllers.readFunc);
  router.post("/role/create", roleControllers.createFunc);
  router.put("/role/update", roleControllers.updateFunc);
  router.delete("/role/delete", roleControllers.deleteFunc);
  router.get("/role/by-group/:groupId", roleControllers.getRoleByGroup);
  router.post("/role/assign-to-group", roleControllers.assignRoleToGroup);

  //group routers
  router.get("/group/read", groupControllers.readFunc);
  return app.use("/api/v1", router);
};

export default initAPIRoutes;
