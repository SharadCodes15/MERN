const mongoose = require("mongoose");

const imageKitFileSchema = new mongoose.Schema({
    fileId:{type:String,required:true},
    name:{type:String,required:true},
    url:{type:String,required:true},
    thumbnailUrl:{type:String,required:true},
    filePath:{type:String,required:true},

},{_id:false})

const DataSchema = new mongoose.Schema({
    siteURL:{type:String,required:true},
    text:{type:String},
    imageUrls:[imageKitFileSchema],
    TimeofCreation:{type:Date,required:true},
    TimeofExpiry:{type:Date,required:true}
})

const DataModel = mongoose.model("Data",DataSchema);

module.exports = DataModel