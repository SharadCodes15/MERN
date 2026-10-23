const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.log("error",err);
        
    })
}

module.exports = connectDB