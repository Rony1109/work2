	define(function(require, exports, module) {
		var tabs = require("tab");
		tabs($(".img-nav a"), $(".img-small a"), 'mouseover', 'cur');
		var slide = require('slide');
		new slide(".J-slide ul", ".J-slide ul>li", {
			slideWidth: 240,
			slideHeight: 200,
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
		new slide(".J-slided ul", ".J-slided ul>li", {
			slideWidth: 1000,
			slideHeight: 350,
			slideDirection: 0,
			slides_xssm: 1,
			slideSeries: 1,
			zantin: true,
			slides_auto_span: 6000,
			slideButs: '.J-slided>ol', //切换按钮容器，样式自定义
			slideButs_html: function(i) {
				return "<li>" + i + "</li>";
			}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj: "mouseover",
			slideButs_selectclass: "cur",
			slides_controller: '.J-slided>ol',
			slides_fun: slide.definedfun
		});
	})