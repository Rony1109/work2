define(function(require, exports, module) {
	require('./init');
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 600,
		slideHeight: 280,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + (i + 1) + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '.J-slide>ol',
		slides_fun: slide.definedfun
	});
	//选项卡
	var tabs = require("tab");
	tabs($(".tabs li"), $(".tabs-content"), 'mouseover', 'cur');
})