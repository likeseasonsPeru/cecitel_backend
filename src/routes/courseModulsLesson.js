const express = require("express");
const router = express.Router();
const { imageUpload, fileUpload, verifyAccess} = require('../middlewares')

const { createOneByModulId, updateOneByModulId, removeOneByModulId } = require("../controllers/courseModulLessons");

// id -> codigo del modulo
router.post("/:id", verifyAccess, fileUpload, createOneByModulId);

// id -> codigo del lessos
router.put('/:id', verifyAccess, fileUpload, updateOneByModulId);

// id -> codigo del lesson
router.delete("/:id", verifyAccess, removeOneByModulId);

module.exports = router;
