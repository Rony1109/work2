define(function(require, exports, module) {
	require('./init');
	//侧导航
	$('.cate-dl dd').hover(function() {
		$(this).addClass('cur');
	}, function() {
		$(this).removeClass('cur');
	});

	//banner
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 540,
		slideHeight: 520,
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

	//设置当前日期
	var _Date = new Date(),
		year = _Date.getFullYear(),
		month = _Date.getMonth() + 1 < 10 ? '0' + (_Date.getMonth() + 1) : _Date.getMonth() + 1,
		day = _Date.getDate() < 10 ? '0' + _Date.getDate() : _Date.getDate();
	$('.t-date').text(year + '-' + month + '-' + day);
	//文字滚动
	require('./scroll');
	var tm;
	$(".scroll-text").CscScroll({
		Left: 600,
		Right: 300,
		Time: 2000,
		linedUp: tm,
		Auto: false,
		Visual: 1
	});
	//登录后
	var isLogin = require('//api.csc86.com/notify/notify?callback=define')
	if (isLogin.status == true) {
		$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>' + isLogin.data.purchase + '</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>' + isLogin.data.bank + '</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>' + isLogin.data.message + '</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
	}
	//选项卡相关
	var tabs = require("tab");
	tabs($(".tab-set li"), $(".tab-inner ul"), 'mouseover', 'cur');
	tabs($(".hot-supply li"), $(".supply"), 'mouseover', 'cur');
	tabs($(".person-supply-nav li"), $(".person-supply-box"), 'mouseover', 'cur');

	//百叶窗
	$(".services-ad").on('mouseover', 'li', function() {
		$(this).addClass('cur').siblings('li').removeClass('cur');
	});
	//今日推荐
	var tms;
	$(".J-scroll-1").CscScroll({
		Left: 400,
		Right: 200,
		Time: 2000,
		linedUp: tm,
		Auto: true,
		Visual: 1
	});
	var tms1;
	$(".J-scroll-2").CscScroll({
		Left: 400,
		Right: 200,
		Time: 2000,
		linedUp: tms1,
		Auto: true,
		Visual: 1
	});
	var tms2;
	$(".J-scroll-3").CscScroll({
		Left: 400,
		Right: 200,
		Time: 2000,
		linedUp: tms2,
		Auto: true,
		Visual: 1
	});
	$('.encyclopedia').on('click mouseover mouseout', 'span', function(e) {
		if (e.type == "click") {
			var $me = $(this),
				$Ul = $me.siblings('ul'),
				$Li = $Ul.children('li:first');
			$Ul.animate({
				marginTop: '-91px'
			}, 700, function() {
				$Ul.removeAttr('style');
				$Ul.append($Li);
			})
		} else if (e.type == "mouseover") {
			$(this).addClass('cur')
		} else if (e.type == "mouseout") {
			$(this).removeClass('cur');
		}

	})
});