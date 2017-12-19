var zhname="";
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
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}
	},"jsonp");

	$(".arpall li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});
	$(".m-img,.m-pr05").live("mouseenter",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").css("display","block");
	}).live("mouseleave",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").removeAttr("style"); 
	});

	$(".bgf").hover(function(){$(this).find(".thid").css("visibility","visible")},function(){$(this).find(".thid").css("visibility","hidden")});
	$(".pro-c li").hover(function(){$(this).find(".thid2").css("visibility","visible")},function(){$(this).find(".thid2").css("visibility","hidden")});
	$(".arpall ul li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});

	
});
