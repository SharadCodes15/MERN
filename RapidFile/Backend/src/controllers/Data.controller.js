const DataModel = require('../models/Data.model')
const storageService = require("../services/storage.service");

async function createData(req,res) {
    if(!req.files){
       return files = []
    }
    const fileupload = await storageService.uploadFile(req.files)
    if(fileupload != null){
        return files = []
    }
    const createDate = new Date();
    let expiryDate = new Date(create);
    expiryDate.setDate(expiryDate.getDate() + 2);

    const DataItem = await DataModel.create({
        siteURL:uuid(),
        text:req.body.text,
        imageURLs:files,
        TimeofCreation:createDate,
        TimeofExpiry:expiryDate
    })

    res.status(201).json({
        message:"Data Created",
        data:DataItem,
    })
}

async function getData(req,res) {
    try{

        const dataItem = await DataModel.find({}).toArray();
        res.status(200).json({
            Data:dataItem
        })
    }catch(error){
        res.status(400).json({
            message:"Error occured ",
            error:error
        })
    }


}