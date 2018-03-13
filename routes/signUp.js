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
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    });
    User.find()
        .where('email').equals(req.body.email)
        .exec()
        .then(function (foundUsers) {
            if(!foundUsers.length) {
                user.save()
                    .then(function (result) {
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
            } else {
                res.status(200).json({
                    message: 'This email already registered.'
                });
            }
        })
        .catch(function (reason) {
            console.log(reason);
            res.status(500).json({
                error: reason
            });
        });
});



module.exports = router;