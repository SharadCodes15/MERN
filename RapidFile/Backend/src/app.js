const express = require('express')
const DataRoutes = require("./Routes/Data.route")
const cors = require("cors")

const app = express()
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5371",
    credentials:true
}))

app.use('/api/data',DataRoutes)

module.exports = app;