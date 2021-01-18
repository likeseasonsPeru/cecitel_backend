const express = require("express");
const router = express.Router()

const {fileUpload, verifyAccess} = require('../middlewares')

const {getAll, getOne, createOne, updateOne, updateStudentTask} = require('../controllers/task');

router.get("/", verifyAccess, getAll)

router.get("/:id", verifyAccess, getOne)

router.post("/", verifyAccess, fileUpload, createOne)

router.put("/:id", verifyAccess, fileUpload, updateOne)

router.put("/student/:id", verifyAccess, fileUpload, updateStudentTask)

module.exports = router;