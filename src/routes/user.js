const express = require('express');
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {getAll, getOne, updateOne, resetPassword} = require('../controllers/user');

router.get("/", verifyAccess, getAll);

router.get("/:id", verifyAccess, getOne)

router.put("/:id", verifyAccess, imageUpload, updateOne)

module.exports = router;