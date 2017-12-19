$(function(){	
	var $scoller = $(".scoller");
	if(screen.width<=1024){
		$scoller.css({right:0});
	};
	function checkPos(){
		var
		sTop = 450,
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
	
	$(".scoller li").each(function(i) {
        var $t = $(this);
        $t.bind('click', function() {
			if(i == 4 ){
				$("body,html").stop().animate({scrollTop:0},300);
			}else{
				$("body,html").stop().animate({scrollTop:$(".block").eq(i).offset().top},300);
                $t.addClass("cur").siblings().removeClass("cur");
			}
		});
	});
});