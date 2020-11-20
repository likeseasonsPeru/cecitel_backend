const express = require("express");
const router = express.Router();
const { imageUpload, verifyAccess } = require("../middlewares");

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  removeOne,
  modifyTeacherByCourseID,
  getByFilter
} = require("../controllers/courses/course");

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

router.post("/", verifyAccess, createOne);

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

router.put("/:id", verifyAccess, updateOne);

router.put(
  "/updateTeacher/:id",
  verifyAccess,
  imageUpload,
  modifyTeacherByCourseID
);

router.delete("/:id", verifyAccess, removeOne);

router.post("/getByFiler", verifyAccess, getByFilter);

module.exports = router;
