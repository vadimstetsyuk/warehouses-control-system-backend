var express = require('express');
var Warehouse = require('../models/warehouse');

var warehousesRouter = express.Router();

warehousesRouter
    .route('/warehouses')
    .get((req, res) => {
        console.log('GET /warehouses');
        Warehouse.find((err, warehouses) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            console.log(warehouses);
            res.json(warehouses);
        });
    })
    .post((req, res) => {
        console.log('POST /warehouses');

        var warehouse = new Warehouse(req.body);

        warehouse.save();

        res.status(201).send(warehouse);
    });

warehousesRouter
    .route('/warehouses/:id')
    .get((req, res) => {
        console.log('GET /warehouses/:id');

        var warehouseId = req.params.id;

        Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            console.log(warehouse);
            res.json(warehouse);
        });

    })
    .put((req, res) => {
        console.log('PUT /warehouses/:id');

        var warehouseId = req.params.id;

        Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (warehouse) {
                warehouse.typeProduct = req.body.typeProduct;
                warehouse.name = req.body.name;
                warehouse.img = req.body.img;
                warehouse.info = req.body.info;
                warehouse.amountProducts = req.body.amountProducts;
                warehouse.temperature = req.body.temperature;
                warehouse.humidity = req.body.humidity;
                warehouse.minTemperature = req.body.minTemperature;
                warehouse.maxTemperature = req.body.maxTemperature;
                warehouse.minHumidity = req.body.minHumidity;
                warehouse.maxHumidity = req.body.maxHumidity;

                warehouse.save();

                res.json(warehouse);
                return;
            }

            res.status(404).json({
                message: 'Warehouse with id ' + warehouseId + 'was not found'
            });
        });
    })
    .delete((req, res) => {
        console.log('DELETE /warehouses/:id');

        var warehouseId = req.params.id;

        Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if(warehouse) {
                warehouse.remove((err) => {
                    if(err) {
                        res.status(500).send(err);
                        return;
                    }

                    res.status(200).json({
                        'message': 'Warehouse with id ' + warehouseId + ' was removed.'
                    });
                });
            } else {
                res.status(404).json({
                    message: 'Warehouse with id ' + warehouseId + ' was not found.'
                });
            }
        });
    });

module.exports = warehousesRouter;