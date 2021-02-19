const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const courseRoutes = require("./routes/course");
const courseModulesRoutes = require("./routes/courseModules");
const courseModulesLessonsRoutes = require("./routes/courseModulsLesson");
const courseStudent = require("./routes/courseStudent");
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const userRoutes = require("./routes/user");
const userCoursesRoutes = require("./routes/userCourse");
const userPurchasesRoutes = require("./routes/userPurchase");
const taskRoutes = require("./routes/task");
const examRoutes = require("./routes/exam");
const contactRoutes = require("./routes/contact");

const { port } = require("./config");
const {
  PUBLIC_FILEPATH,
  PUBLIC_IMGPATH,
  PUBLIC_TEMPLATEPATH
} = require("./utils/constants");

const swaggerDocs = require("./helpers/swaggerJson.json");
const app = express();

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
app.use("/courses/modules", courseModulesRoutes);
app.use("/courses/modules/lessons", courseModulesLessonsRoutes);
app.use("/courses/students", courseStudent);
app.use("/teacher", teacherRoutes);
app.use("/user", userRoutes);
app.use("/user/courses", userCoursesRoutes);
app.use("/user/purchases", userPurchasesRoutes);
app.use("/task", taskRoutes);
app.use("/exam", examRoutes);
app.use("/contact", contactRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// test serverdeploy

app.get("/test", (req, res) => res.send("Hello Word !"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// restful api error handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode || 500).json({
    status: false,
    msg: "Ocurrio un error",
    err: err.message
  });
});

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
