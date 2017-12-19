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
    /*
     * 以下为专题js代码
     * ......
     */
    


    $(window).scroll(function(){
        console.log(123)
        var topscr = $(this).scrollTop();
        //alert(topscr);
        if(topscr<305){
            $(".fiexd").addClass("fiexd_nav");  
        }else{
            $(".fiexd").removeClass("fiexd_nav");   
        }
    });


    var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
    if (isLogin.status == true) {
        $("#myform input").unbind('click');
    } else {
        $("#myform").bind('click', function() {
            alert("页面会跳转登录页，登录后会返回当前页！")
            window.location = "http://member.csc86.com/login/phone/"
        })

    }
    //图片横向滚动
    require('./scroll');
    var tm;
    $(".scrollimg").CscScroll({
        Left: 458,
        Right: 229,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });

    $(".input-text").bind('focus blur', function(e) {
        if (e.type == "focus") {
            $(this).addClass("fc-444");
            if ($(this).val() == "其他 请输入您的观点……") {
                $(this).val('')

            }
        } else if (e.type == "blur") {
            if ($(this).val() == "") {
                $(this).val('其他 请输入您的观点……')
                $(this).removeClass("fc-444")
            }
        }
    });
    //http://quan.csc86.com/interface/submitReply
    $("#submint").submit(function(event) {
        event.preventDefault();
        var Data = $(this).serialize();
        $.get('http://quan.csc86.com/interface/submitReply?' + Data, function(data) {
            switch (data.code) {
                case 'login_fail':
                    alert("请登陆或注册会员后发表评论！");
                    location.href = 'http://login.csc86.com/';
                    break;
                case 'sns_newComment_000':
                    alert('评论成功！');
                    break;
                default:
                    if (data['code'].indexOf('sns_disable_word') == 0) {
                        alert('内容包含敏感词语！');
                        return;
                    }
                    alert('您的评论尚未提交成功！');
                    break;
            }
        }, 'jsonp')
    });
    //点赞
    function _get(o, id) {
        $.get('http://quan.csc86.com/likeB.html?topicId=' + id, function(data) {
            switch (data.code) {
                case 'sns_likeTopic_000':
                    o.text(data.desc);
                    $.get("http://quan.csc86.com/interface/hldlikeCount", {
                        "topicId": id
                    }, function(data) {
                        var mydata = o.find('.num');
                        mydata.text((200 + Number(data.code)) + "票");
                        var WH = o.find('div').find('span').width();
                        o.find('div').find('span').css('width', WH + (10 * data.code) + "px")
                    }, "jsonp");
                    break;
                case 'login_fail':
                    alert("请登陆或注册会员后发表评论！");
                    location.href = 'http://login.csc86.com/';
                    break;
                case 'sns_likeTopic_001':
                    alert('赞过了！');
                    break;
                default:
                    alert(data.desc)
                    break;
            }
        }, 'jsonp')
    };
    $(".zan").each(function() {
        var o = $(this),
            id = o.attr("data-id") || "000";
        var mydata = $(this).find(".num");
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
            "topicId": id
        }, function(data) {
            mydata.text((200 + Number(data.code)) + "票");
            var WH = o.find('div').find('span').width();
            o.find('div').find('span').css('width', WH + (10 * data.code) + "px")
        }, "jsonp");
        o.on("click", function() {
            _get(o, id);
            return false;
        })
    });
});