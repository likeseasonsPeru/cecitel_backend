const express = require('express');
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {getAll, getOne, updateOne, resetPassword, setFavoriteByUserId} = require('../controllers/user');

router.get("/", verifyAccess, getAll);

router.get("/:id", verifyAccess, getOne)

router.put("/:id", verifyAccess, imageUpload, updateOne)

router.put("/setFavorite/:id", verifyAccess, setFavoriteByUserId)

module.exports = router;