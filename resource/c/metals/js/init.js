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
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    var flag = true;
    $(".box-ft em").bind('click mouseenter mouseleave', function(e) {
        if (e.type == "mouseenter") {
            $(this).addClass("cur");
        } else if (e.type == "mouseleave") {
            $(this).removeClass("cur");
        } else if (e.type == "click") {
            if (flag === true) {
                $(".box-bd").css("height", "auto");
                flag = false;
                $(this).addClass("at-cur");
            } else {
                $(".box-bd").css("height", "18px");
                flag = true;
                 $(this).removeClass("at-cur");
            }
        }
    });

});