const express = require("express");
const router = express.Router();
const { verifyAccess } = require("../middlewares");

const {
  getOne,
  getAll,
  createOne,
  updateOne,
  removeOne
} = require("../controllers/exam");

router.get("/", verifyAccess, getAll);
router.get("/:id", verifyAccess, getOne);
router.post("/", verifyAccess, createOne);
router.put("/:id", verifyAccess, updateOne);
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;