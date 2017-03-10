var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parametersSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    warehouseId: {
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
    }
}, { collection: 'Parameters' });

module.exports = mongoose.model('Parameters', parametersSchema);