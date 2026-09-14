const userModel = require('../models/user.model')
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
    },"e8c2w3bQpUz5XkDFJbtLuO6l3narGAHc")
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
    },"e8c2w3bQpUz5XkDFJbtLuO6l3narGAHc")
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

module.exports = {
    registerUser,
    loginUser,
}