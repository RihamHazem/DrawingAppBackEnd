const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const fs = require("fs");

/**
 * create new user.
 * Params: email, password, type
 */
router.post('/', function(req, res, next) {
    let base64Data = req.body["photo"];
    let extension = '.png';
    if (base64Data.substr(11, 4) === "jpeg") {
        base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
        extension = '.jpeg';
    } else if (base64Data.substr(11, 3) === "svg") {
        base64Data = base64Data.replace(/^data:image\/svg\+xml;base64,/, "");
        extension = '.svg';
    } else {
        base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
    }
    let time = new Date().getTime();
    fs.writeFile("public/usersPhoto/" + time + extension, base64Data, 'base64', function(err) {
        console.log(err);
    });

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photoPath: time + extension,
        type: req.body.type
    });
    User.find()
        .where('email').equals(req.body.email)
        .exec()
        .then(function (foundUsers) {
            if(!foundUsers.length) {
                user.save()
                    .then(function (result) {
                        console.log("The result:");
                        console.log(result);
                        res.status(201).json({
                            message: 'Successfully added the user.',
                            createdUser: result,
                            imageName: time + extension
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