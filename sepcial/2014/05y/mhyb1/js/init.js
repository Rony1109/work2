/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
		'comment':'m/comment/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
	var comment=require('comment');
    
	jQuery.extend( jQuery.easing,
	{
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		}
	});
	
	/*热议图*/
	$(".ryt-itm").hover(function(){
		var _this=$(this);
		var _h=_this.height();
		var _ttH=_this.find(".tt").height();
		var _dtl=_this.find(".dtl");
		_dtl.stop(true,false).animate({height:_h-_ttH},500,'easeOutQuint');
	},function(){
		var _this=$(this);
		var _h=_this.height();
		var _ttH=_this.find(".tt").height();
		var _dtl=_this.find(".dtl");
		_dtl.stop(true,false).animate({height:0},300,'easeOutQuint');
	});
	
	/*往期回顾*/
	$(".wqhg .next").click(function(){
		left_right(".wqhg-bd","1");
	});
	$(".wqhg .prev").click(function(){
		left_right(".wqhg-bd","2");
	});
	var left_right=function(tag,un){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},300,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},300);
			}
		}
	}
	
	//评论
	comment.init('a7934b67-18ce-4902-b59c-5b7cfeb08126',$('#JComment'),{pn:3});
});
