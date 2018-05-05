const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/os');

const index = require('./routes/index');
const logIn = require('./routes/logIn');
const signUp = require('./routes/signUp');
const board = require('./routes/board');
const saveBoard = require('./routes/saveBoard');
const isBoardExists = require('./routes/isBoardExists');
const deleteBoard = require('./routes/deleteBoard');
const getUserSaveBoards = require('./routes/getUserSavedBoards');

const app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');

    if (res.method === "OPTIONS") {
        console.log("OPT,...");
        res.header('Access-Control-Allow-Headers', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/', index);
// app.use('/users', users);
app.use('/logIn', logIn);
app.use('/signUp', signUp);
app.use('/board', board);
app.use('/saveBoard', saveBoard);
app.use('/isBoardExists', isBoardExists);
app.use('/deleteBoard', deleteBoard);
app.use('/getUserSaveBoards', getUserSaveBoards);

app.use( '/public', express.static('public') );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


module.exports = app;
