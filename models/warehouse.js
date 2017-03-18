var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var warehouseSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    typeProduct: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    amountProducts: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    minTemperature: {
        type: Number,
        required: true
    },
    maxTemperature: {
        type: Number,
        required: true
    },
    minHumidity: {
        type: Number,
        required: true
    },
    maxHumidity: {
        type: Number,
        required: true
    }
}, { collection: 'warehouses' });

module.exports = mongoose.model('Warehouse', warehouseSchema);