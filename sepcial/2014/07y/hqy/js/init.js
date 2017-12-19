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
    var isLogin = require('http://api.csc86.com/api/member/islogin?callback=define');
    if (isLogin.status) {
        $('body').find(".submit-btn").html('<input type="submit" value="确认提交" class="submit" />');
    } else {
        $('body').find(".submit-btn").html('<a href="http://member.csc86.com/login/phone" class="submit">请登录后在填写</a>');
    }
    //表单提交
    $(".myform").submit(function(e) {
        e.preventDefault();
        submitOK = true;
        if ($("#companyname").val() == "") {
            alert("公司名称不能为空！");
            submitOK = false;
        }
        if ($("#contact").val() == "") {
            alert("联系人姓名不能为空！");
            submitOK = false;
        }
        if ($("#tel").val() == "") {
            alert("联系电话不能为空！");
            submitOK = false;
        }
        if (submitOK == false) {
            return false;
        }
        var Ojson = $(this).serialize();
        $.get('http://cncms.csc86.com/formguide/index.php?' + Ojson, function(data) {
            if (data.status == true) {
                alert('提交成功！');
            } else {
                alert('提交失败！');
            }
        }, 'jsonp');
        $(this).get(0).reset();
        $(".closed").trigger("click");
        return false;
    });
    //弹出表单
    $(".nav").on('click', '.join-btn', function() {
        var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
        if (isLogin.status == true) {
            var W = $(window).width();
            var LF = W / 2 - $('.pop-up').outerWidth() / 2;
            var TP = $(window).height() / 2 - $('.join').outerHeight() / 2;
            var H = $("body").height();
            $('.shade').css({
                width: W + "px",
                height: H + "px"
            }).show();
            $('.pop-up').css({
                left: LF + "px",
                top: TP + "px"
            }).show();
        } else {
            alert("页面会跳转登录页，登录后会返回当前页！")
            window.location = "http://member.csc86.com/login/phone/"
        }

    });
    //关闭弹窗
    $(".closed").click(function() {
        $('.shade').hide();
        $('.pop-up').hide();
    });


    //图片横向滚动
    require('./scroll');
    var tm;
    $(".side-column").CscScroll({
        Left: 420,
        Right: 210,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });
    var tms;
    $(".img-scroll").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tms,
        Auto: true,
        Visual: 4
    });
    var itms;
    $("#j-Scroll-A").CscScroll({
        Left: 500,
        Right: 250,
        Time: 2000,
        linedUp: itms,
        Auto: false,
        Visual: 4
    });
    var tims;
    $("#j-Scroll-B").CscScroll({
        Left: 500,
        Right: 250,
        Time: 2000,
        linedUp: tims,
        Auto: false,
        Visual: 4
    });

    //加入圈子
    $(".join-qz").delegate('span', 'click', function() {
        var me = $(this);
        $.get('http://quan.csc86.com/doCircle?t=authC&circleId=' + me.attr('data-id'), function(data) {
            var $val = data.code;
            if ($val == "NO_POWER") { //无权加入
                alert("你的身份不满足加入该圈子！")
            } else if ($val == "join_000") { //已加入
                alert("已加入");
            } else if ($val == "join_001") { //己审请
                alert("您已经申请加入该圈子，请等待审核");
            } else if ($val == "LOGIN_FAIL") { //未登陆
                login();
            } else if ("no_auth" == $val) {
                alert("您当前没有加入该圈子的身份或当前圈子不存在！");
            } else {
                $(".qz-form").html($val)
                var LF = $(window).width() / 2 - $(".dialog").width() / 2;
                var TP = $(window).height() / 2 - $(".dialog").height() / 2 + $(window).scrollTop();
                $(".dialog")
                    .removeClass('g-dn')
                    .css({
                        left: LF + "px",
                        top: TP + "px"
                    });
            }
        }, 'jsonp');
    });
    $('#join-qz').click(function() {
        $.get("http://quan.csc86.com/doCircle?t=addC&circleId=" +
            $(".social-intro").find('span').attr('data-id') +
            "&" +
            $("#addCircleForm").serialize(), function(data) {
                var val = data.code;
                if ("join_001" == val) {
                    alert("申请加入成功！");
                    $(".dialog").addClass('g-dn');
                } else if ("join_000" == val) {
                    alert("您已成功加入！");
                    $(".dialog").addClass('g-dn');
                } else if ("sns_fail_id" == val) {
                    alert("ID无效！");
                } else {
                    alert("申请加入失败！,请重试");
                }
            }, 'jsonp')
    });
    //浮动
    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    var fixed_num = 600;
    $(window).scroll(function() {
        setTimeout(function() {
            var sT = $(window).scrollTop();
            if (ie6) {
                if (sT > fixed_num) {
                    $("#fixed").animate({
                        top: (sT - fixed_num + 330) + "px"
                    });
                } else {
                    $("#fixed").removeAttr('style');
                }
            } else {
                if (sT >= fixed_num) {
                    $("#fixed").css({
                        position: "fixed",
                        top: 0
                    });
                } else if (sT <= fixed_num) {
                    $("#fixed").removeAttr('style');
                }
            }
        }, 400)
    });
     $("#fixed li:last").click(function(){
        $(window).scrollTop(0);
     })
    $(".catalog").find('li').click(function() {
        $(this).addClass("cur").siblings().removeClass('cur')
    });

    //滚动条
    require('./scroll-bar');
    $(".scroll-content").ScrollBar();
    $(".tab-nav span").mouseover(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        var i=$(".tab-nav span").index(this);
       $(".J-tab-content li").show().slice(0,(0+3*i)).hide()
    }).eq(0).trigger('mouseover')
});