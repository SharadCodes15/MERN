const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likesModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

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

async function likeFood(req,res) {
  const { foodId } = req.body;
  const user = req.user;

  const isliked = await likesModel.findOne({
    user:user._id,
    food:foodId
  })
  if(isliked){
    await likesModel.deleteOne({
      user:user._id,
      food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
      $inc:{likeCount:-1}
    })
    return res.status(200).json({
        message:"Food Unliked Successfully",
    })
  }

  const like = await likesModel.create({
    user:user._id,
    food:foodId,
  })
  await foodModel.findByIdAndUpdate(foodId,{
      $inc:{likeCount:1}
    })
  res.status(201).json({
    message:"Food liked Successfully",
    like
  })

}

async function SaveFood(req,res) {
    const { foodId } = req.body;
  const user = req.user;

  const isSaved = await saveModel.findOne({
    user:user._id,
    food:foodId
  })
  if(isSaved){
    await saveModel.deleteOne({
      user:user._id,
      food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
      $inc:{saveCount:-1}
    })
    return res.status(200).json({
        message:"Food Unsaved Successfully",
    })
  }

  const save = await saveModel.create({
    user:user._id,
    food:foodId,
  })
  await foodModel.findByIdAndUpdate(foodId,{
      $inc:{saveCount:1}
    })
  res.status(201).json({
    message:"Food saved Successfully",
    save
  })
}


module.exports = {
  createFood,
  GetFoodsItems,
  likeFood,
  SaveFood
};
