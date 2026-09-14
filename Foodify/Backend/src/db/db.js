const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("mongodb Connected");
    })
    .catch((err)=>{
        console.log(err," Errors")
    })
}

module.exports = connectDB