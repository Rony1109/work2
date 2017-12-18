define(function(require, exports, module) {
	require('./init');
	require('./banner-scroll');
	//轮播
	var tms;
	$('.J-slide').Slide({
		onlineUp: tms,
		timer: 6000
	});
	/*会员服务*/
	var tab = require("tab");
		tab($(".supply-demand li"),$(".s-d-content"),"mouseover","cur");
		tab($('.tab-set li'),$('.tab-inner ul'),"mouseover","cur")
})