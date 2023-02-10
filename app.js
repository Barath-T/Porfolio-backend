const express = require("express");
const app = express();

require("express-async-errors");
const bodyParser = require("body-parser");

const cors = require("cors");

const skillsRouter = require("./controllers/skills");
const projectsRouter = require("./controllers/projects");
const detailsRouter = require("./controllers/details");

const logger = require("./utils/logger");
const config = require("./utils/config");

const mongoose = require("mongoose").set("strictQuery", false);
mongoose
   .connect(config.MONGODB_URI)
   .then(() => logger.info("DB connected"))
   .catch((err) => logger.error(err));

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: false }));

app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/details", detailsRouter);

module.exports = app;
