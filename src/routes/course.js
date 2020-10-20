const express = require("express");
const router = express.Router();
const {imageUpload, verifyAccess} = require('../middlewares')

const { getAll, createOne } = require("../controllers/course");

router.get("/", verifyAccess, getAll);
router.post("/", verifyAccess, imageUpload, createOne);

module.exports = router;
