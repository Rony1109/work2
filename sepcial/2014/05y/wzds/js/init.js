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
	 
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	 $(".arpall ul li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});
	$(".tab span").hover(function(){
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
		$(this).parent().siblings("ul").children("li").removeClass("cur");
		$(this).parent().siblings("ul").children("li:eq("+$(this).index()+")").addClass("cur");			  
	});

});
