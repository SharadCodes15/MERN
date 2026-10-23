const app = require('./src/app')
const connectDB = require("./src/DB/db");
require("dotenv").config()
connectDB()
app.listen(3000,()=>{
    console.log("Running on port 3000")
});