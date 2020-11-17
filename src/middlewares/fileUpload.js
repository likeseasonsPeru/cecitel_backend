const multer = require("multer");
const path = require("path");
const { PUBLIC_FILEPATH } = require("../utils/constants");
/* const videoExtensions = require('video-extensions'); */

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(file);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, path.join(__dirname, `../assets/archivos`));
    } else {
      cb({ message: "this file is neither a archivo file" }, false);
    }
  },
  filename: (req, file, cb) => {
    let file_name = new Date().getTime() + path.extname(file.originalname);
    if (!req.file_names) req.file_names = [file_name] 
    else req.file_names = [...req.file_names, [file_name]]
    cb(null, file_name);
  }
});

const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).array("files", 5);

module.exports = (req, res, next) => {
  fileUpload(req, res, err => {
    if (err) {
      console.log(err)
      res.json({ status: false, msg: "Image error", err: err.message });
    }
    next();
    
  });
};
