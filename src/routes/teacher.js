const express = require("express");
const router = express.Router();

const {imageUpload, userAccess} = require('../middlewares')

const {getAll, getOne, createOne} = require("../controllers/teacher");

router.get("/", userAccess, getAll); // login
router.post("/", userAccess, imageUpload, createOne); // registro
router.get("/:id", userAccess, getOne)

module.exports = router;