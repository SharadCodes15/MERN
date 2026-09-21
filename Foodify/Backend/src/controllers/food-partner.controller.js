const foodpartnerModel = require('../models/foodpartner.model');
const foodpartner = require('../models/foodpartner.model');

const router = require('../routes/auth.routes');

async function getFoodPartnerByID(req,res) {
    const foodPartnerId = req.params.id;
    const foodPartner = await  foodpartnerModel.findById(foodPartnerId)
    if(!foodpartner){
        return res.status(404).json({message:"Food Partner not found"})
    }
    res.status(200).json({
        message:"Food patner retrieved successfully",
        foodPartner
    })
}

module.exports = router;