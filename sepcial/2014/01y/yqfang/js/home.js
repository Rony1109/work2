$(function(){
	
	function slide(l_src,index){
		 l_src.find('li').eq(index).addClass("cur").siblings().removeClass();  
		 l_src.find('span').stop(true,false).animate({opacity :0},{ queue: false, duration:2000 }).eq(index).animate({opacity :1},2000);
	};	
	$(".l_src  ol li").hover(function(){
			var l_src = $(this).parents('.l_src'), index=$(this).index();	
			
			slide(l_src,index);
	});
	
	
	
	 var sildTimer=[];
	 //滑入 停止动画，滑出开始动画.
	 $('div.l_src').each(function(n, element) { 
	 var $t=$(this), len  = $(this).find('span').length;
	 var index = 0;
         $(this).hover(function(){
			 clearInterval(sildTimer[n]);
		 },function(){
			 sildTimer[n] = setInterval(function(){
			   slide($t,index);
				index++;
				if(index==len){index=0;}
			  } , 2000);
	 }).trigger("mouseleave");
	
    });
	
	
	
	var barandtime,$obj= $("#src_view"),inner=$obj.find("div.inner"),ln=$obj.find("ul").children("li.g-cf").length;
    $("#src_view").delegate("span.l","click",function(){
       scrollRight(inner);
    }).delegate("span.r","click",function() {
       scrollLeft(inner);
     });
	 
	 //点击向左
		function scrollLeft(obj){
		var $self = obj.find("ul.g-cf");
		
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li.g-cf:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0}).find("li:first").appendTo($self);
			})
		}
	}
	
	function scrollRight(obj) {
		var $self = obj.find("ul.g-cf");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li.g-cf:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	var textTimer='';
	$('#src_view').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			$t=$(this).find("div.inner");
			textTimer = setInterval(function(){
				 scrollLeft($t);
			} ,5000);
	 }).trigger("mouseleave");
});
