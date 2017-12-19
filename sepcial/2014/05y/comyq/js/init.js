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
	require('http://res.csc86.com/js/l/jquery.js');
    require('top');
    require('header');
    require('placeholder');
    /*
     * 以下为专题js代码
     * ......
     */
	 $("#side_l").height($("#r_height").height());
	 //var con_nav = $("#side_nav").position().top;
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	
		if(topscr>2060){
			$("#side_nav").addClass("side_nav");	
		}else{
			$("#side_nav").removeClass("side_nav");	
		}
	});	
});
