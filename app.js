const express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
// var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/os');

const index = require('./routes/index');
// const users = require('./routes/users');
const logIn = require('./routes/logIn');
const signUp = require('./routes/signUp');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(res.method === "OPTIONS") {
      res.header('Access-Control-Allow-Headers', 'PUT, POST, DELETE, PATCH, GET');
      return res.status(200).json({});
  }
  next();
});


app.use('/', index);
// app.use('/users', users);
app.use('/logIn', logIn);
app.use('/signUp', signUp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
