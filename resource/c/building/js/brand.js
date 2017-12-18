define(function(require, exports, module) {
	require('./init');
	//轮播
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 360,
		slideHeight: 260,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '.J-slide>ol',
		slides_fun: slide.definedfun
	});
	var ie6 = !-[1, ] && !window.XMLHttpRequest;
	if (ie6) {
		$('.supply-company').hover(function() {
			$(this).addClass('cur');
		}, function() {
			$(this).removeClass('cur');
		});
		$('.hop-products').hover(function() {
			$(this).addClass('cur');
		}, function() {
			$(this).removeClass('cur');
		});
	}
})