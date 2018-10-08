var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


/* Import Router(S) */
var IndexRouter = require('./routes/index');
var UsersRouter = require('./routes/Users');
var LoginRouter = require('./routes/Login');
var SignUpRouter = require('./route/SignUp');
var MatchingRouter = require('./route/Matching');
var AdminRouter = require('./route/Admin');
var BoardRouter = require('./route/Board');
/* Import Router(E) */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* 라우팅동작구문(S) */
app.use('/', IndexRouter);
app.use('/api/users', UsersRouter);
app.use('/api/Login', LoginRouter);
app.use('/api/SignUp', SignUpRouter);
app.use('/api/Matching', MatchingRouter);
app.use('/api/Admin', AdminRouter);
app.use('/api/Board', BoardRouter);
/* 라우팅동작구문(E) */

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

module.exports = app;
