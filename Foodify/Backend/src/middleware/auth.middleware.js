const foodpartnerModel = require("../models/foodpartner.model")
const jwt = require('jsonwebtoken')

async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message:"Register / Login first"
        })
        return;
    }

    try{
        // decoded contains object which is provided like _id
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const foodpartner = await foodpartnerModel.findById(decoded.id)
        req.foodpartner = foodpartner
    }catch(err){
        // token is invalid
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}
module.exports  = {
    authFoodPartnerMiddleware
}