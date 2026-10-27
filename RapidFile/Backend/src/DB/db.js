const mongoose = require("mongoose");

async function connectDB() {
    const {MONGODB_URI} = process.env;
    if(!MONGODB_URI){
        throw new Error("MongoDB_URI is Not Configured");
    }
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    }
    catch(e){
        throw new Error("MONGODB_URI Not connected")
    }
}

module.exports = connectDB