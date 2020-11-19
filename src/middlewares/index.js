const imageUpload = require("./imageUpload");
const fileUpload = require("./fileUpload");
const {teacherAccess, userAccess} = require("./verifyAccess")
module.exports = {
  imageUpload,
  fileUpload,
  teacherAccess,
  userAccess
};
