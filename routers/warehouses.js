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

module.exports = warehousesRouter;