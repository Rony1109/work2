/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */


    //点赞
    function _get(o, id) {
        $.get(csc.url("quan", "/likeB.html?topicId=" + id), function(data) {
            if ("sns_likeTopic_000" == data.code) {
               getNum(id);
            } else if ("login_fail" == data.code) {
                seajs.use(csc.url("res", "/f=js/m/sign"), function() {
                    csc.checkSign("location.reload()");
                    getNum(o,id);
                });
            } else if ("sns_likeTopic_001" == data.code) {
                csc.useDialog(function() {
                    csc.alert("赞过了！");
                    getNum(o,id);
                });
            } else {
                csc.useDialog(function() {
                    csc.alert(data.desc);
                    getNum(o,id);
                });
            }
        }, "jsonp");
    }

    function getNum(o,id) {
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
            "topicId": id
        }, function(data) {
            o.find('span').show().html(data.code);
        }, "jsonp");
    }
    $(".l").each(function() {
        var o = $(this),
            id = o.attr("data-topicid") || "000";
        o.on("click", function() {
            $(this).find('img').hide();
            if (window.csc) {
                _get(o, id);
            } else {
                seajs.use('http://res.csc86.com/js/', function() {
                    _get(o, id);
                })
            }
            return false;
        })
    });

    //收藏
    var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
    if (isLogin.status != true) {
        //location.href = "http://member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
        $(".c").on('click', function() {
            var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
            location.href = "http://member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
            return false;
        });
        return false;
        $('a.c').hide();
        $('span.c').show();
    } else {
        $(".c").off('click');
        $('a.c').show();
        $('span.c').hide();
    }

});