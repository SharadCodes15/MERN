const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema({
    siteURL:String,
    text:String,
    imageURLs:[String],
    TimeofCreation:Date,
    TimeofExpiry:Date
})

const DataModel = mongoose.model("Data",DataSchema);

module.exports = DataModel