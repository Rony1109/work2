$(function(){
	$(".new-list span").click(function(){
		$(".new-list span,.topmain .l ul").removeClass("cur");
		$(this).addClass("cur");
		
		$(".topmain .l ul:eq("+$(this).index()+")").addClass("cur");
	});
	
	$(".stb-l a").click(function(){
		var ind=$(this).index();
		$(".stb-l a").removeClass("cur");
		$(this).addClass("cur");
		$(".stb-r li").removeClass("cur");
		$(".stb-r li:eq("+ind+")").addClass("cur");
	});
	
	
	
	var textTimer,AutoScroll = function (obj){
		    var self=obj,lih =self.find("li:first").width();
			self.animate({
					left:-lih
			},1000,function(){
				self.css({left:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('.bn04 ul').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this);
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");
	
	$(".shop-font li").hover(function(){
		$(".shop-font li,.shop-l li,.shop-img li").removeClass("cur");
		$(this).addClass("cur");
		$(".shop-l li:eq("+$(this).index()+")").addClass("cur");
		$(".shop-img li:eq("+$(this).index()+")").addClass("cur");
	});
	
	
	var textTimer2,AutoScroll2 = function (){
		    var lih2=$(".topmain .c").find(".c01 .cur").index();
			var len=$(".topmain .c .c01 span").length;
			if(lih2==(len-1)){
				$(".topmain .c a").removeClass("cur").first().addClass("cur");
				$(".topmain .c .c01 span").removeClass("cur").first().addClass("cur");
			}else{
				$(".topmain .c a.cur").removeClass("cur").next().addClass("cur");
				$(".topmain .c .c01 span.cur").removeClass("cur").next().addClass("cur");
			}
	}
	$(".topmain .c").hover(function(){
			 clearInterval(textTimer2);
		 },function(){
			textTimer2 = setInterval(function(){
				 AutoScroll2($t)
			} ,3000);
	 }).trigger("mouseleave");
	
	$(".topmain .c .c01 span").hover(function(){
		$(".topmain .c a,.topmain .c .c01 span").removeClass("cur");
		$(this).addClass("cur");
		$(".topmain .c a:eq("+$(this).index()+")").addClass("cur");
	});
	
	
});