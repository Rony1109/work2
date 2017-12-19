$(function(){
		//新闻滚动
	var textTimer,AutoScroll = function (obj){
		    var self=obj.find("ul"),lih =self.find("li:first").height();
			self.animate({
					top:-lih
			},500,function(){
				self.css({top:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('#scrollimg').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this);
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");
	 

$(function(){
	if(online[0]==0){
		$(".qqline").html('<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1373292466&site=qq&menu=yes">马上报名</a>')
	}else{
		$(".qqline").html('<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1373292466&site=qq&menu=yes">马上报名</a>')
	}
});


})


