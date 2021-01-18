const express = require("express");
const router = express.Router()

const { verifyAccess} = require('../middlewares')

const {getAll, createOne} = require('../controllers/contact');

router.get("/", verifyAccess, getAll)

/* router.get("/:id", verifyAccess, getOne) */

router.post("/", verifyAccess, createOne)


module.exports = router;