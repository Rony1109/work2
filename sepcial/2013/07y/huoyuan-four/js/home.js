$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<705){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	

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

	$(".tab a").click(function(){
		var inde=$(this).index()+1;
		$(".link-lc a").removeClass("cur");
		$(".link-lc a:eq("+inde+")").addClass("cur");
	});
	
	$(".link-lc a").click(function(){
		$(".link-lc a").removeClass("cur");
		$(this).addClass("cur");
	});


});