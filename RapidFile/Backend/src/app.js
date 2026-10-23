const express = require('express')
const multer = require("multer")

const app = express()
app.use(multer);
const port = 3000



app.get("/",(req,res)=>{
    res.send("Hello world")
})


module.exports = app;