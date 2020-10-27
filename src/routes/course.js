const express = require("express");
const router = express.Router();
const { verifyAccess} = require('../middlewares')

const { getAll, createOne, getOne, updateOne, removeOne } = require("../controllers/course");

router.get("/", verifyAccess, getAll);
router.post("/", verifyAccess, createOne);
router.get("/:id", verifyAccess, getOne);
router.put('/:id', verifyAccess, updateOne);
router.delete("/:id", verifyAccess, removeOne);

module.exports = router;
