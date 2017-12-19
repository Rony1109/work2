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
    $("#a11, #a12, #a21, #a22, #a31, #a32, #a41, #a42").hover(function() {
        $(this).next().show();
    }, function() {
        $(this).next().hide();
    });

    $(".list-c").children('li').hover(function() {
        $(this).find(".list-c-hover").show();
    }, function() {
        $(this).find(".list-c-hover").hide();
    });

    $(window).scroll(function() {
        var topscr = $(this).scrollTop();
        //alert(topscr);
        if (topscr < 600) {
            $(".fiexd").addClass("fiexd_nav");
        } else {
            $(".fiexd").removeClass("fiexd_nav");
        }
    });
});
