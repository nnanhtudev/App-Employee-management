"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _APIControllers = require("../controllers/APIControllers");
var _userControllers = _interopRequireDefault(require("../controllers/userControllers"));
var _groupController = _interopRequireDefault(require("../controllers/groupController"));
var _roleControllers = _interopRequireDefault(require("../controllers/roleControllers"));
var _JWTAction = require("../middleware/JWTAction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/**
 * express app
 */

var initAPIRoutes = function initAPIRoutes(app) {
  router.all("*", _JWTAction.checkUserJWT, _JWTAction.checkUserPermission);
  router.post("/register", _APIControllers.handleRegister);
  router.post("/login", _APIControllers.handleLogin);
  router.post("/logout", _APIControllers.handleLogout);
  router.get("/account", _userControllers["default"].getUserAccount);

  //user routes
  router.get("/user/read", _userControllers["default"].readFunc);
  router.post("/user/create", _userControllers["default"].createFunc);
  router.put("/user/update", _userControllers["default"].updateFunc);
  router["delete"]("/user/delete", _userControllers["default"].deleteFunc);

  //role routes
  router.get("/role/read", _roleControllers["default"].readFunc);
  router.post("/role/create", _roleControllers["default"].createFunc);
  router.put("/role/update", _roleControllers["default"].updateFunc);
  router["delete"]("/role/delete", _roleControllers["default"].deleteFunc);
  router.get("/role/by-group/:groupId", _roleControllers["default"].getRoleByGroup);
  router.post("/role/assign-to-group", _roleControllers["default"].assignRoleToGroup);

  //group routers
  router.get("/group/read", _groupController["default"].readFunc);
  return app.use("/api/v1", router);
};
var _default = exports["default"] = initAPIRoutes;