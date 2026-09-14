const mongoose = require('mongoose');
const foodpartnerShcema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const foodpartnerModel = mongoose.model("foodpartner",foodpartnerShcema);
module.exports = foodpartnerModel