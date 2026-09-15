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
    }
})

const foodmodel = mongoose.model("food",foodSchema)
module.exports = foodmodel;
