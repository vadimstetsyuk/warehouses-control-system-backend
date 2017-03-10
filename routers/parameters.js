var express = require('express');
var Parameters = require('../models/parameters');
var Warehouse = require('../models/warehouse');

var parametersRouter = express.Router();


parametersRouter
    .route('/parameters')
    .post((req, res) => {
        console.log('POST /parameters');

        var parameters = new Parameters(req.body);

        parameters.save();

        res.status(201).send(parameters);
    });

parametersRouter
    .route('/parameters/:warehouseId')
    .get((req, res) => {
        console.log('GET /parameters/:id');

        var warehouseId = req.params.warehouseId;

        Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
            if (err) {
                res.status(404).send(err);
                return;
            }

            var lowT = warehouse.minTemperature; var highT = warehouse.maxTemperature;

            var lowH = warehouse.minHumidity; var highH = warehouse.maxHumidity;

            Parameters.findOne({ warehouseId: warehouseId }, (err, parameters) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                if (parameters) {
                    parameters.temperature = (Math.random() * (highT - lowT) + lowT) / 10;
                    parameters.humidity = (Math.random() * (highH - lowH) + lowH) / 10;

                    parameters.save();

                    res.json(parameters);
                    return;
                }

                res.status(404).json({
                    message: 'Parameters with ' + warehouseId + ' was not found'
                });
            });
        });
    });

module.exports = parametersRouter;