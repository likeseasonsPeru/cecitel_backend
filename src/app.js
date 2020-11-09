const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const courseRoutes = require("./routes/course");
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const modulesRoutes = require("./routes/courseModules");
const { port } = require("./config");
const { PUBLIC_PATH } = require("./utils/constants");

const swaggerDocs = require('./helpers/swagger');
const app = express();

// settings


// middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "500mb", extended: "false" }));
app.use(morgan("dev"));
const corsOptions = {
  origin: ["https://www.cecitel.com.pe", "https://cecitel.com.pe"]
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// rutas


app.use("/", authRoutes);
app.use("/courses", courseRoutes);
app.use("/teacher",  teacherRoutes);
app.use("/courses/modules", modulesRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// static files
app.use(PUBLIC_PATH, express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

module.exports = app;
