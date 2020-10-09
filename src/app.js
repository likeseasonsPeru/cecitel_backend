const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { port } = require("./config");
const app = express();

// rutas

// middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(morgan("dev"));
const corsOptions = {
  origin: ["https://www.cecitel.com.pe", "https://cecitel.com.pe"]
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// settings

// static files
app.use("/api/public", express.static(path.join(__dirname, "assets/imgs")));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

module.exports = app;
