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




router.get("/", verifyAccess, getAll);

router.post("/", verifyAccess, imageUpload, createOne);



router.get("/:id", verifyAccess, getOne);

router.put("/:id", verifyAccess, imageUpload, updateOne);

router.put("/updateStudents/:id", verifyAccess, updateStudents);

router.delete("/:id", verifyAccess, removeOne);

router.post("/getByFiler", verifyAccess, getByFilter);

module.exports = router;
