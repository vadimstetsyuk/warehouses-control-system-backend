var express = require('express');
var mongoose = require('mongoose');
var bodyBarser = require('body-parser');
var warehousesRouter = require('./routers/warehouses');

var app = express();

var PORT = 3000;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'warehousesdb';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyBarser.json());
app.use(bodyBarser.urlencoded({
    extended: true
}));

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})