define(function(require, exports, module) {
	require('./init');
	var tabs = require('tab');
	tabs($(".tab-nav li"), $(".con-l-img a"), 'mouseover', 'cur');
	tabs($(".tab-set li"), $(".tab-inner ul"), "mouseover", "cur");
	tabs($(".buy-sell li"), $(".tab-content"), "mouseover", "cur");
	tabs($(".discount-tab-nav li"), $(".discount-tab-content"), "mouseover", "cur");
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 540,
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
	new slide("#J-scroll ul", "#J-scroll ul>li", {
		slideWidth: 200,
		slideHeight: 280,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '#J-scroll>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '#J-slide>ol',
		slides_fun: slide.definedfun
	});
	new slide("#J-scroll-2 ul", "#J-scroll-2 ul>li", {
		slideWidth: 200,
		slideHeight: 280,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '#J-scroll-2>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '#J-slide-2>ol',
		slides_fun: slide.definedfun
	});
	new slide("#J-scroll-3 ul", "#J-scroll-3 ul>li", {
		slideWidth: 200,
		slideHeight: 280,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '#J-scroll-3>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '#J-slide-3>ol',
		slides_fun: slide.definedfun
	});
	new slide("#J-scroll-4 ul", "#J-scroll-4 ul>li", {
		slideWidth: 200,
		slideHeight: 280,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '#J-scroll-4>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '#J-slide-4>ol',
		slides_fun: slide.definedfun
	});
	new slide("#J-scroll-5 ul", "#J-scroll-5 ul>li", {
		slideWidth: 200,
		slideHeight: 280,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '#J-scroll-5>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '#J-slide-5>ol',
		slides_fun: slide.definedfun
	});

	//检测登录
	var isLogin = require('//api.csc86.com/notify/notify?callback=define');
	if (isLogin.status == true) {
		var sUl = '<ul class="log-mess">' +
			'<li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>' + isLogin.data.purchase + '</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>' + isLogin.data.bank + '</em>)</a></li>' +
			'<li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>' + isLogin.data.message + '</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li>' +
			'</ul>'
		$(".log-msg").html(sUl);
	}
	//产品鼠标效果
	$('.prduct-list li').hover(function() {
		$(this).find('a').stop().animate({
			marginRight: "6px"
		}, 300);
	}, function() {
		$(this).find('a').removeAttr('style')
	})
	//右侧导航
	require('./side-nav');
	//团购倒计时
	var getAndDate = $('.tuan b').attr('end').replace(/\-/g, '/');
	endTime = new Date(getAndDate);
	var startTime = new Date();
	startTime = startTime / 1000;
	endTime = endTime / 1000;
	var day = endTime - startTime

	function CountDown() {
		if (day > 0) {
			myday = Math.floor(day / (24 * 60 * 60));
			var _hours = (day / (24 * 60 * 60) - myday) * 24
			var hours = Math.floor(_hours);
			var _minutes = (_hours - hours) * 60;
			var minutes = Math.floor(_minutes);
			var minutesStyle = minutes >= 10 ? minutes : '0' + minutes;
			var _seconds = (_minutes - minutes) * 60
			var seconds = Math.round(_seconds);
			var secondsStyle = seconds >= 10 ? seconds : '0' + seconds

			$('.tuan b').html(myday + '天' + hours + '小时' + minutesStyle + '分' + secondsStyle + '秒');
			--day;
		} else {
			$('.tuan b').html('团购已经结束！')
		}
	};
	CountDown();
	var timer = setInterval(function() {
		CountDown()
	}, 1000);

	//加盟
	require('./join-alert');
	//页脚加个边框重置
	var pageId = $('body').attr('id');
	console.log(pageId)
	if (pageId == 'pcc') {
		$('.link').addClass('bt-none');
	}
})