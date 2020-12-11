const express = require("express");
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {createOne, updateOne, removeOne} = require("../controllers/teacherCourse");

// Codigo del profesor al cual se lea agregara el curso
router.post("/:id",  verifyAccess, imageUpload, createOne);  

// Codigo del profesor al cual se lea agregara el curso
router.put("/:id", verifyAccess, imageUpload, updateOne)

// Codigo del profesor al cual se lea agregara el curso 
router.delete("/:id", verifyAccess, imageUpload, removeOne) 

module.exports = router;