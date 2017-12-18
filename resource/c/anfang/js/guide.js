define(function(require, exports, module) {
	require('./init');
	require('./banner-scroll');

	//轮播
	var tms;
	$('.J-slide').Slide({
		onlineUp: tms,
		timer: 6000
	});
	
	$('.brand .br-right ul li').hover
	
})