const foodpartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');
async function getFoodPartnerByID(req,res) {
    const foodPartnerId = req.params.id;
    const foodPartner = await  foodpartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({foodPartner:foodPartnerId})
    if(!foodPartner){
        return res.status(404).json({message:"Food Partner not found"})
    }
    res.status(200).json({
        message:"Food patner retrieved successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }
    }) 
}

module.exports = {
    getFoodPartnerByID
};