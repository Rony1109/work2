/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	require('./init');
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 520,
		slideHeight: 220,
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
	var num = 0,
		len = $(".bulk-purchase").find("ul").length;
	$("#ctr-l").bind("click", function() {
		num--;
		if (num <= 0) {
			num = 0;
			$(this).removeClass("cur");
		}
		$("#ctr-r").removeClass("active");
		$(".bulk-purchase").animate({
			marginLeft: (-238 * num) + "px"
		}, 500);
	});
	$("#ctr-r").bind("click", function() {
		num++;
		if (num >= len - 1) {
			$(this).addClass("active");
			num = len - 1;
		}
		$("#ctr-l").addClass("cur");
		$(".bulk-purchase").animate({
			marginLeft: (-238 * num) + "px"
		}, 500);
	});

	$.get("//api.csc86.com/quotation/counts.html?category=27,29,34", function(data) {
		var NUM = data['count'].toString().split(''),
			Ary = [1, 0, 0, 0, 0],
			len1 = NUM.length,
			len = Ary.length,
			EndAry = [],
			$span = $(".buy-num").find("span");
		if (len1 < len) {
			EndAry = Ary.slice(0, len - len1).concat(NUM);
			$(".buy-num").find("span").each(function(i) {
				$(this).text(EndAry[i]);
			});
		} else {
			$(".buy-num").find("span").each(function(i) {
				$(this).text(NUM[i]);
			});
		}

	}, 'jsonp')

});