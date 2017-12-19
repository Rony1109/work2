$(function(){
	$(".tj a:eq(0)").click(function(){
		$(".tj a").removeClass("cur");
		$(".rultwo").css("display","none");
		$(this).addClass("cur");
		$(".rulone").css("display","block");
	});
	$(".tj a:eq(1)").click(function(){
		$(".tj a").removeClass("cur");
		$(".rulone").css("display","none");
		$(this).addClass("cur");
		$(".rultwo").css("display","block");
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
	
});