const mongoose = require('mongoose');
const likesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    }
},{
    timestamps:true
})

const likesModel = mongoose.model("Likes",likesSchema);
module.exports = likesModel;