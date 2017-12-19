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
    //图片横向滚动
    require('./scroll');
    var tm;
    $("#img-scroll").CscScroll({
        Left: 938,
        Right: 469,
        Time: 2000,
        linedUp: tm,
        Auto: false,
        Visual: 2
    });
    //IE hover
    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    if (ie6) {
        $(".J-span").children('span').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
    }
    //图片墙
    require('./img-scroll');
    var tms;
    $("#J-wall").PicWall({
        Time: tms, //列队名
        Auto: true, //自动
        Inerval: 3000, //时间间隔
        MaxWidth: 540, //最大图宽度
        MaxHeight: 200, //最大图高度
        MinWidth: 362, //最小图宽度
        MinHeight: 120, //最小图高度
        Zoom: {
            x: 89,
            y: 40
        } //相对缩放
    });
    //banner
    var slide = require('m/jsM/slide.js');
    new slide(".J-slide ul", ".J-slide ul>li", {
        slideWidth: 1000,
        slideHeight: 320,
        slideDirection: 0,
        slides_xssm: 1,
        slideSeries: 1,
        zantin: true,
        slides_auto_span: 6000,
        slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
        slideButs_html: function(i) {
            return "<li>" + i + "</li>";
        }, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
        slideButs_bindsj: "mouseover",
        slideButs_selectclass: "cur",
        slides_controller: '.J-slide>ol',
        slides_fun: slide.definedfun
    });
    //判断登录
    $.ajax({
        url: 'http://api.csc86.com/notify/count/all/',
        dataType: 'jsonp',
        type: 'get',
        success: function(dataMsg) {
            if (dataMsg.status) {

                $(".nav p").html('<span>我我要报名</span>');
            }
            else{
                $(".mytable").find('input').unbind('click').bind('click keyup',function(){
                    $(this).val('');
                    alert("请登录后在填写相关信息！");
                    location.href='http://member.csc86.com/login/phone/'
                })
            }
        }
    });
    //弹窗
    $(".nav").delegate('span', 'click', function() {
        var HT = $(window).height() / 2 - $(".myform").height() / 2 + $(window).scrollTop(),
            WH = $(window).width() / 2 - $(".myform").width() / 2,
            WinWidth = $(window).width(),
            WinHeight = $("body").height();
        $(".shade").css({
            width: WinWidth + "px",
            height: WinHeight + "px"
        }).show();
        $(".myform").css({
            left: WH + "px",
            top: HT + "px"
        }).show();
    });
    //关闭弹窗
    $(".myform").delegate('span', 'click', function() {
        $(".shade").hide();
        $(".myform").hide();
    });
    //表单验证
    require('./form');
    $(".J-form").submit(function(e) {
        submitOK = "true"
            if ($(this).find(".gspy").val() == "") {
                alert("公司名称不能为空！");
                submitOK = "false";
            }
            if ($(this).find(".zycp").val() == "") {
                alert("主营产品不能为空！");
                submitOK = "false";
            }
            if ($(this).find(".contact").val() == "") {
                alert("联系人姓名不能为空！");
                submitOK = "false"
            }
            if ($(this).find(".lxfs").val() == "") {
                alert("联系方式不能为空！");
                submitOK = "false";
            }
            if ($(this).find(".wpdz").val() == "") {
                alert("旺铺地址不能为空！");
                submitOK = "false";
            }
            if ($(this).find(".lxdz").val() == "") {
                alert("联系地址不能为空！");
                submitOK = "false"
            }
            if (submitOK == "false") {
                return false;
            }
        e.preventDefault();
        var Ojson = $(this).serializeJson();
            $.get('http://cncms.csc86.com/formguide/index.php', Ojson, function(data) {
                if(data.status==true){
                    alert('提交成功！')
                }else{
                    alert('提交失败！')
                }
            }, 'jsonp');
        $(this).get(0).reset();
        if(!!$(".myform span")){
          $(".myform span").trigger('click');  
        }
    });

    //时间点判断
    $(".msg").each(function() {
        var time = $(this).find('span').text().split('-')[1],
            MyDate = new Date(),
            Ary = time.split(".");
        MyDate.setFullYear(Ary[0], Ary[1] - 1, Ary[2]);
        var Today = new Date();
        if (Today > MyDate) {
            $(this).find('a.btn').attr('href', 'javascript:;').addClass('isOver').text('活动已结束')
        }
    });
    //分页
    require('./page')
    $(".box").Page({})

});