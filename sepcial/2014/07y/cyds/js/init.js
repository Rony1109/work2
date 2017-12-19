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
	require('top');
	var comment = require('comment');
	require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
	require('./jQueryRotate.js');
	(function(config) {
		config['path'] = 'http://res.csc86.com/v2/l/artDialog/4.1.7';
	}(art.dialog.defaults));


	//表单序列化插件
	(function($) {
		$.fn.serializeJson = function() {
			var serializeObj = {};
			var array = this.serializeArray();
			var str = this.serialize();
			$(array).each(function() {
				if (serializeObj[this.name]) {
					if ($.isArray(serializeObj[this.name])) {
						serializeObj[this.name].push(this.value);
					} else {
						serializeObj[this.name] = [serializeObj[this.name], this.value];
					}
				} else {
					serializeObj[this.name] = this.value;
				}
			});
			return serializeObj;
		};
	})(jQuery);


	/*右侧导航*/
	(function() {
		var _aside = $('.aside');
		$(window).scroll(function() {
			var _top = $(this).scrollTop();
			if (_top <= 900) {
				_aside.hide();
			} else {
				_aside.fadeIn();
			}
		});
	})();


	//公用弹窗
	var tpcPop = function(id, content, w, h, fun) {
		var fun = fun || function() {};
		art.dialog({
			id: id,
			content: content,
			width: w,
			height: h,
			fixed: true,
			lock: true,
			padding: 0,
			init: fun
		});
	};
	var closePop = function(obj, id) {
		obj.click(function() {
			art.dialog({
				id: id
			}).close();
			return false;
		});
	};

	//var angleArry=[15,45,75,105,135,165,195,225,255,285,315,345];
	var arrObj = {
		'27': ['焖烧罐', 255],
		'28': ['移动电源', 345],
		'29': ['16GU盘', 315],
		'30': ['时尚抱枕', 75],
		'31': ['usb风扇', 105],
		'32': ['iphone手机壳', 135],
		'33': ['平板电脑', 165],
		'34': ['牛皮钱包', 195],
		'35': ['耳机', 285]
	};

	//抽奖相关js

	var warnTipFun = function(text) {
		var warnTip = '<div class="g-pr cyds-box cyds-tip">\
						<a class="close jsClosePop" href=""></a>\
						<div class="start-tip">\
							<h2>' + text + '</h2>\
							<p class="g-h30"></p>\
							<div class="g-tc okbtn-box"><input class="ipt-smt jsOkBtn" type="button" name="" value="确 定" /></div>\
						</div>\
					</div>';
		return warnTip;
	}
	var rotateFun = function(angle, fun) {
		var fun = fun || function() {};
		$('#rotateBd').stopRotate();
		$("#rotateBd").rotate({
			duration: 5000, //转动时间间隔（转动速度）
			angle: 0, //开始角度 
			animateTo: 3600 + angle, //angle是图片上各奖项对应的角度，3600是我要让指针旋转10圈。所以最后的结束的角度就是angle的角度
			callback: fun
		});
	};

	//点击立即抽奖
	$('.jsStartCj').click(function() {
		$.post("http://api.csc86.com/choujiang/lottery.html", {
			channelid: 1,
			eventid: 10
		}, function(data) {
			switch (data['No']) {
				case -1: //未登陆
					seajs.use(csc.url("res", "/f=js/m/sign"), function() {
						csc.checkSign("location.reload");
					});
					break;
				case -2: //活动已禁用
					tpcPop('yjyPop', warnTipFun('活动已禁用！'), 613, 317, function() {
						closePop($('.jsClosePop'), 'yjyPop');
						closePop($('.jsOkBtn'), 'yjyPop');
					});
					break;
				case -3: //活动已过期
					tpcPop('ygqPop', warnTipFun('活动已过期！'), 613, 317, function() {
						closePop($('.jsClosePop'), 'ygqPop');
						closePop($('.jsOkBtn'), 'ygqPop');
					});
					break;
				case -4: //活动未开始
					tpcPop('startCj', $('#startTimePop').html(), 613, 317, function() {
						closePop($('.jsClosePop'), 'startCj');
						closePop($('.jsOkBtn'), 'startCj');
					});
					break;
				case -5: //没有找到验证器
					tpcPop('ffczPop', warnTipFun('非法操作！'), 613, 317, function() {
						closePop($('.jsClosePop'), 'ffczPop');
						closePop($('.jsOkBtn'), 'ffczPop');
					});
					break;
				case -6: //不是本行业
					break;
				case -7: //已中过奖
					tpcPop('yzgjPop', $('#yjcgjPop').html(), 613, 317, function() {
						closePop($('.jsClosePop'), 'yzgjPop');
						closePop($('.jsOkBtn'), 'yzgjPop');
					});
					break;
				case -8: //已抽过奖
					tpcPop('ycgjPop', $('#yjcgjPop').html(), 613, 317, function() {
						closePop($('.jsClosePop'), 'ycgjPop');
						closePop($('.jsOkBtn'), 'ycgjPop');
					});
					break;
				case 1: //已中奖
					rotateFun(arrObj[data['data']['prizeid']][1], function() {
						tpcPop('yzjPop', $('#yzjPop').html(), 613, 394, function() {
							$('.jsSzJx').val(arrObj[data['data']['prizeid']][0]);
							closePop($('.jsClosePop'), 'yzjPop');
							$('form[name=cms_form_zhongjiang]').submit(function() {
								var _form = $(this),
									_json = _form.serializeJson();
								if (_json['info[xingming1]'] == "" || _json['info[zhanghao1]'] == "" || _json['info[dianhua1]'] == "" || _json['info[dizhi1]'] == "" || _json['info[youbian1]'] == "") {
									alert("前面带星号的为必填项，请填写完整！");
									return false;
								}
								$.post(_form.attr('action'), _json, function(data) {
									if (data.status == true) {
										alert("提交成功！");
										art.dialog({
											id: 'yzjPop'
										}).close();
										tpcPop('sharePop', $('#sharePop').html(), 613, 354, function() {
											closePop($('.jsClosePop'), 'sharePop');
											var _html = $('jsShareCt').html();
											$('.jsQone').click(function() {
												window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent('华南城网创业大赛') + '&summary=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网创业大赛#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)));
											});
											$('.jsSina').click(function() {
												window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网创业大赛#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)) + '&amp;href=' + encodeURIComponent(location.href));
											});
										});

									} else {
										alert("提交失败，请重新填写提交！");
									}
								}, "jsonp");
								return false;
							});

						});
					});

					break;
				default: //0 未中奖
					var angle = [45, 225];
					angle = angle[Math.floor(Math.random() * angle.length)];
					rotateFun(angle, function() {
						tpcPop('wzjPop', $('#wzjPop').html(), 613, 317, function() {
							closePop($('.jsClosePop'), 'wzjPop');
							closePop($('.jsOkBtn'), 'wzjPop');
						});
					});
			}

		}, "jsonp");
		return false;
	});


	//时间戳转换为时间
	function formatDate(date) {
		var now = new Date(date);
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		return year + "-" + month + "-" + date + "-" + hour + ":" + minute;
	}

	//中奖名单
	$.post("http://api.csc86.com/choujiang/getwinner.html", {
		channelid: 1,
		eventid: 10,
		vest: true
	}, function(data) {
		var len = data.data.length;
		var html = "";
		for (var i = 0; i < len; i++) {
			var _data = data.data[i],
				winners = _data.winners,
				wininfo = _data.wininfo.split(":")[1],
				wintime = formatDate(parseInt(_data.wintime * 1000));
			var _len = winners.length;
			if (_len > 2) {
				winners = winners.substring(0, 1) + "****" + winners.substring(_len - 1, _len);
			} else {
				winners = winners.substring(0, 1) + "****";
			}
			html += '<tr>\
					  <td width="20%">' + winners + '</td>\
					  <td width="45%">' + wininfo + '</td>\
					  <td width="35%">' + wintime + '</td>\
				  </tr>';
		}
		$('.jsZjMdLst').html(html);
	}, "jsonp");

	//中奖名单向上移动
	(function() {
		var scrollTimer;
		var $this = $('.jsZjMdLst');
		$this.hover(function() {
			clearInterval(scrollTimer);
		}, function() {
			var _tr = $this.find('tr');
			if (_tr.length > 6) {
				scrollTimer = setInterval(function() {
					var _h = $this.find('tr:first').height();
					$this.animate({
						"marginTop": -_h + "px"
					}, 600, function() {
						$this.css({
							marginTop: 0
						}).find("tr:first").appendTo($this);
					})
				}, 3000);
			}
		}).trigger("mouseleave");
	})();


	//立即报名

	$('.jsLjBm').click(function() {
		/*var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
		if (isLogin.status != true) {
				setTimeout(function(){
					seajs.use(csc.url("res", "/f=js/m/sign"), function() {
					csc.checkSign("location.reload");
				});
				},400)
				return false;
		} */
			tpcPop('zxbmPop', $('#zxbmPop').html(), 613, 368, function() {
				closePop($('.jsClosePop'), 'zxbmPop');
				$('form[name=cms_form_chuangye]').submit(function() {
					var _form = $(this),
						_json = _form.serializeJson();
					if (_json['info[name]'] == "" || _json['info[id]'] == "" || _json['info[phone]'] == "" || _json['info[qq]'] == "" || _json['info[hangye]'] == "" || _json['info[team]'] == "" || _json['info[xuanyan]'] == "") {
						alert("前面带星号的为必填项，请填写完整！");
						return false;
					}
					$.post(_form.attr('action'), _json, function(data) {
						if (data.status == true) {
							alert("提交成功！");
							art.dialog({
								id: 'zxbmPop'
							}).close();
						} else {
							alert("提交失败，请重新填写提交！");
						}
					}, "jsonp");
					return false;
				});
			});
		return false;
	});


	//加入圈子
	csc.addCircleCommC = function() {
		$.get("http://quan.csc86.com/doCircle?t=authC&circleId=a3ef2d21-9919-4557-9d70-afce6cfc378e", function(data) {
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
							$.get("http://quan.csc86.com/doCircle?t=addC&circleId=a3ef2d21-9919-4557-9d70-afce6cfc378e&" + $("#addCircleForm").serialize(), function(data) {
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

	//成员 话题数量
	if ($('.jsHtNum')[0]) {
		$.get("http://quan.csc86.com/circle/api/info?id=a3ef2d21-9919-4557-9d70-afce6cfc378e", function(data) {;
			$('.jsHtNum').html('<span>' + data.data.memberSum + '<br/>成员</span><span>' + data.data.topicCount + '<br/>话题</span>');
		}, "jsonp");
	}

	//评论
	comment.init('9de35819-1dcc-4566-b683-bc40e27a15a7', $('#JComment'), {
		pn: 2
	});

});