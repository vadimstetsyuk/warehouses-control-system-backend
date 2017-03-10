var express = require('express');
var Product = require('../models/product');

var productsRouter = express.Router();

productsRouter
    .route('/products')
    .get((req, res) => {
        console.log('GET /products');
        Product.find((err, products) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            console.log(products);
            res.json(products);
        });
    })
    .post((req, res) => {
        console.log('POST /products');

        var product = new Product(req.body);

        product.save();

        res.status(201).send(product);
    });

productsRouter
    .route('/products/:id')
    .get((req, res) => {
        console.log('GET /products/:id');

        var productId = req.params.id;

        Product.findOne({ id: productId }, (err, product) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            console.log(product);
            res.json(product);
        });

    })
    .put((req, res) => {
        console.log('PUT /products/:id');

        var productId = req.params.id;

        Product.findOne({ id: productId }, (err, product) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (product) {
                product.warehouseId = req.body.warehouseId;
                product.name = req.body.name;
                product.date = req.body.date;
                product.endDate = req.body.endDate;
                product.price = req.body.price;
                product.numberPlace = req.body.numberPlace;

                product.save();

                res.json(product);
                return;
            }

            res.status(404).json({
                message: 'Product with id ' + productId + 'was not found'
            });
        });
    })
    .delete((req, res) => {
        console.log('DELETE /products/:id');

        var productId = req.params.id;

        Product.findOne({ id: productId }, (err, product) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (product) {
                product.remove((err) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }

                    res.status(200).json({
                        'message': 'Product with id ' + productId + ' was removed.'
                    });
                });
            } else {
                res.status(404).json({
                    message: 'Product with id ' + productId + ' was not found.'
                });
            }
        });
    });

module.exports = productsRouter;