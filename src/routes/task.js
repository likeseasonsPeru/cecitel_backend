const express = require("express");
const router = express.Router()

const {fileUpload, verifyAccess} = require('../middlewares')

const {getAll, getOne, createOne} = require('../controllers/task');

router.get("/", verifyAccess, getAll)

router.get("/:id", verifyAccess, getOne)

router.post("/", verifyAccess, fileUpload, createOne)

module.exports = router;