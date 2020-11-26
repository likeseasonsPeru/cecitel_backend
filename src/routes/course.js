const express = require("express");
const router = express.Router();
const { imageUpload, verifyAccess } = require("../middlewares");

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  removeOne,
  getByFilter
} = require("../controllers/course");

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

/**
 * @swagger
 * /courses/:id:
 *   get:
 *     description: Get one books
 *     responses:
 *       200:
 *         description: Success
 *
 */

router.get("/:id", verifyAccess, getOne);

router.put("/:id", verifyAccess, imageUpload, updateOne);

router.delete("/:id", verifyAccess, removeOne);

router.post("/getByFiler", verifyAccess, getByFilter);

module.exports = router;
