$(function(){
	var $new=$("#slide-news");
	$new.delegate("a.next","click",function(){	
		var self = $("div.roll",$new), adwidth = $("div.csc-wrap",$new).width();
		self.animate({left : -adwidth},300,function(){
			self.css({"left":0}).find("div.csc-wrap:first").appendTo(self);
		});
	}).delegate("a.prev","click",function(){
		var self = $("div.roll",$new), adwidth = $("div.csc-wrap:first",$new).width();
		self.find("div.csc-wrap:last").prependTo(self);
		self.css({"left":-adwidth}).animate({left : 0},300);
	});

	//新闻滚动
	var textTimer,AutoScroll = function (obj){
		    var self=obj.find("ul");
			self.animate({
					marginTop:"-25px"
			},500,function(){
				self.css({marginTop:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('#scrolltext').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this);
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");
	
	
	//实体纵横
	 var len  = $(".slide-roll ul li").length;
	 var index = 0;
	 var sildTimer;
	 //滑入 停止动画，滑出开始动画.
	 $('.slide-roll').hover(function(){
			 clearInterval(sildTimer);
		 },function(){
			 sildTimer = setInterval(function(){
			   slide(index);
				index++;
				if(index==len){index=0;}
			  } , 3000);
	 }).trigger("mouseleave");

	// 
	function slide(index){
		 $(".slide-roll ol li").eq(index).addClass("hover").siblings().removeClass();  
			$(".slide-roll ul li").stop(true,false)
			.animate({opacity :0},{ queue: false, duration: 1000 }).eq(index).animate({opacity :1},1000);
	};	
	$("#slide-roll ol li").hover(function(){
			var index=$(this).index();	
			slide(index);
	});
	

//电商模范
var dtime,$this= $("#dialog"),ln=$this.find("ul").children("li").length;	
    $("#dialog").delegate("span.l","click",function(){
	
       scrollRight($this);
    }).delegate("span.r","click",function() {
       scrollLeft($this);
     });
	
	  $('#dialog').hover(function(){
			 clearInterval(dtime);
		 },function(){
			 dtime = setInterval(function() {
           		scrollLeft($this);
        }, 4000);
	 }).trigger("mouseleave");
	 //品牌先锋
	var barandtime,$obj= $("#brand"),ln=$this.find("ul").children("li").length;	
    $("#brand").delegate("span.l","click",function(){
       scrollRight($obj);
    }).delegate("span.r","click",function() {
       scrollLeft($obj);
     });
	
	  $('#brand').hover(function(){
			 clearInterval(barandtime);
		 },function(){
			 barandtime = setInterval(function() {
				scrollLeft($obj);
        }, 4000);
	 }).trigger("mouseleave");
	 
	 
	 
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
	
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	
});