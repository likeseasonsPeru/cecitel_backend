const express = require("express");
const router = express.Router();

const {fileUpload, verifyAccess} = require('../middlewares')

const {createOne, /* updateOne */removeOne} = require("../controllers/teacherCourseTask");

// id -> codigo del curso
router.post("/:id",  verifyAccess, fileUpload, createOne); 

 /* router.get("/:id", verifyAccess, getOne) */

/* router.put("/:id", verifyAccess, imageUpload, updateOne) */

router.delete("/:id", verifyAccess, fileUpload, removeOne) 

module.exports = router;