$(function(){	
	var $scoller = $(".scoller");
	if(screen.width<=1024){
		$scoller.css({right:0});
	};
	function checkPos(){
		var
		sTop = 420, 		//滚动块原始距页面顶部值
		scrollTop = $(window).scrollTop();
		if(scrollTop<=sTop){
			$scoller.css({position:"absolute",top:sTop});
		}else if(scrollTop>sTop){
			if (!('undefined' == typeof(document.body.style.maxHeight))){//juqery1.9+移除了 $.browser
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
		  $("body,html").animate({scrollTop:$(".bar").eq(i).offset().top},300);
		});
	});
});
