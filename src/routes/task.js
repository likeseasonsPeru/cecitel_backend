const express = require("express");
const router = express.Router()

const {fileUpload, verifyAccess} = require('../middlewares')

const {createOne} = require('../controllers/task');

router.post("/", verifyAccess, createOne)

module.exports = router;