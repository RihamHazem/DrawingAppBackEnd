const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/room');

router.post('/', function (req, res, next) {
    let _id = req.body["boardId"];
    if (!_id.match("/^[0-9a-fA-F]{24}$/")) {
        res.status(200).json({
            msg: "Not Exists"
        });
    }

    console.log("finding board...");
    Room.findById(_id, function (err, boardInfo) {
        console.log("BOARD: " + boardInfo);
    })
        .then(function (result) {
            console.log("heyooooo: " + result);
            if (! result)
                res.status(200).json({
                    msg: "Not Exists"
                });
            else
                res.status(200).json({
                    msg: "Exists",
                    result: result
                });
        })
        .catch(function (reason) {
            console.log("heyyyyyy: " + reason);
        });
});


module.exports = router;