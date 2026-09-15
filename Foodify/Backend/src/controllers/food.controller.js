const foodmodel = require("../models/food.model");
const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");

const { v4: uuid } = require("uuid");
async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );
//   console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message:"Food Created Successfully",
    food:foodItem,
  })
}

module.exports = {
  createFood,
};
