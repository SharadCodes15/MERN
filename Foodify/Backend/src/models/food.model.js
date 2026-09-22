const mongoose = require("mongoose")
const foodSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    }    ,
    video:{
        type:String, // Url to be stored in DB
        required:true,
    },
    description:{
      type:String  
    },
    foodpartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner",
    },
    likeCount:{
         type:Number,
         default:0
    },
    saveCount:{
        type:Number,
        default:0
    }
})

const foodmodel = mongoose.model("food",foodSchema)
module.exports = foodmodel;
