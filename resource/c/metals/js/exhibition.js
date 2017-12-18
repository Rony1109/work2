	define(function(require, exports, module) {
		require("./init");
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
			slideHeight: 410,
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
		var ph = require('m/sea-modules/placeholder.js');
	        ph.placeholder('.search-key');
		//热词
		(function() {
			var AryColor = ['#fef9f9', '#fdf5f5', '#f5f8ff', '#fffff7', '#fdf2f2','f3f7ff'],
				AryFontWeight = ['700', '400', '700', '400', '400','400'],
				AryFontSize = ['16px','14px','16px','12px','14px','12px']

			$(".hot-words").find('a').each(function(i) {
				var random=Math.round(Math.random() * 6);
				$(this).css({
					"background": AryColor[random],
					"font-weight": AryFontWeight[random],
					"font-size": AryFontSize[random]
				});
			});
		})()
	})