$(function(){
	//左移动
	$(".box05 .maito .scr-l").click(function(){
		left_right(".box05 .scr-all","1");
	});
	//右移动
	$(".box05 .maito .scr-r").click(function(){
		left_right(".box05 .scr-all","2");
	});
	//左移动
	$(".box06 .maito .scr-l").click(function(){
		left_right(".box06 .scr-all","1");
	});
	//右移动
	$(".box06 .maito .scr-r").click(function(){
		left_right(".box06 .scr-all","2");
	});
	//左移动
	$(".box02 .maito .scr-l").click(function(){
		left_right(".box02 .scr-all","1");
	});
	//右移动
	$(".box02  .maito .scr-r").click(function(){
		left_right(".box02 .scr-all","2");
	});
	//轮播
	var timer;
	$('.box02 .maito').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	//轮播
	var timer1;
	$('.box05 .maito').mouseenter(function(){
			 clearInterval(timer1);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer1= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	//轮播
	var timer2;
	$('.box06 .maito').mouseenter(function(){
			 clearInterval(timer2);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer2= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	$(".mial ul li").hover(function(){
		$(".maximg a").removeClass("cur");
		var ind=$(this).index();
		$(".maximg a:eq("+ind+")").addClass("cur");
	})
	$(".box03 ul li").hover(function(){
		$(".b03img a,.box03 ul li").removeClass("cur");
		var ind=$(this).index();
		$(this).addClass("cur");
		$(".b03img a:eq("+ind+")").addClass("cur");
	})
	
})


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

