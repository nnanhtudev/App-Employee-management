import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./config/connectDB";

const app = express();
const port = process.env.PORT || 3000;
connection();
// Config view engine
configViewEngine(app);
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//config web routes
initWebRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
