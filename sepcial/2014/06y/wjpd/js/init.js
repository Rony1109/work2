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
	
	/*左右轮播*/
    function lrScroll(tag,un,time){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},time,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},time);
			}
		}
	};
	function lrAutoPlay(tag,un,time){
		var scrollTimer;
		$(tag).hover(function(){
			clearInterval(scrollTimer);
		},function(){
			var _this=$(this);
			scrollTimer=setInterval(function(){
				 lrScroll(_this,un);
			},time);
		}).trigger("mouseleave");
	};
	
	lrAutoPlay(".wqhg-c","1",5000);
	$(".wqhg-bd .prev").click(function(){
		lrScroll(".wqhg-c","2",300);
	});
	$(".wqhg-bd .next").click(function(){
		lrScroll(".wqhg-c","1",300);
	});

});
