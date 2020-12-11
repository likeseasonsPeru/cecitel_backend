const express = require('express');
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {createOne, updateOne, removeOne} = require('../controllers/userCourse');

/* router.get("/", verifyAccess, getAll); */

router.post("/:id", verifyAccess, createOne);

router.put("/:id", verifyAccess, updateOne) 

router.delete("/:id", verifyAccess, removeOne) 

module.exports = router;