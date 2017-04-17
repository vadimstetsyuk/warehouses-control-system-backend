var express = require('express');
var User = require('../models/user');
var md5 = require('md5');

var usersRouter = express.Router();

usersRouter
    .route('/users')
    .get((req, res) => {
        console.log('GET /users');

        User.find((err, users) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            console.log(users);
            res.json(users);
        });
    })
    .post((req, res) => {
        console.log('POST /users');

        var user = new User(req.body);
        user.password = md5(user.password);
        user.save();

        res.status(201).send(user);
    });

usersRouter
    .route('/users/:id')
    .get((req, res) => {
        console.log('GET /users/:id');

        let userId = req.params.id;

        User.findOne({ id: userId }, (err, user) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            console.log(user);
            res.json(user);
        });
    })
    .put((req, res) => {
        console.log('PUT /users/:id');

        let userId = req.params.id;

        User.findOne({ id: userId }, (err, user) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (user) {
                user.firstname = req.body.firstname;
                user.lastname = req.body.lastname;
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = md5(req.body.password);
                user.role = req.body.role;

                user.save();

                res.json(user);
                return;
            }

            res.status(404).json({
                message: 'User with id ' + userId + 'was not found'
            });
        });
    })
    .delete((req, res) => {
        console.log('DELETE /users/:id');

        let userId = req.params.id;

        User.findOne({ id: userId }, (err, user) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (user) {
                user.remove((err) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }

                    res.status(200).json({
                        'message': 'User with id ' + userId + ' was removed.'
                    });
                });
            } else {
                res.status(404).json({
                    message: 'User with id ' + userId + ' was not found.'
                });
            }
        });
    });

module.exports = usersRouter;