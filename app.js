var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var upload = require('./routes/upload');
var media = require('./routes/media');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  // store:new RedisStore({
  // user:{
  //     userid:1,
  //     username:"linn"
  // },
  //     error:"我是error"
  // }),
  cookie:{maxAge:80000},
  resave:false,
  saveUninitialized:false,
  secret:"I am session"
}));

app.use('/', index);
app.use('/users', users);
app.use('/home/',home);
app.use('/upload',upload);
app.use('/media',media);

//catch 404 and forward to error handler
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
  res.render('error');
});



module.exports = app;
