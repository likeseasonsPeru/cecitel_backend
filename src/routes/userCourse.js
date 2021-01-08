const express = require('express');
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {createOne, updateOne, removeOne} = require('../controllers/userCourse');
const {createOneByIdUser, updateOneByIdUser} = require("../controllers/courseStudents")

/* router.get("/", verifyAccess, getAll); */

router.post("/:id", verifyAccess, createOne, createOneByIdUser);

// Update By course._id of user
router.put("/:id", verifyAccess, updateOne, updateOneByIdUser) 

router.delete("/:id", verifyAccess, removeOne) 

module.exports = router;