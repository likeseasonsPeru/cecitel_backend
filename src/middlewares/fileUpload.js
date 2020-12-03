const multer = require("multer");
const path = require("path");
const {FILE_FORMATS} = require('../utils/constants')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (FILE_FORMATS.includes(file.mimetype)) {
      cb(null, path.join(__dirname, `../assets/archivos`));
    } else {
      cb({ message: "Uno de los archivos no tiene un formato valido" }, false);
    }
  },
  filename: (req, file, cb) => {
    let file_name = new Date().getTime() + path.extname(file.originalname);
    if (!req.file_names) req.file_names = [file_name] 
    else req.file_names = [...req.file_names, ...[file_name]]
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
      return res.status(500).json({ status: false, msg: "Image error", err: err.message });
    }
    next();
    
  });
};
