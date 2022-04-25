var createError = require('http-errors');                  //create variable create Error for using
var express = require('express');                          //create variable express for using
var path = require('path');                                //create a path for using
var cookieParser = require('cookie-parser');               //create a cookie parser for using
var logger = require('morgan');                            
var indexRouter = require('./routes/index');               //create a indexRouter for using
var usersRouter = require('./routes/users');               //create userRouter for using
var app = express();                                       //create an app for using
// view engine setup
app.set('views', path.join(__dirname, 'views'));           //set views is the pate for reading ejs
app.set('view engine', 'jade');                            // set jade by enging

app.use(logger('dev'));
app.use(express.json());                                   //using express json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());                                   //using cookie parser
app.use(express.static(path.join(__dirname, 'public')));    //render file ejs in public

app.use('/', indexRouter);                                 //using / for indexRouter
app.use('/users', usersRouter);                            //using /users for userRouter

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
