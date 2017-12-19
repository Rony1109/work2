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
        $(".submit-btn").html('<input type="submit" value="确认提交" class="submit" />');
    } else {
        $(".submit-btn").html('<a href="http://member.csc86.com/login/phone" class="submit">请登录后在填写</a>');
    }
    require('./form')
    $("#myform").submit(function(e) {
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
        e.preventDefault();
        var Ojson = $(this).serializeJson();
        $.get('http://cncms.csc86.com/formguide/index.php', Ojson, function(data) {
            if (data.status == true) {
                alert('提交成功！');
            } else {
                alert('提交失败！')
            }
        }, 'jsonp');
        $(this).get(0).reset();
    });

    //时间点判断
    $(".review-intro").each(function() {
        var time = $(this).find('span').text().split('-')[1],
            MyDate = new Date(),
            Ary = time.split(".");
        MyDate.setFullYear(Ary[0], Ary[1] - 1, Ary[2]);
        var Today = new Date();
        if (Today > MyDate) {
            $(this).find('a.btn-round').attr('href', 'javascript:;').addClass('isOver').text('活动已结束')
        }
    });
    //分页
    require('./page');
    $(".review").Page();

    //图片横向滚动
    require('./scroll');
    var tm;
    $(".side-column").CscScroll({
        Left: 420,
        Right: 210,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 1
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
    var fixed_num = 1300;
    $(window).scroll(function() {
        setTimeout(function() {
            var sT = $(window).scrollTop();
            if (ie6) {
                if (sT > fixed_num) {
                    $(".side-nav-box").animate({
                        top: (sT - fixed_num+330) + "px"
                    });
                } else {
                    $(".side-nav-box").removeAttr('style');
                }
            } else {
                if (sT >= fixed_num) {
                    $(".side-nav-box").css({
                        position: "fixed",
                        top: 0
                    });
                } else if (sT <= fixed_num) {
                    $(".side-nav-box").removeAttr('style');
                }
            }
        }, 400)
    });
    $(".catalog").find('li').click(function() {
        $(this).addClass("cur").siblings().removeClass('cur')
    })
});