const express = require("express");
const router = express.Router();
const { imageUpload, verifyAccess} = require('../middlewares')

const { createOne, removeOne, updateOne } = require("../controllers/courses/moduls");

// id -> codigo del curso
router.post("/:id", verifyAccess, createOne);
router.put('/:id', verifyAccess, updateOne);
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
