const multer = require("multer");
const path = require("path");
const {PUBLIC_FILEPATH} = require('../utils/constants');
/* const videoExtensions = require('video-extensions'); */

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, path.join(__dirname, `../assets/archivos`));
    } else {
      cb({ message: "this file is neither a video file" }, false);
    }
  },
  filename: (req, file, cb) => {
    const file_name = new Date().getTime() + path.extname(file.originalname)
    req.file_name = `${PUBLIC_FILEPATH}/${file_name}`;
    /* console.log(videoExtensions); */
    cb(null, file_name);
  },
});

const fileUpload = multer({
  storage: storage,
  limits: {fileSize: 3 * 1024 * 1024}
}).single('video');

module.exports = (req, res, next) => {
    fileUpload(req, res, err => {
    if (err) {
      res.json({ status: false, msg: "Image error", err: err.message });
    } else {
      next();
    }
  });
};
