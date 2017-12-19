$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	
	$("#item_img li").hover(function(){
		$(this).find('div.bg').addClass('hover');
    },function(){
	 	$(this).find('div.bg').removeClass('hover');
	});
	$(".foor_tit li").hover(function(){
		var $t = $(this),inNum = $t.index(),con =$t.parent().next(),ul = con.find('ul.g-c-f:eq('+inNum+')') ;
		$t.addClass('cur').siblings().removeClass('cur');
		ul.addClass("cur").siblings().removeClass('cur');
    })
});

