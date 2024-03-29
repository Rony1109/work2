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



$("#slide").delegate("li","click",function(){
	$("#slideimg").find("img").attr("src",$(this).find("img").attr("src"));
})
    require('./scroll');

    $(".img-scroll").CscScroll({
        Left: 594,
        Right: 297,
        Time: 2000,
        Auto: true,
        Visual: 3
    });
  
   $("#left-left li").hover(function() {
        $(this).find("div.shade").show();
    }, function() {
        $(this).find("div.shade").hide();
    });
  
   csc.foucsPlay("#src-img",null,2008);
	var $li = $("#src-img ol>li");
	$("#adv-upload").find("li").on("mouseover",function (){
		$li.eq($(this).index()).trigger("mouseover");
	}).on("mouseout",function (){
		$li.eq($(this).index()).trigger("mouseout");
	});
  
  
});

