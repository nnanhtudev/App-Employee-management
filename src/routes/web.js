import express from "express";
import {
  getHomepage,
  getUsers,
  createUser,
  deleteUser,
  getUpdateUser,
  updateUser,
} from "../controllers/homeControllers";
import loginController from "../controllers/loginController";
import passport from "passport";
import checkUser from "../middleware/checkUser";
const router = express.Router();

/**
 * express app
 */

const initWebRoutes = (app) => {
  router.get("/", checkUser.isLogin, getHomepage);
  router.get("/users", getUsers);
  router.post("/user/create-create", createUser);
  router.post("/user/delete-user/:id", deleteUser);
  router.get("/user/update-user/:id", getUpdateUser);
  router.post("/user/update-user", updateUser);

  //Router login

  router.get("/login", checkUser.isLogin, loginController.getLoginPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  return app.use("/", router);
};

export default initWebRoutes;
