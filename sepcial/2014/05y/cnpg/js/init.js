/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');

    /*
     * 以下为专题js代码
     * ......
     */
    seajs.use('http://res.csc86.com/v2/m/comment/js/init', function(comment) {
        comment.init('108594bd-24b4-4ef4-8e80-ba35134a5d9a', $('#JComment'),{share:false});
    });
    $("#pic-items li").hover(function() {
        $(this).find("div.shade").show();
    }, function() {
        $(this).find("div.shade").hide();
    });
    require('./scroll');
    var tm;
    $(".img-scroll").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });

});