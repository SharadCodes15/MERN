const ImageKit = require("imagekit");
const mongoose = require('mongoose')
const checkExpiryDate = require('../services/Expiry.service');
const dataModel = require('../models/Data.model')
// const ImageKit = require('imagekit');


async function deleteFiles(fileIds) {
    const result = await checkExpiryDate()
    if(result === null){
        console.log("Unable to delete null response error");
        return;
    }
    const FileIds = result.flatMap(item=>{
        return item.imageUrls.map(image=>image.fileId)
    })
    const objIds = result.map(item=>item._id)
    await ImageKit.bulkDeleteFiles(FileIds)
    .then(Response =>{
        // return Response
        dataModel.deleteMany({_id:{$in : objIds}})
        console.log("Succesfuly deleted",Response);

    })
    .catch(error=>{
        // return error
        console.log("Error when deleting",error);
    })
}
module.exports = deleteFiles