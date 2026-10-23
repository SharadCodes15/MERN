const DataModel = require('../models/Data.model')
const storageService = require("../services/storage.service");

async function createData(req,res) {
    if(!req.files){
       return files = []
    }
    const fileupload = await storageService.uploadFile(req.files,`${uuid()}-${req.file.originalname}`)

}