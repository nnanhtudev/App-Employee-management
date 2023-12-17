"use strict";

var _express = _interopRequireDefault(require("express"));
require("dotenv/config");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _api = _interopRequireDefault(require("./routes/api"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
// Add headers before the routes are defined
(0, _cors["default"])(app);

// Config view engine
(0, _viewEngine["default"])(app);
// parse application/json
app.use(_bodyParser["default"].json());
// parse application/x-www-form-urlencoded
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _connectDB["default"])();
//config cookies parser
app.use((0, _cookieParser["default"])());

//config web routes
(0, _web["default"])(app);
(0, _api["default"])(app);
app.use(function (req, res) {
  return res.send({
    message: '404 not found'
  });
});
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});