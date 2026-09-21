// Create servers
const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/auth.routes")
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.get('/',(req,res)=>{
    res.send("Hello World")
})


// Auth Routes
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/foodpartner',foodPartnerRoutes)
module.exports = app; 