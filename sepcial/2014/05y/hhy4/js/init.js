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

    /*商品列表*/
	$(".pro_lst li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	
	/*右侧导航*/
	(function(){
		var _fixed=$(".fixed");
		var _topFlr1=$("#topic_flr1").offset().top;
		$(window).scroll(function(){
			var _top = $(this).scrollTop();
			if(_top<=_topFlr1){
				_fixed.removeClass("fixed_scr");
			}else{
				_fixed.addClass("fixed_scr");
			}
		});	
	})();

});
