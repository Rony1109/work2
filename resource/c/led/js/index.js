define(function(require, exports, module) {
	require('./init');
	/**
	 *@ 检测登录
	 */
	$.get("//api.csc86.com/notify/notify", function(data) {
		if (data.status == true) {
			$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>' + data.data.purchase + '</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>' + data.data.bank + '</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>' + data.data.message + '</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
		}
	}, "jsonp");
	/**
	 *@ 侧导航
	 */
	var hover = require('hover');
	hover(".fl_box", "hover", function(ele) {
		var o = $(ele);
		var l = o.find(".navlist_dl"),
			r = o.find(".list_r"),
			navbox = $(".box_navlist");
		var l_offs = l.offset(),
			l_oH = l.outerHeight(),
			r_oH = r.outerHeight(),
			cH = document.documentElement.clientHeight,
			bs = $(document).scrollTop(),
			csstop = 0;
		if (l_offs.top + l_oH > bs + cH) {
			csstop = l_oH - r_oH;
		} else if (l_offs.top + r_oH > bs + cH) {
			csstop = bs + cH - l_offs.top - r_oH;
		}
		csstop = csstop + l_offs.top > navbox.offset().top ? csstop : navbox.offset().top - l_offs.top;
		r.css("top", csstop + "px");
	});

	/**
	 *@ banner 滚动
	 */
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
	/**
	 *@ 热词
	 */
	var Ary = ['#fef9f9-14px-400-#444', '#fdf5f5-14px-400-#444', '#f5f8ff-16px-700-#444', '#fffff7-14px-400-#444', '#fdf2f2-14px-400-#444', '#fef9f9-15px-400-#444', '#f5f8ff-12px-400-#666', '#fffff7-15px-700-#444', '#fef9f9-15px-700-#444', '#fdf5f5-15px-400-#7b7b7b']
	$(".hot-word a").each(function() {
		var random = Math.round(Math.random() * 9),
			ArySplit = Ary[random].split('-');
		$(this).css({
			"background": ArySplit[0],
			"font-size": ArySplit[1],
			"font-weight": ArySplit[2],
			'color': ArySplit[3]
		})
	});

	/**
	 *@ 百度分享
	 */
	require('./bdshar');

});