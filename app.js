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

//chenney

// var serialPort = new SerialPort("/dev/cu.usbserial", { 
//  baudrate: 9600 
// }, false); // this is the openImmediately flag [default is true]


global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");

// var app = express();

app.use(session({ 
	secret: 'secret',
	cookie:{ 
		maxAge: 1000*60*30
	}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
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


app.use('/', routes);  // 即为为路径 / 设置路由

app.use('/users', users); // 即为为路径 /users 设置路由

app.use('/login',routes); // 即为为路径 /login 设置路由
app.use('/register',routes); // 即为为路径 /register 设置路由
app.use('/home',routes); // 即为为路径 /home 设置路由
app.use("/logout",routes); // 即为为路径 /logout 设置路由



app.use("/lock",routes); // 即为为路径 /lock 设置路由
app.use("/unlock",routes); // 即为为路径 /unlock 设置路由


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





//chenney
//串口读


// // 打印所有串口
// var serialport = require("serialport");

//   serialport.list(function (err, ports) {
//      ports.forEach(function(port) {
//         console.log('打印所有串口'+port.comName);
//         console.log(port.pnpId);
//         console.log(port.manufacturer);
//       });
//   });









// serialPort.open(function (error) {
//   if ( error ) {
//     console.log('failed to open: '+error);
//   } else {
//     console.log('Serialport is Opened');


//     serialPort.on('data', function(data) {
//       var buff = new Buffer(data,'utf8');
//       console.log('data received: ' + buff.toString('hex'));
//     });


//       var guanmen = new Buffer('2657534E434E411B00000000000000000000000000010000454E44','hex')
//       var kaimen = new Buffer('2657534E434E411B00000000000000000000000000000100454E44','hex')



//  serialPort.write(guanmen, function(err, results) {
//       if(err){
//         console.log('write err ' + err);
//       }else{
//         console.log('write results ' + results);
//       }
//     }); 

//   }
// });






// // serialport

// var SerialPort = require("serialport").SerialPort
// var serialPort = new SerialPort("/dev/cu.usbserial", {
//   baudrate: 9600
// }); // this is the openImmediately flag [default is true] 
 


// serialPort.open(function (error) {
//   if ( error ) {
//     console.log('failed to open: '+error);
//   } else {
//     console.log('串口open');
//     serialPort.on('data', function(data) {
//       // console.log('data received: ' + data);
//       var datachen = new Buffer(data,'utf8');
//       console.log('data received: ' + datachen.toString('hex'));
//     });
//   }
// });









module.exports = app;
