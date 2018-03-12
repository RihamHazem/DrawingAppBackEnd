const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/**
 * GET users listing.
 * Output: array of json, each json is a user info
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 *  GET user info.
 * Params: user id
 * Output: email, password, type
 */
router.get('/:userId', function(req, res, next) {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(function (doc) {
            res.status(200).json(doc);
        })
        .catch(function (err) {
            res.status(500).json({error: err});
        });
});

/**
 * Update user information.
 * Params: user id
 * Output: a successful message
 */
router.patch('/:userId', function(req, res, next) {
    var msg = 'user with id: ' + req.params.userId + ' is successfully updated';
    res.status(200).json({
        message: msg
    });
});

/**
 * DELETE a user.
 * Params: user id
 * Output: a successful message
 */
router.delete('/:userId', function(req, res, next) {
    var msg = 'User with id: ' + req.params.userId + ' is successfully deleted';
    res.status(200).json({
        message: msg
    });
});
module.exports = router;
