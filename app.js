var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var SerialPort = require("serialport").SerialPort;
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();


global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");


app.use(session({ 
	secret: 'secret',
	cookie:{ 
		maxAge: 1000*60*30
	}
}));


app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){ 
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = "";
	if(err){ 
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
	}
	next();
});


app.use('/', routes);
app.use('/login',routes); 
app.use('/register',routes); 
app.use('/home',routes);
app.use("/logout",routes);
app.use("/lock",routes);
app.use("/unlock",routes);
app.use('/users', users);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;