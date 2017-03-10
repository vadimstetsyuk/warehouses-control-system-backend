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

module.exports = productsRouter;