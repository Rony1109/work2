$(function(){
 	var win=window,csc=win.csc,$this = $("#scoll-b-iner");
	function hover(select){
		var scrollTimer="";
		$(select).hover(function() {
       	 clearInterval(scrollTimer);
  		  }, function() {
        scrollTimer = setInterval(function() {
            scrollLeft($this);
        }, 4000);
   		 }).trigger("mouseleave");
	}
	
	
	function scrollLeft(obj){
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0}).find("li:first").appendTo($self);
				 var id = $self.find("li:first").attr("id");
			})
		}
	}
	
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400, function() {
			  var id = $self.find("li:first").attr("id");
			})
		}   
	}
	//点击向左
	$("#scoll-b-iner").delegate("span.l","click",function() {
		scrollLeft($this);
	});
	//点击向右
	$("#scoll-b-iner").delegate("span.r","click",function() {
	   scrollRight($this);
	});
	
   hover("div.show-info-win div.scoll-outer ");
   hover("div.m-inner>div.scoll-outer");
});

