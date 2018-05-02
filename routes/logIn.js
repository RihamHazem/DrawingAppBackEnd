const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * log in user.
 * Params: email, password
 */
router.post('/', function(req, res, next) {
    User.find()
        .where('email').equals(req.body.email)
        .where('password').equals(req.body.password)
        .exec()
        .then(function(result) {
            if(result.length) {
                res.status(201).json({
                    message: 'Successfully found the user.',
                    foundUser: result[0]
                });
            } else {
                res.status(201).json({
                    message: 'User not found.'
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;