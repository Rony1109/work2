define(function(require, exports, module) {
	require('./init');
	//banenr
	require('./banner-scroll');
	var ts;
	$('.banner').BannerScroll({
		OnLine:ts,
		Time:5000

	});
	
	$(".banner").delegate('.btn','mouseenter mouseleave',function(e){
		if(e.type=="mouseenter"){
			$(".ten-contry").show();
		}
		else if(e.type=="mouseleave"){
			$(".ten-contry").hide();
		}
	});

})