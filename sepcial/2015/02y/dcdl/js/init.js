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
	require('./focusPlay');
	var dialog = require('m/dialog/js/init');
    /*
     * 以下为专题js代码
     * ......
     */
	$(".n").click(function(){
			$(this).addClass("scur").siblings("li").removeClass("scur");
		})

	 csc.foucsPlay("#src-img",null,2008);
			var $li = $("#src-img ol>li");
			$("#adv-upload").find("li").on("mouseover",function (){
				$li.eq($(this).index()).trigger("mouseover");
			}).on("mouseout",function (){
				$li.eq($(this).index()).trigger("mouseout");
			});

	 $("ul.l_tab").delegate('li', 'click', function(event) {
				var
					index = $("ul.l_tab li").index(this);
				$(".l_info").eq(index).show().siblings(".l_info").hide();
			});
		
	 require('./scroll');
        var tm;
        $(".img-scroll").CscScroll({
            Left: 624,
            Right: 292,
            Time: 5000,
            linedUp: tm,
            Auto: true,
            Visual: 3
        });  

		
    //弹出
    $(function(){
		 $(".ns").click(function(){
			art.dialog({
			title:false,
			lock:true,
			content:$('.pup')[0]
			});
		 });
		});
});
