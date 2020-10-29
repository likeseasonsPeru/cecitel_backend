const express = require("express");
const router = express.Router();

const {signUp, signIn} = require("../controllers/auth");


/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *      - 
 *     description: "Login"
 *     responses:
 *       200:
 *         description: Success
 * 
 */

router.post("/signin", signIn); // login

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *     - 
 *     description: "Registro"
 *     responses:
 *       200:
 *         description: Success
 * 
 */

router.post("/signup", signUp); // registro

module.exports = router;