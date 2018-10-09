var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');//추가
var db = require('./routes/db/db.js');




/* Import Router(S) */
var IndexRouter = require('./routes/index');
var UsersRouter = require('./routes/Users');
var LoginRouter = require('./routes/Login');
var SignUpRouter = require('./routes/SignUp');
var MatchingRouter = require('./routes/Matching');
var AdminRouter = require('./routes/Admin');
var BoardRouter = require('./routes/Board');
var LocationRouter = require('./routes/Location');
var GenreRouter = require('./routes/Genre');
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
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
 }));

/* 라우팅동작구문(S) */
app.use('/', IndexRouter);
app.use('/api/users', UsersRouter);
app.use('/api/Login', LoginRouter);
app.use('/api/SignUp', SignUpRouter);
app.use('/api/Matching', MatchingRouter);
app.use('/api/Admin', AdminRouter);
app.use('/api/Board', BoardRouter);
app.use('/api/Location', LocationRouter);
app.use('/api/Genre', GenreRouter);

//TEST용
app.post('/api/idDuplicateCheck',function(req,res,next){
  console.log('여기는 아이디중복체크.. ');
    var ID = req.body.user_id;
    console.log('ID = ', ID);
    db.query('select user_id from tb_user where user_id=?',[ID],function(err,data,fields){
        console.log('data = ',data);  
        if(err){
            throw err;
        }else{
            var result;
            if(data.length == 0){ //ID 중복X
                result = '0';
            }else{ //ID 중복
                result = '1';
            }
            res.send(result);
        }
    });
});
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
