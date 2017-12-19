/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'scroll':'c/fur/js/scroll.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
     // 图片滚动
     require('scroll');
    var tm;
    $("#imgscroll").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 3
    });

    /*
     * 以下为专题js代码
     * ......
     */

});
