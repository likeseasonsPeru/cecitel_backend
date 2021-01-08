const express = require("express");
const router = express.Router();
const { imageUpload, fileUpload, verifyAccess} = require('../middlewares')

const { /*  updateOne, */ removeOne } = require("../controllers/courseStudents");

// id -> codigo del student
/* router.post("/:id", verifyAccess, fileUpload, createOne); */

// id -> codigo del student
/* router.put('/:id', verifyAccess, fileUpload, updateOne); */

// id -> codigo del student
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
