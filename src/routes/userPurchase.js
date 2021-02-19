const express = require('express');
const router = express.Router();

const {imageUpload, verifyAccess} = require('../middlewares')

const {getAllPurchases, getDisapproved, createOne, updateOne, deleteOneByPurchaseId} = require('../controllers/userPurchase');

router.get("/getAll", verifyAccess, getDisapproved);

router.post("/:id", verifyAccess, imageUpload, createOne);

router.put("/:id", verifyAccess, imageUpload, updateOne) 

router.delete("/:id", verifyAccess, deleteOneByPurchaseId) 

module.exports = router;