const express = require("express");
const router = express.Router();
const { imageUpload, fileUpload, verifyAccess} = require('../middlewares')

const { createOne, removeOne, updateOne } = require("../controllers/courses/moduls");

// id -> codigo del curso
router.post("/:id", fileUpload, createOne);
router.put('/:id', verifyAccess, updateOne);
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
