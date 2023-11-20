import express from "express";
import { testAPI, handleRegister, handleLogin } from "../controllers/APIControllers";
import userControllers from '../controllers/userControllers'
import groupControllers from '../controllers/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
const router = express.Router();

/**
 * express app
 */
// const checkUserLogin = (req, res, next) => {
//   const nonSecurePaths = ['/', '/about', '/contact'];
//   if (nonSecurePaths.includes(req.path)) return next();

//   //authenticate user
//   next();
// }
const initAPIRoutes = (app) => {
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);

  router.get("/user/read", checkUserJWT, checkUserPermission, userControllers.readFunc)
  router.post("/user/create", userControllers.createFunc)
  router.put("/user/update", userControllers.updateFunc)
  router.delete("/user/delete", userControllers.deleteFunc)

  router.get("/group/read", groupControllers.readFunc)
  return app.use("/api/v1", router);
};

export default initAPIRoutes;
