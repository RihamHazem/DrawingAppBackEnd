const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    photoPath: mongoose.Schema.Types.String,
    type: mongoose.Schema.Types.String
});

module.exports = mongoose.model('User', userSchema);