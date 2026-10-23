const express = require("express");
const router = express.Router();
const DataController = require("../controllers/Data.controller")
const multer = require("multer")
const upload = multer({
    storage:multer.memoryStorage(),
})

// create Data
router.post('/create',upload.array('imageUrls',50),DataController.createData)
router.get("/get",DataController.getData)

module.exports = router