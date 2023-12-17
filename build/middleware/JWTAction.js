"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var nonSecurePaths = ["/logout", "/login", "/register"];
var createJWT = function createJWT(payload) {
  var key = process.env.JWT_SECRET;
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};
var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  } catch (err) {
    console.log(err);
  }
  return decoded;
};
var extractToken = function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
  if (nonSecurePaths.includes(req.path)) return next();
  var cookies = req.cookies;
  var tokenFormHeader = extractToken(req);
  if (cookies && cookies.jwt || tokenFormHeader) {
    var token = cookies && cookies.jwt ? cookies.jwt : tokenFormHeader;
    var decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EM: "Not authorized the user",
        EC: -1,
        DT: ""
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authorized the user",
      EC: -1,
      DT: ""
    });
  }
};
var checkUserPermission = function checkUserPermission(req, res, next) {
  if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();
  if (req.user) {
    var email = req.user.email;
    var roles = req.user.groupWithRoles.Roles;
    var currentUrl = req.path;
    console.log(currentUrl);
    if (!roles && roles.length === 0) {
      return res.status(403).json({
        EM: "Your don't have  permission to access this resource",
        EC: -1,
        DT: ""
      });
    }
    var canAccess = roles.some(function (item) {
      return item.url === currentUrl || currentUrl.includes(item.url);
    });
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EM: "Your don't have  permission to access this resource",
        EC: -1,
        DT: ""
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authorized the user",
      EC: -1,
      DT: ""
    });
  }
};
module.exports = {
  createJWT: createJWT,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT,
  checkUserPermission: checkUserPermission
};