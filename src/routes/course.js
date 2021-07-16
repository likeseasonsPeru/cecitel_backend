const express = require("express");
const router = express.Router();
const { imageUpload, verifyAccess } = require("../middlewares");

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  removeOne,
  getByFilter, 
  updateStudents
} = require("../controllers/course");


router.get("/", getAll);

router.post("/", verifyAccess, imageUpload, createOne);

router.get("/:id", getOne);

router.put("/:id", verifyAccess, imageUpload, updateOne);

router.put("/updateStudents/:id", verifyAccess, updateStudents);

router.delete("/:id", verifyAccess, removeOne);

router.post("/getByFilter", verifyAccess, getByFilter);

module.exports = router;
