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
    var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
    if (isLogin.status == true) {
        $("#myform input").unbind('click');
    } else {
        $("#myform").bind('click', function() {
            alert("页面会跳转登录页，登录后会返回当前页！")
            window.location = "http://member.csc86.com/login/phone/"
        })

    }
    $("#myform").submit(function(e) {
        e.preventDefault();
        submitOK = "true"
        if ($(this).find("#company").val() == "") {
            alert("公司名称不能为空！");
            submitOK = "false";
        }
        if ($(this).find("#name").val() == "") {
            alert("联系人姓名不能为空！");
            submitOK = "false";
        }
        if ($(this).find("#Industry").val() == "") {
            alert("所属行业不能为空！");
            submitOK = "false";
        }
        if ($(this).find("#phone").val() == "") {
            alert("联系电话不能为空！");
            submitOK = "false";
        }
        if ($(this).find("#email").val() == "") {
            alert("邮箱地址不能为空！");
            submitOK = "false"
        }
        if (submitOK == "false") {
            return false;
        }
        var obj = $(this).serialize();
        $.get('http://cncms.csc86.com/formguide/index.php?' + obj, function(data) {
            if (data.status == true) {
                alert('提交成功！')
            } else {
                alert('提交失败！')
            }
        }, 'jsonp');
        $(this).get(0).reset();
    });
    //随机取数
    function getArrayItems(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {

                break;
            }
        }
        return return_array;
    }
    
    $(".column h2 a").click(function() {
        var oDom = $(this).parent().siblings(".list").children('li');
        oDom.hide();
        var len = $(this).parent().siblings(".list").children('li').length;
        var Ary = []
        for (var i = 0; i < len; i++) {
            Ary[i] = i
        }
        var AryNum = getArrayItems(Ary, 6);
        for (var j = 0; j < AryNum.length; j++) {
            oDom.eq(AryNum[j]).show();
        }
    });
    //图片横向滚动
    require('./scroll');
    var tm;
    $(".img-scroll").CscScroll({
        Left: 720,
        Right: 360,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });
});