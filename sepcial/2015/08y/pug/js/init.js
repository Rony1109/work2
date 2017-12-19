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
	
	//明星产品
	$('.mxpro-lst li').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	},function(){
		$(this).removeClass('cur');
	});
	 
	 //同行交流
	var left_right=function(tag,un){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},500,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},500);
			}
		}
	};
	$(".thjl-bd .next").click(function(){
		left_right(".topic-scrll","1");
		return false;
	});
	$(".thjl-bd .prev").click(function(){
		left_right(".topic-scrll","2");
		return false;
	});

});
