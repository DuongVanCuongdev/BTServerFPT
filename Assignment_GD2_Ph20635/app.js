var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var singupRouter = require('./routes/signup');
var productRouter = require('./routes/product');
var userRouter = require('./routes/user');

var indexApiRouter = require('./routes/indexApiApp');
var loginApiRouter = require('./routes/loginApiApp');
var singupApiRouter = require('./routes/signupApiApp');
var producApitRouter = require('./routes/productApiApp');
var userApiRouter = require('./routes/userApiApp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', singupRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

app.use('/api/', indexApiRouter);
app.use('/api/login', loginApiRouter);
app.use('/api/signup', singupApiRouter);
app.use('/api/product', producApitRouter);
app.use('/api/user', userApiRouter);



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
