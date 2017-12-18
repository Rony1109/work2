define(function(require, exports, module) {
	require('./init');
	//轮播
	var slide = require('slide');
	new slide(".slide ul", ".slide ul>li", {
		slideWidth: 540,
		slideHeight: 220,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '.slide>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '.J-slide>ol',
		slides_fun: slide.definedfun
	});
	//登录
	var isLogin = require('//api.csc86.com/notify/notify?callback=define');
	if (isLogin.status == true) {
		var sUl = '<ul class="log-mess">' +
			'<li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>' + isLogin.data.purchase + '</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>' + isLogin.data.bank + '</em>)</a></li>' +
			'<li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>' + isLogin.data.message + '</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li>' +
			'</ul>'
		$(".log-msg").html(sUl);
	}
	//选项卡
	var tabs = require('tab');
	tabs($(".tab-set li"), $(".tab-inner ul"), "mouseover", "cur");
	tabs($(".buy-sell li"), $(".tab-content"), "mouseover", "cur");
	tabs($("#j-tab-b li"), $(".tab-b"), "mouseover", "cur");
	tabs($("#j-tab-a li"), $(".tab-a"), "mouseover", "cur");
});