/*会员中心改版 首页JS by lg 2013.08.23*/
function tab() { //选项卡
	$("#tabList").children("li").bind("click", function() {
		var n = $(this).index();
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
		$("#tabCont").children().hide();
		$("#tabCont").children().eq(n).show();
	})
}

function cloneHead(_class) { //顶部导航浮动
	var _class = $(_class).clone();
	$(_class).css({
		"position": "fixed",
		"top": 0
	}).appendTo("body");
	if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
		$(_class).css({
			"position": "absolute",
			"width": "100%",
			"filter": "alpha(opacity=0)",
			"opacity": 0
		});
		$(window).bind("scroll", function() { /*加滑动效果*/
			var h = $(document).scrollTop();
			$(_class).stop();
			h > 40 ? $(_class).animate({
				top: h,
				opacity: 1
			}, 200) : $(_class).animate({
				opacity: 0
			}, 200, function() {
				$(this).css("top", "-40px")
			});
		}).trigger("scroll");
	}
}
(function checkCst() {
	$.get('//i.csc86.com/mem/cstInfo', function(data) {
		var level = '';
		data = data.data || {};
		if (data.surplusDay <= 10) {
			//switch (data.data.level) {
			switch (data.level) {
				case 'vip':
					level = '城商通VIP';
					break;
				case '城商通':
					level = '城商通';
					break;
			}
		}
		if (level.length > 0) {
			if(!csc.getCookie('Prompt')){
			var endTime = data.endTime || '';
			csc.useDialog(function() {
				artDialog({
					title: false,
					icon: 'mem-w',
					content: '<span class="g-fs14">您的' + level + '会员到期时间为' + endTime.replace(/\-/g,'/') + '，请及时<a href="//payment.csc86.com/serve.item.do?id=88082324-212f-46c0-b6cd-757ea3b2af29" style="color:#f60;font-weight:700">续期</a>哦。</span>',
					lock: true
				});
			});
			csc.setCookie('Prompt','Prompt',0.01);
			}
		}
	}, 'jsonp');
})();

$(function() {
	tab();
	cloneHead(".head");

	//插入cookie
	function MyaddCookie(name, value, expires) {
		var str = name + "=" + escape(value);
		var date = new Date();
		date.setTime(date.getTime() + expires * 24 * 3600 * 1000); //expires单位为天
		str += ";expires=" + date.toGMTString();
		document.cookie = str;
	}
	//取得cookie
	function MygetCookie(name) {
		var str = document.cookie.split(";")
		for (var i = 0; i < str.length; i++) {
			var str2 = str[i].split('=');
			if ($.trim(str2[0]) == name) return unescape(str2[1]);
		}
	}
	//提示vip会员可以免费开通企业实地认证
	var date = new Date();
	var sDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	if ($('#alertOpenLocalId').length > 0 && sDate != MygetCookie('FirstTime')) {
		MyaddCookie('FirstTime', sDate, 1);
		csc.useDialog(function() {
			artDialog({
				title: false,
				icon: 'mem-w',
				content: '<span class="g-fs-14">您已经是我们的VIP会员，可以享受免费申请<a href="//approve.csc86.com/user/localIndex?approveType=local" class="g-fw-b" style="color:#f60">开通企业实地认证</a>的服务哦！</span>',
				lock: true
			});
		});
	}

});