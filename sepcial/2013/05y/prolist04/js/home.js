$(function(){
	//var top = $("#fiexd_nav").position().top;
	$(document).scroll(function(){
		var topscr = $(this).scrollTop();
		if(topscr<705){
			$("#fiexd_nav").removeClass("fiexd_nav");	
		}else{
			$("#fiexd_nav").addClass("fiexd_nav");	
		}
	});	

	$(".m-img,.m-pr05").live("mouseenter",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").css("display","block");
	}).live("mouseleave",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").removeAttr("style"); 
	});
});