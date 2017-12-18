$(function(){
	$("dl.sh-pr dd").live("mouseover",function () {
		$(this).children(".pr-card").addClass("pr-show");
		var box=$(this).children(".pr-card").attr("id");
		var ta=box.split("_");
		showPersonalCard(ta[0],box);
	  });
	$("dl.sh-pr dd").live("mouseout", function () {
		$(this).children(".pr-card").removeClass("pr-show");
	  });	   
	
});











