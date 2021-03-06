const express = require("express");
const router = express.Router();
const { imageUpload, fileUpload, verifyAccess} = require('../middlewares')

const { createOne, removeOne, updateOne } = require("../controllers/courseModuls");

// id -> codigo del curso
router.post("/:id", verifyAccess, fileUpload, createOne);

// id -> codigo del modulo
router.put('/:id', verifyAccess, fileUpload, updateOne);

// id -> codigo del modulo
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
