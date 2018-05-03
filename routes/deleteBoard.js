const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const fs = require("fs");

router.post('/', function (req, res, next) {
    Room.findById(req.body["boardId"], function (err, boardInfo) {
        if (!boardInfo)
            return next(new Error('Could not load Document'));
        else {
            boardInfo.remove(function (err) {
                if (err)
                    console.log('error');
                else {
                    console.log('success');
                }
            });
        }
    })
    .then(function (result) {
        console.log(result);

        fs.unlink("public/savedBoards/" + result.imagePath, function(err) {
            console.log("ERROR: " + err);
        });
        res.status(200).json(result);
    });
});


module.exports = router;