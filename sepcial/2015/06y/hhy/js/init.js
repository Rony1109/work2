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
        'placeholder': 'm/sea-modules/placeholder.js',
		'cscSwitch':'c/shop/js/cscSwitch.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    //其他专题左右轮播
	require.async('cscSwitch',function(){
		$(".scroll-bd").cscSwitch(".scroll-bd > ul > li",{
			effect:'scroll',//移动方式，此处为scroll滚动移动
			steps:1,//每次移动4个
			visible:4,//默认可见4个	
			nextBtn:'#next',//向后按钮
			prevBtn:'#prev'//向前按钮
		}).carousel().autoplay(3);
	});
	
	//右侧导航
	(function(){
		var _fixed=$(".aside");
		$(window).scroll(function(){
			var _top = $(this).scrollTop();
			_top>=500?_fixed.fadeIn():_fixed.hide();
		});
	})();
});
