var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var router = express.Router();

//==============================================
// Mongoose Connection
//==============================================
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CouponDB');
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//===============================================
//  Middleware
//===============================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.param('id', (req, res, next, id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send('Invalid ID');
  next();
});

router.param('phone', (req, res, next, phone) => {
  if (!(+phone) || phone.length !== 10)
      return res.status(400).send('Invalid phone');
  next();
});

//===============================================
//  Routes
//===============================================
router.get('/', function(req, res){
  res.send("Hello..");
})

app.use('/', router);

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
