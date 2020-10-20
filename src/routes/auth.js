const express = require("express");
const router = express.Router();

const {signUp, signIn} = require("../controllers/auth");

router.post("/signin", signIn); // login
router.post("/signup", signUp); // registro

module.exports = router;