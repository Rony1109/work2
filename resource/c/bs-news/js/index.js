define(function(require, exports, module) {
	require('./init');
	//选项卡
	var tabs = require("tab");
	tabs($(".tab-nav li"), $(".tab-main"), 'mouseover', 'cur');
	tabs($(".side-tab-nav li"), $(".tab-content"), 'mouseover', 'cur');
	tabs($(".wonderful-nav li"), $(".wonderful-content ul"), 'mouseover', 'cur');
	//滚动
	require('./scroll');
	var tm;
	$(".scrolling").CscScroll({
		Left: 600,
		Right: 300,
		Time: 2000,
		linedUp: tm,
		Auto: true,
		Visual: 1
	});
});