const express = require("express");
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {createOne, updateOne, removeOne} = require("../controllers/teacherCourse");


router.post("/:id",  verifyAccess, imageUpload, createOne);  // registro de profesores

 /* router.get("/:id", verifyAccess, getOne) */

router.put("/:id", verifyAccess, imageUpload, updateOne)

router.delete("/:id", verifyAccess, imageUpload, removeOne) 

module.exports = router;