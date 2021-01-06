const express = require('express');
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {createOne, updateOne, removeOne} = require('../controllers/userCourse');
const {createOneByIdUser} = require("../controllers/courseStudents")

/* router.get("/", verifyAccess, getAll); */

router.post("/:id", verifyAccess, createOne, createOneByIdUser);

router.put("/:id", verifyAccess, updateOne) 

router.delete("/:id", verifyAccess, removeOne) 

module.exports = router;