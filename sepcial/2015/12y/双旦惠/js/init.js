/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');

//侧面导航回顶操作
   $(window).scroll(function(){
	   var topscr=$(this).scrollTop();
	   //alert(topscr);
	   if(topscr < 710){
		   $('.fixed').addClass('g-dn');
		   }else{
			$('.fixed').removeClass('g-dn');   
			   }   
	   }); 
	   
});
