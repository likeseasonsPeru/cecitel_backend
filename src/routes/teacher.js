const express = require("express");
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {getAll, getOne, createOne, updateOne, removeOne} = require("../controllers/teacher");


router.get("/", verifyAccess, getAll); 

router.post("/", verifyAccess, imageUpload, createOne);  // registro de profesores

router.get("/:id", verifyAccess, getOne)

router.put("/:id", verifyAccess, imageUpload, updateOne)

router.delete("/:id", verifyAccess, removeOne)

module.exports = router;