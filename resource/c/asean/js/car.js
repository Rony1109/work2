define(function(require, exports, module) {
	require('./init');
	require('./banner-scroll');
	var ts;
	$('.J-slide').BannerScroll({
		OnLine: ts,
		Time: 5000,
		NavNumber: true,
		ChangeColor: $(".banner")
	});
	$(".show li").slice(0,5).each(function() {
		var $span = $(this).find('span');
		var LF = $(this).width() / 2 - $span.width() / 2;
		$span.css('left', LF + 'px');
	});
	var TP=13;
	$(".key-word a").slice(1,6).each(function(){
		TP+=41;
		$(this).css('top',TP+'px')
	})
})