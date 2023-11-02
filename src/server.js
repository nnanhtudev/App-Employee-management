import express from "express";
import "dotenv/config";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";

const app = express();
const port = process.env.PORT || 3000;

// Config view engine
configViewEngine(app);
//config web routes
initWebRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
