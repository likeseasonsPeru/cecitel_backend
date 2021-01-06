const express = require("express");
const router = express.Router();
const { imageUpload, fileUpload, verifyAccess} = require('../middlewares')

const {  updateOne, removeOne } = require("../controllers/courseStudents");

// id -> codigo del curso
/* router.post("/:id", verifyAccess, fileUpload, createOne); */

// id -> codigo del lessos
router.put('/:id', verifyAccess, fileUpload, updateOne);

// id -> codigo del lesson
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
