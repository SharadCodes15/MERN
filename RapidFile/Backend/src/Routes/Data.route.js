const express = require("express");
const router = express.Router();
const DataController = require("../controllers/Data.controller");
const multer = require("multer");
const data10mb = 10 * 1024 *1024;
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:data10mb
    }
})

// create Data
router.post('/create',upload.array('imageUrls',5),DataController.createData)
router.get("/get/all",DataController.getDataAll)
router.get('/:url',DataController.getDataBysiteURL)
module.exports = router