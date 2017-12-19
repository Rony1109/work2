/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'jquery':'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    require('jquery');
    /*
     * 以下为专题js代码
     * ......
     */
     $(function(){
        var nav = $("#nav");
        $(window).scroll(function(){
            var topscr = $(this).scrollTop();
            topscr>=740?nav.fadeIn():nav.fadeOut();
        });
     });
});
