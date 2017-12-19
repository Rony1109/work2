	// 
	function slide(index){
		 $("#src-img ol li").eq(index).addClass("cur").siblings().removeClass();  
			$("#src-img ul li").stop(true,false).animate({opacity :0},{ queue: false, duration:2000 }).eq(index).animate({opacity :1},2000);
	};	
	$("#src-img ol li").hover(function(){
			var index=$(this).index();	
			slide(index);
	});
	
$(function(){
	 var len  = $(".src-img ul li").length;
	 var index = 0;
	 var sildTimer;
	 //滑入 停止动画，滑出开始动画.
	 $('#src-img').hover(function(){
			 clearInterval(sildTimer);
		 },function(){
			 sildTimer = setInterval(function(){
			   slide(index);
				index++;
				if(index==len){index=0;}
			  } , 5000);
	 }).trigger("mouseleave");
	//新闻滚动
	var textTimer,AutoScroll = function (obj){
		    var self=obj.find("ul:first");
			self.animate({
					marginTop:"-25px"
			},500,function(){
				self.css({marginTop:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('#font_src').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this);
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");	
})