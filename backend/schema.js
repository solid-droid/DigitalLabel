const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default:'Not defined'
    },
    code: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Product', product);