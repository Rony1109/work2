seajs.config({

      // 别名配置
    alias: {
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
    //获取评论
    $q = $('#fixed');
    var fixed_num = 640;
    $(window).on('scroll', function() {
        var sT = $(this).scrollTop();
        var ua = navigator.userAgent.toLowerCase();
        var check = function(r) {
            return r.test(ua);
        }

        var isOpera = check(/opera/);
        var isIE = !isOpera && check(/msie/);
        var isIE6 = isIE && check(/msie 6/);
        if (isIE6) {
            if (sT > fixed_num) {
                $q.stop(true).animate({
                    top: $(window).scrollTop()
                }, 200);

            } else if (sT < fixed_num) {
                $q.css({
                    top: fixed_num
                });
            }
            return;
        }
        if (sT > fixed_num && $q.is(':not([style])')) {
            $q.css({
                position: 'fixed',
                top: 0
            });
        } else if (sT < fixed_num && $q.is('[style]')) {
            $q.removeAttr('style');
        }
    });


        //获取评论
    //获取评论
    var comment = require('./comments');
    comment.get('.comment-result ul','0ed0bf8e-b933-4ed1-8488-0b0f3bdbf470');
    setInterval(function(){
        comment.get('.comment-result ul', '0ed0bf8e-b933-4ed1-8488-0b0f3bdbf470');
    }, 180000);
    comment.send('#saytext', '.comment input.sub_btn','0ed0bf8e-b933-4ed1-8488-0b0f3bdbf470');
    //QQ表情
    
    require('http://res.csc86.com/js/m/config.js');
    require('./jquery.qqFace');
    require('http://res.csc86.com/js/m/emoticons.js');
    $('.emotion').qqFace({
        id : 'facebox', //表情盒子的ID
        assign:'saytext', //给那个控件赋值
        path:'http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/' //表情存放的路径
    });
    
    
    require('./jquery.limitTextarea');
    $('#saytext').one('focus',function(){
        $.get(csc.url("api","/member/isLogin.html"),function (data){
            if(!data.status){
                alert("请登陆或注册会员后发表评论");
                location.href = 'http://member.csc86.com/login/phone/?done=' + encodeURIComponent(location.origin + location.pathname) + '#ji';
            }
        },"jsonp");
    }).limitTextarea({
        onOk: function(){
            $('.comment').find('input.sub_btn').removeClass('sub_btn_hover').attr('disabled',false);
        },
        onOver: function(){
            $('.comment').find('input.sub_btn').addClass('sub_btn_hover').attr('disabled',true);
        }
    });
    
    
    if($(".repl-hf ul .hl-l span").length>0){
        $.get("http://quan.csc86.com/circle/api/info?id=0ed0bf8e-b933-4ed1-8488-0b0f3bdbf470",function(data){;
            $(".repl-hf ul .hl-l span:eq(0) i:eq(0)").html(data.data.memberSum);
            $(".repl-hf ul .hl-l span:eq(1) i:eq(0)").html(data.data.topicCount);
        },"jsonp");
    }


});