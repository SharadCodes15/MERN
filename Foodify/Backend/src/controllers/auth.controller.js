const userModel = require('../models/user.model')
const foodpartnerModel = require('../models/foodpartner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req,res) {
    const {fullname,email,password} = req.body;
     
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname,
        email,
        password:hashedPassword,
         
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    }) 
}

async function loginUser(req,res) {
     const {email,password} = req.body;

     const user = await userModel.findOne({
        email
     })

     if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
     }
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if (!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
     }
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(201).json({
        message:"User Login Successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        }
    }) 
}

async function logoutUser(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logout Successfull"
    })
}

async function registerFoodPartner(req,res) {
    const {name,contactName,phone,address,email,password} = req.body;
    const isFoodPartnerAlreadyExists = await foodpartnerModel.findOne({
        email
    })
    if(isFoodPartnerAlreadyExists){
        return res.status(400).json({
            message:"Food Partner already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const foodpartner = await foodpartnerModel.create({
        name,
        contactName,
        phone,
        address,
        email,
        password : hashedPassword
    })

    const token = jwt.sign({
        id:foodpartner._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"Food Partner Registered Successfully",
        foodpartner:{
            _id:foodpartner._id,
            email:foodpartner.email,
            name:foodpartner.name
        }
    }) 
}

async function loginFoodPartner(req,res) {
     const {email,password} = req.body;

     const foodpartner = await foodpartnerModel.findOne({
        email
     })

     if(!foodpartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
     }
     const isPasswordValid = await bcrypt.compare(password,foodpartner.password)
     if (!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
     }
    const token = jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token);
    res.status(201).json({
        message:"Food Partner Login Successfully",
        foodpartner:{
            _id:foodpartner._id,
            email:foodpartner.email,
            fullname:foodpartner.fullname
        }
    }) 
}

async function logoutFoodPartner(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"Food Partner Logout Successfull"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}