const express = require("express");
const router = express.Router();
const {imageUpload} = require('../middlewares')

const { getAll, createOne } = require("../controllers/course");

router.get("/", getAll);
router.post("/", imageUpload, createOne);

module.exports = router;
