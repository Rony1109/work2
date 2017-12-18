
function tab(tab,cont){
	var $tab = $(tab) || $("#Tab"),
		$tabCont = $(tabCont) || $("#tabCont");
	$tab.delegate("li","click",function(){
		var i = $(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$tabCont.children(":eq("+i+")").show().siblings().hide();
	});
}
$(function(){
	tab("#Tab","#tabCont");
});