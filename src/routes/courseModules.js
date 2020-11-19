const express = require("express");
const router = express.Router();
const { imageUpload, fileUpload, userAccess} = require('../middlewares')

const { createOne, removeOne, updateOne } = require("../controllers/courses/moduls");

// id -> codigo del curso
router.post("/:id", userAccess, fileUpload, createOne);
router.put('/:id', userAccess, fileUpload, updateOne);
router.delete("/:id", userAccess, removeOne);

module.exports = router;
