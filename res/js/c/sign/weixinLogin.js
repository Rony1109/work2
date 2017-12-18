	//微信

	$('#weixinlogin').on('click', function() {
		var M_Url = null;
		if ($(window.parent.document).find('#iframe_login').length > 0) {
			$(window.parent.document).find('#iframe_login').height(400);
			M_Url = window.parent.location;
		} else {
			M_Url = $("#redirecturi").val();
		}
		var registerUrl = window.parent.location == window.location ? csc.url("member") : window.parent.location;
		var obj = new WxLogin({
			id: "weixinBox",
			appid: "wx4ca80aab5d45f426",
			scope: "snsapi_login",
			redirect_uri: "http%3a%2f%2flogin.csc86.com",
			state: M_Url || registerUrl
		});
		setDialog();
	});
	//设置对话框
	function setDialog() {
			var A_H = $('body').height() > $(window).height() ? $('body').height() : $(window).height();
			if ($('.shade').length > 0) {
				$('.shade').show()
					.css({
						'width': $('body').width() + 'px',
						'height': A_H + 'px'
					});
			} else {
				var oDiv = $('<div></div>');
				oDiv.addClass('shade')
					.css({
						'width': $('body').width() + 'px',
						'height': A_H + 'px'
					});
				$('body').append(oDiv);
				oDiv.show();
			}
			$('.shade').show();
			var LF = ($(window).width() - $('#weixinBox').width()) / 2;
			var TP = ($(window).height() - $('#weixinBox').height()) / 2;
			$('#weixinBox').css({
				'left': LF + 'px',
				'top': TP + 'px'
			}).show();
			$('#weixinBox').append('<span class="closed">X</span>');
			$('#weixinBox').off().on('click', '.closed', function() {
				$('#weixinBox').hide();
				$('.shade').hide();
				if ($(window.parent.document).find('#iframe_login').length > 0) {
					$(window.parent.document).find('#iframe_login').height(359);
				}
			})
		}
		//参数获取
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}
	if (getQueryString('code') != null) {
		var setJson = {
			'appid': 'wx4ca80aab5d45f426',
			'secret': '3da7b9071aca96e900de1e3749339c22',
			'code': getQueryString('code'),
			'grant_type': 'authorization_code'
		};
		//获取openid和access_token
		$.getJSON('//login.csc86.com/getweixinInfo', setJson, 'jsonp')
			.done(function(data) {
				var myData = data['data'];
				var userInfo = {
						'access_token': myData['access_token'],
						'openid': myData['openid']
					}
					//获取用户信息
				$.getJSON('//login.csc86.com/wx_userinfo', userInfo, 'jsonp')
					.done(function(data) {
						var overData = data['data'];
						//第三方登录
						$.post("//login.csc86.com/api/openlogin", {
							"openId": overData['openid'],
							"nickname": overData['nickname'],
							"inviteId": getQueryString('state'),
							"source": "WX"
						}, function(data) {
							var para = getQueryString('state');
							if (data.status) {
								if (para) {
									location.href = para;
								} else {
									location.href = csc.url("member");
								}

							} else {
								alert(data.msg);
							}
						}, 'jsonp')
					});
			})
			.fail(function() {
				alert('授权失败！')
			});
	}