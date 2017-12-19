/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'top': 'm/top-bar/js/init.js',
		'comment': 'm/comment/js/init.js'
	},

	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
	require('top');
	require('./focusPlay');
	var comment = require('comment');
	//require('./jQueryRotate.js');


	/*
	 * 以下为专题js代码
	 * ......
	 */
	$(".pichdler li").hover(function() {
		$(this).find("div.shade").show();
	}, function() {
		$(this).find("div.shade").hide();
	});

	csc.foucsPlay("#src-img", null, 2008);
	var $li = $("#src-img ol>li");
	$("#adv-upload").find("li").on("mouseover", function() {
		$li.eq($(this).index()).trigger("mouseover");
	}).on("mouseout", function() {
		$li.eq($(this).index()).trigger("mouseout");
	});

	$(".flr").delegate(".utitle", "click", function() {
		$(this).addClass("ucur").siblings(".uinfo").slideDown();
		$(this).parent().parent().siblings().find(".utitle").removeClass("ucur").siblings(".uinfo").slideUp();

	});



	//幻灯
	require('./scroll');
	var tm;
	$(".img-scroll").CscScroll({
		Left: 318,
		Right: 159,
		Time: 3000,
		linedUp: tm,
		Auto: true,
		Visual: 6
	});



	//加入圈子
	csc.addCircleCommC = function() {
		$.get("http://quan.csc86.com/doCircle?t=authC&circleId='25212b43-d843-4c73-a3e5-f4a91ec45437", function(data) {
			var $val = data.code;
			if ($val == "NO_POWER") { //无权加入
				csc.alert("你的身份不满足加入该圈子！")
			} else if ($val == "join_000") { //已加入
				csc.alert("已加入");
			} else if ($val == "join_001") { //己审请
				csc.alert("您已经申请加入该圈子，请等待审核");
			} else if ($val == "LOGIN_FAIL") { //未登陆
				seajs.use(csc.url("res", "/f=js/m/sign"), function() {
					csc.checkSign("location.reload");
				});
			} else if ("no_auth" == $val) {
				csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
			} else { //已登陆,未加入,未审请,有权审请
				csc.useDialog(function() {
					art.dialog({
						title: '申请加入商圈',
						content: data.code,
						fixed: true,
						okVal: '确定',
						background: "#000",
						opacity: "0.3",
						ok: function() {
							//需要判断加入类型不能为空
							$.get("http://quan.csc86.com/doCircle?t=addC&circleId='25212b43-d843-4c73-a3e5-f4a91ec45437&" + $("#addCircleForm").serialize(), function(data) {
								var val = data.code;
								if ("join_001" == val) {
									csc.success("申请加入成功！");
								} else if ("join_000" == val) {
									csc.success("您已成功加入！");
								} else if ("sns_fail_id" == val) {
									csc.alert("ID无效！");
								} else {
									csc.alert("申请加入失败！,请重试");
								}
							}, "jsonp");

						},
						cancel: true,
						lock: true
					});
				})
			}
		}, 'jsonp')
	}

	//加入圈子按钮
	$('.jsJrQuanZi').click(function() {
		csc.addCircleCommC();
		return false;
	});
	require('./text-scroll');
	var timers1;
	$('.scroll-1').ConScroolTop({
		$select: 'ul',
		childrens: 'li',
		MoveTop: '-26px',
		times: 700,
		rank: timers1
	});
	var timers2;
	$('.scroll-2').ConScroolTop({
		$select: 'ul',
		childrens: 'li',
		MoveTop: '-26px',
		times: 700,
		rank: timers2
	});
	var timers3;
	$('.scroll-3').ConScroolTop({
		$select: 'ul',
		childrens: 'li',
		MoveTop: '-68px',
		times: 700,
		rank: timers3
	});
	//成员 话题数量
	/*if ($('.jsHtNum')[0]) {
		$.get("http://quan.csc86.com/e12dab4c-d73e-4d02-8159-33887c0b1e2b.html", function(data) {
			$('.jsHtNum').html('<span>' + data.data.memberSum + '<br/>成员</span><span>' + data.data.topicCount + '<br/>话题</span>');
		}, "jsonp");
	}*/

	//评论
	comment.init('25212b43-d843-4c73-a3e5-f4a91ec45437', $('#JComment'), {
		pn: 3
	});



});