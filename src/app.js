const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { port } = require("./config");
const { PUBLIC_PATH } = require("./utils/constants");

const courseRoutes = require("./routes/course");
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

app.use("/courses", courseRoutes);

// settings

// static files
app.use(PUBLIC_PATH, express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

module.exports = app;
