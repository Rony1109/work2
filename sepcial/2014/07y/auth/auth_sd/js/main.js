$(function(){
	 //左移动
	$(".ebs-pr .ad-l01").click(function(){
		left_right(".ad-l05","1");
	});
	//右移动
	$(".ebs-pr .ad-l02").click(function(){
		left_right(".ad-l05","2");
	});
	//轮播
	var timer;
	$('.ebs-pr').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	
	//轮播
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
});
