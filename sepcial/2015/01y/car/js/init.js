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

	 $("ul.l_tab").delegate('li', 'click', function(event) {
        var
            index = $("ul.l_tab li").index(this);
        $("ul.l_tab li").eq(index).addClass("select").siblings().removeClass("select");
		//$(".lt").eq(index).show().parent(index).siblings().children(".lt").hide();
        $(".l_info").eq(index).show().siblings(".l_info").hide();
    });
	
	
	require('./scroll');
	    var tm;
	    $(".img-scroll").CscScroll({
	        Left: 1860,
	        Right: 930,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
	    $(".img-scrollt").CscScroll({
	        Left: 1900,
	        Right: 950,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollbtm").CscScroll({
	        Left: 370,
	        Right: 185,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon2").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon3").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon4").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon5").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon6").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon7").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon8").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
		$(".img-scrollcon9").CscScroll({
	        Left: 1406,
	        Right: 703,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });
});
