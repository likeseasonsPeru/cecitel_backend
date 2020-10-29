const express = require("express");
const router = express.Router();
const { imageUpload, verifyAccess} = require('../middlewares')

const { getAll, createOne, getOne, updateOne, removeOne } = require("../controllers/course");


/**
 * @swagger
 * /courses:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */

router.get("/", verifyAccess, getAll);
router.post("/", verifyAccess, imageUpload, createOne);
router.get("/:id", verifyAccess, getOne);
router.put('/:id', verifyAccess, updateOne);
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
