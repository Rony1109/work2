$(function (){
	if(csc.ie6){
		$("div.main-cate").find("a").each(function (){
			var $t = $(this);
			$t.width()<120 || $t.width(120);
		});
	}
	if(csc.shop.isHome){
		$("div.main").addClass("home-main");
	}
});