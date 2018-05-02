const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const fs = require("fs");

router.patch('/', function (req, res, next) {
    let base64Data = req.body["image"];
    base64Data = base64Data.replace(/^data:image\/png;base64,/, "");

    console.log("Board Saved");
    Room.findById(req.body.boardId, function (err, boardInfo) {
        if (!boardInfo)
            return next(new Error('Could not load Document'));
        else {
            if (boardInfo["imagePath"].length === 0) {
                console.log("image updated");
                boardInfo.imagePath = new Date().getTime() + ".png";
            }
            fs.writeFile("public/savedBoards/" + boardInfo.imagePath, base64Data, 'base64', function(err) {
                console.log("ERROR: " + err);
            });
            boardInfo.save(function (err) {
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
        res.status(200).json(result);
    });
});


module.exports = router;