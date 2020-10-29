const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const { port } = require("./config");
const { PUBLIC_PATH } = require("./utils/constants");


const courseRoutes = require("./routes/course");
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");

const app = express();

// settings

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "CECITEL BACKEND",
      version: '1.0.0',
    },
  },
  apis: ["src/routes/*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


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

app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs), authRoutes);
app.use("/courses", courseRoutes);
app.use("/teacher",  teacherRoutes);


// static files
app.use(PUBLIC_PATH, express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

module.exports = app;
