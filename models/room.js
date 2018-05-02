const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.String,
    boardName: mongoose.Schema.Types.String,
    imagePath: mongoose.Schema.Types.String
});

module.exports = mongoose.model('Room', roomSchema);