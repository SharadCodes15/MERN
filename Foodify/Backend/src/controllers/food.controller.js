const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");

const { v4: uuid } = require("uuid");
async function createFood(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "No video uploaded",
    });
  }

  const fileUploadResult = await storageService.uploadFile(
    req.file,
    `${uuid()}-${req.file.originalname}`,
  );
//   console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodpartner: req.foodpartner._id,
  });

  res.status(201).json({
    message:"Food Created Successfully",
    food:foodItem,
  })
}

async function GetFoodsItems(req,res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message:"Food Item fetched Successfully",
        foodItems:foodItems
    })
    
}

module.exports = {
  createFood,
  GetFoodsItems
};
