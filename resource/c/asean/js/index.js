define(function(require, exports, module) {
	require('./init');
	//登录状态
	$.get("//api.csc86.com/notify/notify", function(data) {
		if (data.status == true) {
			$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>' + data.data.purchase + '</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>' + data.data.bank + '</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>' + data.data.message + '</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
		}
	}, "jsonp");
	//切换
	var tabs = require("tab");
		tabs($(".side-scroll span a"), $(".img-box a"), 'mouseover', 'cur');
		tabs($(".tab-sev-til a"),$(".sev-til"),'mouseover','cur');
		tabs($(".main-tab li"),$(".J-tab"),'mouseover','cur');
		tabs($(".buyer-tab li"),$(".buyer-content"),'mouseover','cur')
	//baner 滚动
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
})