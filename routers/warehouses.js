var express = require('express');
var Warehouse = require('../models/warehouse');

var warehousesRouter = express.Router();

warehousesRouter
    .route('/warehouses')
    .get((req, res) => {
        console.log('GET /warehouses');
        Warehouse.find((err, warehouses) => {
            if (err) {
                res.status(400).send(err);
                return;
            }

            console.log(warehouses);
            res.json(warehouses);
        });
    });


module.exports = warehousesRouter;