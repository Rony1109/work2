$(function(){
	var textTimer,AutoScroll = function (obj){
		    var self=obj.find("ul"),lih =self.find("li:first").height();
			self.animate({
					top:-lih
			},500,function(){
				self.css({top:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('#tie_bor').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this);
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");
	 
	 
	 
});