const express = require("express");
const router = express.Router();

const {signUp, signIn, signInTeacher, sendResetPasswordLink} = require("../controllers/auth");


router.post("/signin", signIn); // login

router.post("/signinTeacher", signInTeacher)

router.post("/signup", signUp); // registro

router.post("/reset-password", sendResetPasswordLink)

module.exports = router;