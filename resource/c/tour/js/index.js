
define(function(require, exports, module) {
	require('./init');
	require('./banner-scroll');
	var ts;
	$('.banner').BannerScroll({
		OnLine:ts,
		Time:5000

	});
});