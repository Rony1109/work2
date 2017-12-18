var express = require('express'),
    router = express.Router();
var mysql = require('mysql');
var async = require('async');

var TEST_DATABASE = 'nodesample';
var TEST_TABLE = 'userinfo';

var reresults={};

//创建连接
var client = mysql.createConnection({
  user     : 'root',
  password : 'rmh123111',
});

client.connect();
client.query("use " + TEST_DATABASE);

var ress={};

async.auto({
    getData1: function (callback,reresults) {
        client.query('SELECT * FROM ?? where Id>?',[TEST_TABLE,1],function(err, results, fields) {
                if (err) {
                    callback(err);
                }

                if(results)
                {
                    var result='';
                    for(var i = 0; i < results.length; i++)
                    {
                        console.log("%d\t%s\t%s", results[i].Id, results[i].UserName, results[i].UserPass);
                        result+=results[i].Id+","+results[i].UserName+","+results[i].UserPass+"|"
                    }
                    ress['key1']=result;
                    callback(null,result);
                }
            }
        );
    },
    getData2: function (callback,reresults) {
        client.query('SELECT * FROM ?? where Id>?',[TEST_TABLE,10],function(err, results, fields) {
                if (err) {
                    callback(err);
                }

                if(results)
                {
                    var result='';
                    for(var i = 0; i < results.length; i++)
                    {
                        console.log("%d\t%s\t%s", results[i].Id, results[i].UserName, results[i].UserPass);
                        result+=results[i].Id+","+results[i].UserName+","+results[i].UserPass+"|"
                    }
                    ress['key2']=result;
                    callback(null,result);
                }
            }
        );
    },
    getData3: ['getData1','getData2', function(callback,reresults) {
            client.query('SELECT * FROM ?? where Id>?',[TEST_TABLE,10],function(err, results, fields) {
                    if (err) {
                        callback(err);
                    }

                    if(results)
                    {
                        var result='';
                        for(var i = 0; i < results.length; i++)
                        {
                            console.log("%d\t%s\t%s", results[i].Id, results[i].UserName, results[i].UserPass);
                            result+=results[i].Id+","+results[i].UserName+","+results[i].UserPass+"|"
                        }
                        ress['key3']=result;
                        //callback(null,result);
                    }

                }
            );
    }]
}, function(err,reresults) {
    if(err) {
        throw err;
        console.log(err);
    } else {
       // console.log("SQL全部执行成功");
       // console.log(reresults);
        client.end();
    }
});

router.get('/', function(req, res) {
  res.jsonp({ user: ress });
});

module.exports = router;