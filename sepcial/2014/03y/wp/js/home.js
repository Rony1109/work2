$(function(){
	$("ul.qh-top li")	.hover(function(){
		var ind=$(this).index();
		$("ul.qh-top li,ul.qh-cen li").removeClass("cur");
		$("ul.qh-top li:eq("+ind+")").addClass("cur");
		$("ul.qh-cen li:eq("+ind+")").addClass("cur");
	})	   
})