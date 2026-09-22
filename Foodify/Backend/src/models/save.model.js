const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    }
}, {
    timestamps: true
});

const saveModel = mongoose.model('Save', saveSchema);
module.exports = saveModel;
