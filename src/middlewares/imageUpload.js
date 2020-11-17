const multer = require("multer");
const path = require("path");
const { PUBLIC_IMGPATH } = require("../utils/constants");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      
      cb(null, path.join(__dirname, `../assets/imgs`));
    } else {
      cb({ message: "this file is neither a image file" }, false);
    }
  },
 
  filename: (req, file, cb) => {
    let file_name = new Date().getTime() + path.extname(file.originalname);
    if (!req.file_names) req.file_names = [file_name] 
    else req.file_names = [...req.file_names, [file_name]]
    cb(null, file_name);
  }
});

const uploadImage = multer({
  storage: storage,
  //limits: { fileSize: 3 * 1024 * 1024 }
}).array("images", 10);

module.exports = (req, res, next) => {
  uploadImage(req, res, err => {
    if (err) {
      console.log(err)
      res.json({ status: false, msg: "Image error", err: err.message });
    } 
    next();
  });
};
