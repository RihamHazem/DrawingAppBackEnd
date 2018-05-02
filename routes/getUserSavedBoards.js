const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const fs = require("fs");

router.post('/', function (req, res, next) {
    Room.find()
        .where('userId').equals(req.body.userId)
        .exec()
        .then(function (result) {
            res.status(200).json(result);
        });
});

module.exports = router;