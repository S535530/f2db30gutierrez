var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jams = require("./models/jam");

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jamRouter = require('./routes/jam');
var gridRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jam', jamRouter);
app.use('/gridbuild', gridRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

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

async function recreateDB() {
  // Delete everything
  await jams.deleteMany();
  let instance1 = new
    jams({"Price": 2, 
    "Size": 36, 
    "Flavor": "Strawberry" 
  });  
  let instance2 = new
    jams({"Price": 4, 
    "Size": 48, 
    "Flavor": "Grape"
  });
  let instance3 = new
    jams({"Price": 1, 
    "Size": 12, 
    "Flavor": "Apple" 
  });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First Jam saved")
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second Jam saved")
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third Jam saved")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
