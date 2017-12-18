define(function(require, exports, module) {
	require('./init');

	$(".side-nav li").hover(function() {
		$(this).find('.second-link').show();
		$(this).find('.first-link').addClass('cur');
	}, function() {
		$(this).find('.second-link').hide();
		$(this).find('.first-link').removeClass('cur');
	});

	//baner
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 520,
		slideHeight: 390,
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

	//产品
	var tabs = require('tab');
	tabs($(".product-nav li"), $(".product-intro li"), 'mouseover', 'cur');

	//右侧导航
	require('./side-nav');
	//产品鼠标效果
	var LfAry=[8,87];
	var setLeft = function(argument) {
		argument.each(function(i) {
			$(this).stop().animate({
				'left': LfAry[i] + 'px'
			}, 300);
		});
	}
	$('.floor-mid li').hover(function() {
		if ($(this).hasClass('fix')) {
			setLeft($(this).find('a'));
			setLeft($(this).children('span'));
		} else {
			$(this).find('a').stop().animate({
				right:"4px"
			}, 300);
			$(this).children().siblings('span').stop().animate({
				right:"4px"
			}, 300);
		}
	}, function() {
		$(this).removeAttr('style');
		$(this).find('a').removeAttr('style');
		$(this).find('span').removeAttr('style');
	});
})