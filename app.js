var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var manageCar=require('./routes/manageCar');
var rentCar=require('./routes/rentCar');
var repair=require('./routes/repair');
var returnCar=require('./routes/returnCar');
var app = express();

//设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache',false);

//设置项目的上传图片路径
app.set('carPhoto',__dirname+'public/images');
//设置静态资源目录
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/car',manageCar);
app.use('/rent',rentCar);
app.use('/repair',repair);
app.use('/return',rentCar);


//404处理页面
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理

// 开发版本处理页面
//错误栈打印
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 产品版错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
