const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/room');

router.post('/', function(req, res, next) {
    let idd = new mongoose.Types.ObjectId();
    const room = new Room({
        _id: idd,
        userId: req.body.userId,
        boardName: req.body.boardName,
        imagePath: ""
    });
    console.log("user:", req.body.userId);
    room.save()
        .then(function (result) {
            res.status(201).json({
                id: idd
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