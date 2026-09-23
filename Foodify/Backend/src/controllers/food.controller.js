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
    const [foodItems, userLikes, userSaves] = await Promise.all([
      foodModel.find({}),
      likesModel.find({ user: req.user._id }).select("food"),
      saveModel.find({ user: req.user._id }).select("food"),
    ]);
    const likedFoodIds = new Set(userLikes.map((like) => like.food.toString()));
    const savedFoodIds = new Set(userSaves.map((save) => save.food.toString()));

    res.status(200).json({
        message:"Food Item fetched Successfully",
        foodItems: foodItems.map((foodItem) => ({
          ...foodItem.toObject(),
          liked: likedFoodIds.has(foodItem._id.toString()),
          saved: savedFoodIds.has(foodItem._id.toString()),
        }))
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

async function GetSavedFoods(req, res) {
  const savedRecords = await saveModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select("food");
  const savedFoodIds = savedRecords.map((record) => record.food);
  const foodItems = await foodModel.find({ _id: { $in: savedFoodIds } });
  const foodById = new Map(foodItems.map((foodItem) => [foodItem._id.toString(), foodItem]));

  res.status(200).json({
    message: "Saved food items fetched successfully",
    savedItems: savedFoodIds
      .map((foodId) => foodById.get(foodId.toString()))
      .filter(Boolean)
      .map((foodItem) => ({
        ...foodItem.toObject(),
        saved: true,
      })),
  });
}


module.exports = {
  createFood,
  GetFoodsItems,
  likeFood,
  SaveFood,
  GetSavedFoods
};
