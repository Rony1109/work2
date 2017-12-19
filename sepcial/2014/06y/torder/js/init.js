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
    //弹窗
    $(".banner ").delegate('span', 'click', function() {
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
    $('span.closed').click(function() {
        $(".shade").hide();
        $(".myform").hide();
    });
    //表单验证
    $(".J-form").submit(function(e) {
        e.preventDefault();
        var $me = $(this)
        var submitOK = "true"
        if ($(this).find(".lxren").val() == "") {
            alert("联系人姓名不能为空！");
            submitOK = "false";
        }
        if ($(this).find(".qq").val() == "") {
            alert("qq不能为空！");
            submitOK = "false";
        }
        if ($(this).find(".tel").val() == "") {
            alert("电话不能为空！");
            submitOK = "false"
        }
        if ($(this).find(".lxfs").val() == "") {
            alert("加入身份不能为空！");
            submitOK = "false";
        }
        if (submitOK == "false") {
            return false;
        }
        e.preventDefault();
        $.get('http://cncms.csc86.com/formguide/index.php?' + $me.serialize(), function(data) {
            if (data.status == true) {
                alert('提交成功！')
            } else {
                alert('提交失败！')
            }
        }, 'jsonp');
        $(this).get(0).reset();
        if (!!$(".myform span")) {
            $(".myform span").trigger('click');
        }
    });

});