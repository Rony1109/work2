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

	/*右侧导航*/
	(function(){
		var _fixed=$(".fixed");
		$(window).scroll(function(){
			var _top = $(this).scrollTop();
			_top>=500?_fixed.fadeIn():_fixed.hide();
		});
	})();
	
	var timefo;
	$(".sig-all .hov i").mouseover(function(){
		$(".sig-all .hov").removeClass("cur");
		$(this).parent().addClass("cur");
			timefo=setInterval(function(){
				if(!$(".sig-all .cur i").is(":animated")){
					$(".sig-all .cur i").animate({top: '5px'}, "80").animate({top: '30px'}, "80");	
				}					
			},180);
	}).mouseout(function(){
		clearInterval(timefo);
	}).trigger("mouseleave");
	
	$(".pdts-t").hover(function(){
			$(this).css("top","-5px");					
	},function(){
			$(this).css("top","0px");								
	});
	
});
