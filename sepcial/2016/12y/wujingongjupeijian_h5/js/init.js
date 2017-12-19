/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    $(".more").on("click",function(){
     $(".more_things").eq($(this).data("id")).css("display","block")

	})
});
