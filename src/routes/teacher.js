const express = require("express");
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {getAll, getOne, createOne} = require("../controllers/teacher");

router.get("/", verifyAccess, getAll); // login
router.post("/", verifyAccess, imageUpload, createOne); // registro
router.get("/:id", verifyAccess, getOne)

module.exports = router;