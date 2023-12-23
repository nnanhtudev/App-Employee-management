import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initAPIRoutes from "./routes/api";
import connection from "./config/connectDB";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
import { configPassPort } from "./controllers/passportController";
import configSession from "./config/session";

const app = express();
const port = process.env.PORT || 3000;
// Add headers before the routes are defined
configCors(app);

// Config view engine
configViewEngine(app);
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//connectDB
connection();

//config cookies parser
app.use(cookieParser());

//config Session
configSession(app);

//config web routes
initWebRoutes(app);
initAPIRoutes(app);

//configPassPort
configPassPort();

app.use((req, res) => {
  return res.send({
    message: "404 not found",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
