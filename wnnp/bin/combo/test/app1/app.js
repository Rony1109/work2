var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();

//这里传入了一个密钥加session id
app.use(cookieParser('wilson'));


//使用靠就这个中间件
app.use(session({
   store: new RedisStore({
     host: "127.0.0.1",
     port: "6379",
     ttl: 60 * 60 * 24 * 30,   //Session的有效期为30天
   }),
  secret: 'wilson',
  name: 'appsession',
/*  cookie: {maxAge: 80000 },
  resave: false,
  saveUninitialized: true,*/
}));
//app.use(session({ secret: 'wilson'}));


app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

app.get("/tj", function(req, res) {
  req.session.usernames = req.session.usernames?req.session.usernames+1:1;
  res.send('hello, session id:' + req.session.id + ' count:' + req.session.usernames);
});

app.get('/redisses',function(req,res){
  req.session.user = 'lizhengfu';
  res.send(req.session.user);
})

app.get('/checkses',function(req,res){
  res.send(req.session.usernames);
})

var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var api = require('./routes/api');
var img = require('./routes/images');
var qrimg = require('./routes/qrImage');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/users', users);
app.use('/', routes);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api', api);
app.use('/img', img);
app.use('/qrimg', qrimg);

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
  /*  res.render('error', {
      message: err.message,
      error: err
    });*/
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


module.exports = app;
