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

    //分享按钮的出发器
    $(".btn-1").hover(function() {
        $(".bds_more").trigger('mouseover');
    }, function() {
        $(".bds_more").trigger('mouseout');
    });
    //侧导航
    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    var fixed_num = 800;
    $(window).scroll(function() {
        setTimeout(function() {
            var sT = $(window).scrollTop();
            if (ie6) {
                if (sT > fixed_num) {
                    $("#fixed").animate({
                        top: sT + "px"
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
        }, 400);
    });
    $("#fixed li:last").click(function() {
        $(window).scrollTop(0);
        $("#fixed").removeAttr('style');
    });

    //表单提交
    $("#myform").submit(function(e) {
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
    });
    //弹出表单
    $(".nav").on('click', '.join-btn', function() {
        var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
        if (isLogin.status == true) {
            var W = $(window).width();
            var LF = W / 2 - $('.join').outerWidth() / 2;
            var TP = $(window).height() / 2 - $('.join').outerHeight() / 2;
            var H = $("body").height();
            $('.shade').css({
                width: W + "px",
                height: H + "px"
            }).show();
            $('.join').css({
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
        $('.join').hide();
    });

    //图片横向滚动
    require('./scroll');
    var tm;
    $(".img-scroll").CscScroll({
        Left: 480,
        Right: 240,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });
})