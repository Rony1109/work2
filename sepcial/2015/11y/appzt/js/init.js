/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'zepto': 'l/zepto/1.1.6/zepto.min'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('zepto');	
	$(".Jnav li").each(function(index){
		$(this).on("touchstart",function(){
			$(this).siblings("li").removeClass("current");
			$(this).addClass("current");
			$(".Jprod").eq(index).siblings(".Jprod").css("display","none");
			$(".Jprod").eq(index).css("display","table");	
		})
		if($(this).hasClass("current")){
			$(".Jprod").eq(index).siblings(".Jprod").css("display","none");
			$(".Jprod").eq(index).css("display","table");			
		}
		
	});
	
});

