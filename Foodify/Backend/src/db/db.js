const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-View")
    .then(()=>{
        console.log("mongodb Connected");
    })
    .catch((err)=>{
        console.log(err," Errors")
    })
}

module.exports = connectDB