var express = require('express');
var app = express();

var logger = require('./logger.js').logger;
var logger2 = require('./logger.js');

logger2.use(app);
app.get('/', function (req, res) {
    res.send('Hello World!');
    logger.info("this is log");
});

var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});