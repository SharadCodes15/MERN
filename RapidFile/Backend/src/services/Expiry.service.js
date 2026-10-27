const DataModel = require("../models/Data.model")

async function checkExpiryDates() {
    return DataModel.find({TimeofExpiry : {$lte:new Date()}});
}
module.exports = checkExpiryDates