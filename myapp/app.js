var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser =require('body-parser');
var indexRouter = require('./routes/order');
var usersRouter = require('./routes/users');
var firstRouter = require('./routes/first');
var checkRouter = require('./routes/check');
var addRouter = require('./routes/add');
var bodyParser = require('body-parser');
var fs=require('fs')
var app = express();
var mysql = require('mysql');
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/order', indexRouter);
app.use('/users', usersRouter);
app.use('/check', checkRouter);
app.use('/add', addRouter);
app.use('/', firstRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.use(function (request, response) {

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('<img src="/redled.jpg" />');
    response.end('<img src="/greenled.jpg" />');
    response.end('<img src="/yellowled.jpg" />');

});
module.exports = app;
