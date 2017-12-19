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

    
    //时间轴
    var openNum = $(".time-line").attr('data');
    $(".time-line span").slice(0, openNum).each(function(i) {
        $(this).addClass('start');
        $(this).click(function() {
            if (i < openNum) {
                var index = $(".time-line span").index(this);
                $(".brand").eq(index).addClass('cur').siblings('.brand').removeClass('cur');
                $(this).addClass('cur').siblings('span').removeClass('cur');
            }
        });
    });

    //图片横向滚动
    require('./scroll');
    var tm;
    $(".img-scroll").CscScroll({
        Left: 476,
        Right: 238,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });
});