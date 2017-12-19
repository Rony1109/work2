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
	
	//右侧菜单
	$(window).scroll(function(){
		var $aside=$(".aside");
		var top=$(this).scrollTop();
		var flrTop=$("#flr1").offset().top;
		if(top>flrTop){
			$aside.fadeIn();
		}else{
			$aside.hide();
		}
	});

	//左右轮播
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
	
	if($('.wqzt-lst li').length>4){
		lrAutoPlay(".wqzt-bd","1",5000);
	}

});
