$(function(){
	var $obj= $("#src_view"),ln=$obj.find("ul").children("li").length;	
    $("#out_view").delegate("div.l","click",function(){
       scrollRight($obj);
    }).delegate("div.r","click",function() {
       scrollLeft($obj);
     });
	 
	 //点击向左
	function scrollLeft(obj){
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0}).find("li:first").appendTo($self);
			})
		}
	}
	 //点击向右
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	
	$('#out_view').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$("#src_view");
			textTimer = setInterval(function(){
				 scrollLeft($t);
			} ,2000);
	 }).trigger("mouseleave");
	 
	//
	var a_stop;
	 $('#a_link a').hover(function(){
		  clearInterval(a_stop);
		 },function(){
			var $t = $(this);
			a_stop = setInterval(function(){
				 jump($t);
			} ,50);
	 }).trigger("mouseleave");
	 
	 function jump($t){
		var l = $t.position().left,t = $t.position().top;
		 $t.animate({top:t-1,left:l-1},function(){
			$t.css({top:t,left:l});
		 });
	 }
	 
})