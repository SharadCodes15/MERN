const foodpartnerModel = require("../models/foodpartner.model")
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message:"Register / Login first",
        })
        return;
    }

    try{
        // decoded contains object which is provided like _id
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const foodpartner = await foodpartnerModel.findById(decoded.id)

        if (!foodpartner) {
            return res.status(401).json({
                message: "Food partner not found",
            })
        }

        req.foodpartner = foodpartner
        next()
    }catch(err){
        // token is invalid
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}


async function authUserMiddleware(req,res,next) {
    const token = req.cookies.token;
    if(!token){
            res.status(401).json({
            message:"Register / Login first",
        })
        return;
    }
    try{
        // decoded contains object which is provided like _id
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user = user
        next()
    }catch(err){
        // token is invalid
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports  = {
    authFoodPartnerMiddleware,authUserMiddleware
}