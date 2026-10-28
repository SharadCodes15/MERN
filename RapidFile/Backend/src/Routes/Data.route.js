// Changes will be -> use image of proper format only

const express = require("express");
const router = express.Router();
const DataController = require("../controllers/Data.controller");
const multer = require("multer");
const data10mb = 10 * 1024 *1024;
const allowedImageTypes = new set(["image/jpeg","image/png","image/gif","image/webp"]);
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:data10mb,
        files:5,
    },
    fileFilter(req,file,callback){
        if(allowedImageTypes.has(file.mimetype)){
            return callback(null,true);
        }
        const error =new Error("only JPEG,PNG,GIF and WebP images are supported");
        error.statusCode =400;
        callback(error);
    },
});

// create Data
router.post('/create',upload.array('imageUrls',5),DataController.createData)
router.get("/get/all",DataController.getDataAll)
router.get('/:url',DataController.getDataBysiteURL)
module.exports = router