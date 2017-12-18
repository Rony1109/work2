/*返回顶部 2014.1.21 by lg*/
$(window).bind("scroll",function (){
	var top = document.documentElement.scrollTop || document.body.scrollTop,
		goTopHeight = $("#goTop").outerHeight(true),
		winHeight = document.documentElement.clientHeight;
	
	top > 10 ? $("#goTop").css("top",winHeight-goTopHeight+top-30).children().last().fadeIn() : $("#goTop").css("top",winHeight-goTopHeight+30).children().last().hide();
	
}).trigger("scroll");

$("#goTop").children("a.ico-qr").hover(function(){$("#goTop").children("div.qr").show();},function(){$("#goTop").children("div.qr").hide();});
$("#goTop").children("a.ico-gotop").click(function(){$("body,html").animate({scrollTop:0},300);});