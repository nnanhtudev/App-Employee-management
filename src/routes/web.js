import express from "express";
import {
  getHomepage,
  getUsers,
  createUser,
  deleteUser,
  getUpdateUser,
  updateUser,
} from "../controllers/homeControllers";
const router = express.Router();

/**
 * express app
 */

const initWebRoutes = (app) => {
  router.get("/", getHomepage);
  router.get("/users", getUsers);
  router.post("/user/create-create", createUser);
  router.post("/user/delete-user/:id", deleteUser);
  router.get("/user/update-user/:id", getUpdateUser);
  router.post("/user/update-user", updateUser);
  return app.use("/", router);
};

export default initWebRoutes;
