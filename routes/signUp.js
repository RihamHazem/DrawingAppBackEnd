const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


/**
 * create new user.
 * Params: email, password, type
 */
router.post('/', function(req, res, next) {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    });
    user.save()
        .then(function(result) {
            console.log(result);
            res.status(201).json({
                message: 'Successfully added the user.',
                createdUser: result
            });
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;