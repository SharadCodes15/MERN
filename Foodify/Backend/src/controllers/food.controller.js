const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service') 
const {v4:uuid} = require('uuid')
async function createFood(req,res) {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    console.log(fileUploadResult)

}
 

module.exports = {
    createFood,
}