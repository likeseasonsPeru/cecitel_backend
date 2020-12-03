const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const courseRoutes = require("./routes/course");
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const teacherCoursesRoutes = require("./routes/teacherCourse");
const teacherCoursesTaskRoutes = require("./routes/teacherCourseTask");
const courseModulesRoutes = require("./routes/courseModules");
const userRoutes = require("./routes/user");

const { port } = require("./config");
const {
  PUBLIC_FILEPATH,
  PUBLIC_IMGPATH,
  PUBLIC_TEMPLATEPATH
} = require("./utils/constants");

const swaggerDocs = require("./helpers/swagger");
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
app.use("/teacher", teacherRoutes);
app.use("/teacher/courses", teacherCoursesRoutes);
app.use("/teacher/courses/tasks", teacherCoursesTaskRoutes);
app.use("/courses/modules", courseModulesRoutes);
app.use("/user", userRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// static files

app.use(
  PUBLIC_TEMPLATEPATH,
  express.static(path.join(__dirname, "assets/templates"))
);
app.use(
  PUBLIC_FILEPATH,
  express.static(path.join(__dirname, "assets/archivos"))
);
app.use(PUBLIC_IMGPATH, express.static(path.join(__dirname, "assets/imgs")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

module.exports = app;
