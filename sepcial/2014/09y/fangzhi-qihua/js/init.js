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

$("#slide").delegate("li","click",function(){
	$("#slideimg").find("img").attr("src",$(this).find("img").attr("src"));
})
    require('./scroll');

 function tab(hid, bid, howdo, fun, css){
	//console.log(bid.length);
	var $hd = $(hid), $bd = $(bid), fun = fun || function() {
	}, css = css || "cur", arCss = function(id) {
		id.addClass(css).siblings("." + css).removeClass(css);
	};
	$hd.each(function(){
		$(this).attr('data-index',$(this).index());
	});
	
	$(document).delegate(hid,howdo || "click", function() {
		arCss($(this));
		if (bid)
			arCss($bd.eq($(this).data('index')));
		fun($(this));
		if (howdo = "click")
			return false;
	});
	return this;
}

tab('.left-scr-box li','.dleft-in-slide div',null,null,'active');
tab('.scr-box li','.l-con div',null,null,'active');


    $(".img-scroll").CscScroll({
        Left: 416,
        Right: 208,
        Time: 2000,
        Auto: true,
        Visual: 3
    });
	$(".left-scroll").CscScroll({
        Left: 213,
        Right: 107,
        Time: 2000,
        Auto: true,
        Visual: 3
    });
	 $(".scroll-btm").CscScroll({
        Left: 304,
        Right: 153,
        Time: 2000,
        Auto: true,
        Visual: 4
    });



      //评论
    seajs.use('http://res.csc86.com/v2/m/comment/js/init', function(comment) {
        comment.init('2768616c-a280-4de2-a091-8ca67d82ed81', $('#JComment'),{pn:2});
    });
	


  
});

