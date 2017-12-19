$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-sign-info").find("span.bd").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");	

	$(".items").each(function(i){
		$(this).css("height",$(this).parent().outerHeight()+"px");

	});
	$(".items1").bind("mouseenter mouseleave",function(e){		
			if(e.type=="mouseenter"){
				$(this).addClass("cur");
				
			}
			else if(e.type=="mouseleave"){
				$(this).removeClass("cur");
			}
		});
	var num=0;
	$(".tab_nav li").bind("mouseover",function(){
		var index=$(".tab_nav li").index(this),num=index;
		$(this).addClass("cur").siblings("li").removeClass("cur")
		$(".list").eq(index).addClass("dsb").siblings("div.list").removeClass("dsb");
		$(".list").trigger("mouseover");
		$(".list").find("ul").removeClass("set");
		$(".list").eq(index).find("ul").addClass("set");
		_tab();
		$(".ctr_l").unbind().bind("click",function(){
			var $this=$(this)
			 $this.siblings("ul").stop().animate({marginLeft:"-632px"},400,function(){
						$this.siblings("ul").append($this.siblings("ul").children("li:first"));
						$this.siblings("ul").css("margin-left","-324px");
					});
		});
		$(".ctr_r").unbind().bind("click",function(){
			var $this=$(this)
			$this.siblings("ul").stop().animate({marginLeft:"-16px"},400,function(){
						$this.siblings("ul").prepend($this.siblings("ul").children("li:last"));
						$this.siblings("ul").css("margin-left","-324px");
					});
		});
	}).eq(num).trigger("mouseover");
	var timers;
		$("div.phto").unbind().bind("mouseenter mouseleave",function(e){
			var $this=$(this);
		 if(e.type=="mouseleave"){
			timers=setInterval(function(){
					if($this.find("ul").hasClass("set")){
						$this.find("ul").stop().animate({marginLeft:"-632px"},400,function(){
						$this.find("ul").append($this.find("ul").children("li:first"));
						$this.find("ul").css("margin-left","-324px");

					});
						}
				},1000);
			}
			else if(e.type=="mouseenter"){
				clearInterval(timers);
			}
		}).trigger("mouseleave");
});
function _tab(dom){
	var timer;
	$("div.dsb").unbind().bind("mouseenter mouseleave",function(e){
			var $this=$(this);

		 if(e.type=="mouseleave"){
			timer=setInterval(function(){
					if($this.find("ul").hasClass("set")){
						$this.find("ul").stop().animate({marginLeft:"-632px"},400,function(){
						$this.find("ul").append($this.find("ul").children("li:first"));
						$this.find("ul").css("margin-left","-324px");

					});
						}
				},1000);
			}
			else if(e.type=="mouseenter"){
				clearInterval(timer);
			}
		}).trigger("mouseleave");
}
