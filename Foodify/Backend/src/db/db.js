const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(proccess.env.MONGODB_URI)
    .then(()=>{
        console.log("mongodb Connected");
    })
    .catch((err)=>{
        console.log(err," Errors")
    })
}

module.exports = connectDB