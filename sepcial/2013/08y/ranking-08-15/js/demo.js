$(function(){	
	var $scoller = $(".scoller");
	if(screen.width<=1024){
		$scoller.css({right:0});
	};
	function checkPos(){
		var
		sTop = 420, 
		scrollTop = $(window).scrollTop();
		if(scrollTop<=sTop){
			$scoller.css({position:"absolute",top:sTop});
		}else if(scrollTop>sTop){
			if (!('undefined' == typeof(document.body.style.maxHeight))){
				$scoller.css({position:"fixed",top:32});
			}
		};
	};
	checkPos();
	$(window).scroll(function() {
		checkPos();
	});
	
	$(".scoller li a").each(function(i) {
		$(this).bind('click', function() {
			if(i == 6 ){
				$("body,html").animate({scrollTop:0},300);
			}else{
				$("body,html").animate({scrollTop:$(".bar").eq(i).offset().top},300);
			}
		});
	});
});
