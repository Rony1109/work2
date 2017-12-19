seajs.config({

	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'comment': 'm/comment/js/init.js',
		'dialog': 'm/jsM/dialog.js'
	},


	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});
define(function(require, exports, module) {
	require('jquery');
	require('m/newtopnav/js/init');
	var art = require('dialog');
	var comment = require('comment');
	//加入圈子
	var addCircleCommC = function() {
		$.get("http://quan.csc86.com/doCircle?t=authC&circleId=b262ce3a-3b77-4f6c-b786-0ec5f05aa515", function(data) {
			var $val = data.code;
			if ($val == "NO_POWER") { //无权加入
				art.alert("你的身份不满足加入该圈子！")
			} else if ($val == "join_000") { //已加入
				art.alert("已加入");
			} else if ($val == "join_001") { //己审请
				art.alert("您已经申请加入该圈子，请等待审核");
			} else if ($val == "LOGIN_FAIL") { //未登陆
				window.location.href = 'http://login.csc86.com/';
			} else if ("no_auth" == $val) {
				art.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
			} else { //已登陆,未加入,未审请,有权审请
				art.confirm(data.code, function() {
					//需要判断加入类型不能为空
					$.get("http://quan.csc86.com/doCircle?t=addC&circleId=b262ce3a-3b77-4f6c-b786-0ec5f05aa515&" + $("#addCircleForm").serialize(), function(data) {
						var val = data.code;
						if ("join_001" == val) {
							art.tip("申请加入成功！");
						} else if ("join_000" == val) {
							art.tip("您已成功加入！");
						} else if ("sns_fail_id" == val) {
							art.tip("ID无效！");
						} else {
							art.alert("申请加入失败！,请重试");
						}
					}, "jsonp")
				}, null, '申请加入商圈', true);
			}
		}, 'jsonp')
	}

	//加入圈子按钮
	$('.jsJrQuanZi').click(function() {
		addCircleCommC();
		return false;
	});

	//成员 话题数量
	if ($('.jsHtNum')[0]) {
		$.get("http://quan.csc86.com/circle/api/info?id=b262ce3a-3b77-4f6c-b786-0ec5f05aa515", function(data) {
			$('.jsHtNum').html('<span>' + data.data.memberSum + '<br/>成员</span><span>' + data.data.topicCount + '<br/>话题</span>');
		}, "jsonp");
	}

	//评论
	comment.init('2768616c-a280-4de2-a091-8ca67d82ed81', $('#JComment'), {
		pn: 3
	});
	//申请诊断
	$('#jClick').on('click', function() {
		var $form =
			'<form action="">' +
			'<div class="tablewidth">' +
			'<div class = "tab-title"> ' +
			'<span class="til-lay">申请诊断大师服务</span>' +
			'<span class="tmin-lay"></span>' +
			'<a class="g-f-r" href="javascript:;" title="" id="close"></a>' +
			'</div>' +
			'<table border="0" cellspacing="0" cellpadding="0">' +
			'<tbody><tr><td>' +
			'<span><em>*</em>企业名称:</span>' +
			'<input name="qymc" type="text">' +
			'</td><td>' +
			'<span><em>*</em>联系人:</span>' +
			'<input name="lxr" type="text">' +
			'</td></tr><tr><td>' +
			'<span><em>*</em>所属行业:</span>' +
			'<input name="sshy" type="text">' +
			'</td><td>' +
			'<span><em>*</em>联系电话:</span>' +
			'<input name="lxdh" type="text">' +
			'</td></tr><tr><td>' +
			'<span><em>*</em>旺铺网址:</span>' +
			'<input name="wpwz" type="text">' +
			'</td><td><span><em>*</em>QQ:</span>' +
			'<input name="qq" type="text">' +
			'</td></tr><tr><td>' +
			'<span>电子邮箱:</span>' +
			'<input name="yx" type="text">' +
			'</td><td>&nbsp;</td></tr></tbody></table>' +
			'<div class="tip-lay">注：请填写真实的联系资料，带*标为必填项目。</div>' +
			'</div>' +
			'</form>';
		$.get("http://api.csc86.com/api/member/islogin", function(data) {
			if (data.status) {
				//msg, okFun, cancelFun, title, lock
				art.confirm($form, function() {
					var qymc = $("input[name='qymc']").val(),
						lxr = $("input[name=lxr]").val(),
						sshy = $("input[name=sshy]").val(),
						lxdh = $("input[name=lxdh]").val(),
						wpwz = $("input[name=wpwz]").val(),
						qq = $("input[name=qq]").val(),
						email = $("input[name=yx]").val();
					if (qymc == "" || lxr == "" || sshy == "" || lxdh == "" || wpwz == "" || qq == "") {
						alert("尊敬的用户，你还有重要资料未填写完整，请您核对完毕再提交！");
						return false;
					}
					$.post("http://cncms.csc86.com/formguide/index.php", {
						"formid": 71,
						"subtype": "ajax",
						"dosubmit": "诊断大师",
						"info[qymc]": qymc,
						"info[lxr]": lxr,
						"info[sshy]": sshy,
						"info[lxdh]": lxdh,
						"info[wpwz]": wpwz,
						"info[qq]": qq,
						"info[yx]": email
					}, function(data) {
						if (data.status == true) {
							alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
							$("input[name=qymc]").val("");
							$("input[name=lxr]").val("");
							$("input[name=sshy]").val("");
							$("input[name=lxdh]").val("");
							$("input[name=wpwz]").val("");
							$("input[name=qq]").val("");
							$("input[name=yx]").val("");
						} else {
							alert("申请失败，请刷新后重试！");
						}
					}, "jsonp");

				}, true, '啊实打实大大多数', true)
			}
		}, 'jsonp');
		return false
	});
	$('body').on('click', '#close', function() {
		$('.aui_buttons').find('button').eq(1).trigger('click')
	});

	var fixed = require('./fixed');
	fixed.fixed('#fixed', true)
})