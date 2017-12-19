$(function(){

	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<405){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-sign-info .bd").html('<a id="J_signEd" rel="nofollow" target="_blank" data-memberid="'+data.data.memberId+'"  rel="nofollow" href="http://member.csc86.com/">'+data.data.userName+'</a>！消息<a rel="nofollow" target="_blank" href="http://member.csc86.com/membercenter/messageall/" class="top-msg-num">0</a><span class="v-line"></span><a rel="nofollow" href="http://member.csc86.com/login/logout">退出</a>');
		}
	},"jsonp");

	$(".arpall li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});
	$(".img6 li div").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});

	$(".kx ul li").hover(function(){
		$(this).children("span").css("display","block");							  
	},function(){
			$(this).children("span").removeAttr("style");	
	});

	$(".title i.l").click(function(){
		var th=$(this);
		var index=th.closest(".title").siblings("ul").children("li").length;
		if(th.closest(".title").siblings("ul").children("li.cur").index()!=0){
			th.closest(".title").siblings("ul").children("li.cur").removeClass("cur").prev().addClass("cur");
		}
	});
	$(".title i.r").click(function(){
		var th=$(this);
		var index=th.closest(".title").siblings("ul").children("li").length;
		if((index-1)!=th.closest(".title").siblings("ul").children("li.cur").index()){
			th.closest(".title").siblings("ul").children("li.cur").removeClass("cur").next().addClass("cur");
		}
	});

});