const express = require("express");
const router = express.Router();
const { imageUpload, userAccess } = require("../middlewares");

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

router.get("/", userAccess, getAll);

router.post("/", userAccess, createOne);

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

router.get("/:id", userAccess, getOne);

router.put("/:id", userAccess, updateOne);

router.put(
  "/updateTeacher/:id",
  userAccess,
  imageUpload,
  modifyTeacherByCourseID
);

router.delete("/:id", userAccess, removeOne);

router.post("/getByFiler", userAccess, getByFilter);

module.exports = router;
