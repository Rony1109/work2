$(function (){
	if(csc.ie6){
		$("div.main-cate").find("a").each(function (){
			var $t = $(this);
			$t.width()<120 || $t.width(120);
		});
	}
});