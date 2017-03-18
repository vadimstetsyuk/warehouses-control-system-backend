var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    warehouseId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberPlace: {
        type: Number,
        required: true
    },
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema);