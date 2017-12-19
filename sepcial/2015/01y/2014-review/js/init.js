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
	//require('./jQueryRotate.js');

    /*
     * 以下为专题js代码
     * ......
     */	

		/*var angle = 0;
		setInterval(function(){
			  angle+=3;
			 $(".diamondleft").rotate(angle);
		},50);
		
		var angle = 0;
		setInterval(function(){
			  angle+=3;	
			 $(".diamondright").rotate(angle);
		},50);*/
	
	 $("ul.l_tab").delegate('li', 'click', function(event) {
        var
            index = $("ul.l_tab li").index(this);
        //$("ul.l_tab li").eq(index).addClass("select").siblings().removeClass("select");
        //$(".lt").eq(index).show().parent(index).siblings().children(".lt").hide();
        $(".l_info").eq(index).show().siblings(".l_info").hide();
    });

	require('./scroll');
        var tm;
        $(".img-scroll").CscScroll({
            Left: 1830,
            Right: 915,
            Time: 5000,
            linedUp: tm,
            Auto: true,
            Visual: 5
        });  
});

