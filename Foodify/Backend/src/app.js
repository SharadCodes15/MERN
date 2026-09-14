// Create servers
const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/auth.routes")

const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello World")
})


// Auth Routes
app.use('/api/auth',authRoutes)

module.exports = app; 