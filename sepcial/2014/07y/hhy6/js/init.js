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
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		var flr1_top=$('.flr1').offset().top;
		if(topscr>=flr1_top-10){
			$(".fixed").addClass('fixed-scroll');
		}else{
			$(".fixed").removeClass('fixed-scroll');	
		}
	});	

});
