define(function(require, exports, module) {
	require('./init');
	//banenr
	require('./banner-scroll');
	var ts;
	$('.banner').BannerScroll({
		OnLine:ts,
		Time:5000

	})
})