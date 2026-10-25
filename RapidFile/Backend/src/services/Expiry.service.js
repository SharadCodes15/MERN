const mongoose = require('mongoose')
const DataModel = require('../models/Data.model')


async function checkExpiryDates() {
    const now = new Date();
    try{

        const result = await DataModel.find({TimeofExpiry:{$lte:now}});
        // res.status(200).json({
        //     message:"Found",
        //     result : result
        // })
        return result
    }
    catch(err){
        // res.status(500).json({
        //     message:"Error",
        //     error:err
        // })
        console.log("error",err);
        return null
    }
    return null
}

module.exports = checkExpiryDates