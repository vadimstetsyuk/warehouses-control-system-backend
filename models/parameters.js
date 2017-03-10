var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parametersSchema = new Schema({
    id: Number,
    parentId: Number,
    temperature: Number,
    humidity: Number
}, { collection: 'Parameters' });

module.exports = mongoose.model('Parameters', parametersSchema);