var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            "type": "dateFile",
            "filename": "./logs/url/log",
            "pattern": "_yyyy-MM-dd hh.log",
            "alwaysIncludePattern": true,
            "maxLogSize": 20480,
            "backups": 10,
            "category": "urlFileLog"
        },
        {
            "type": "dateFile",
            "filename": './logs/debug/log',
            "pattern": "_yyyy-MM-dd hh.log",
            "alwaysIncludePattern": true,
            "maxLogSize": 20480,
            "backups": 10,
            "category": 'debugFileLog'
        }
    ],
    replaceConsole: true,   //替换console.log
    levels: {
        dateFileLog: 'DEBUG'
    }
});


var debugFileLog = log4js.getLogger('debugFileLog');
var urlFileLog = log4js.getLogger('urlFileLog');
exports.logger = debugFileLog;

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(urlFileLog, {level:'debug', format:':method :url'}));
}