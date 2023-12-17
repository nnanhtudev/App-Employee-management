"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeControllers = require("../controllers/homeControllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/**
 * express app
 */

var initWebRoutes = function initWebRoutes(app) {
  router.get("/", _homeControllers.getHomepage);
  router.get("/users", _homeControllers.getUsers);
  router.post("/user/create-create", _homeControllers.createUser);
  router.post("/user/delete-user/:id", _homeControllers.deleteUser);
  router.get("/user/update-user/:id", _homeControllers.getUpdateUser);
  router.post("/user/update-user", _homeControllers.updateUser);
  return app.use("/", router);
};
var _default = exports["default"] = initWebRoutes;