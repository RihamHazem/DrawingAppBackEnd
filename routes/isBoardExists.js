const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/room');

router.post('/', function (req, res, next) {
    let _id = req.body["boardId"];

    console.log("finding board..." + _id);
    Room.findById(_id, function (err, boardInfo) {
        if (!boardInfo)
            return next(new Error('Could not load Document'));
        console.log("BOARD: " + boardInfo);
    })
        .then(function (result) {
            var data = {};
            if (! result) {
                console.log("res: " + result);
                data = {
                    msg: "Not Exists"
                };
            }
            else {
                console.log("res2: " + result);
                data = {
                    msg: "Exists",
                    result: result
                };
            }
            res.status(200).json(data);
        });
});


module.exports = router;