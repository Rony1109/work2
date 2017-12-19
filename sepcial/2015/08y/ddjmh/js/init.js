/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js',
		'dialog': 'm/dialog/js/init.js',
		'comment': 'm/comment/js/init.js'
	},

	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('./jQueryRotate.js');
	require('top');
	require('header');
	require('placeholder');
	require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
	var dialog = require('dialog');
	var comment = require('comment');
	/*
	 * 以下为专题js代码
	 * ......
	 */

	// <!-- 聚合页面鼠标移入移出 -->
	$(".pyst-gys-cgs").each(function() {
		$(".gys-list").mouseover(function() {
			$(".gysinput").css("display", "block");
		});
		$(".gys-list").mouseout(function() {
			$(".gysinput").css("display", "none");
		});
		$(".cgs-list").mouseover(function() {
			$(".cgsinput").css("display", "block");
		});
		$(".cgs-list").mouseout(function() {
			$(".cgsinput").css("display", "none");
		});
		$(".suspension-dh").hide();
		$(".suspension-kf").mousemove(function() {
			$(".suspension-dh").show();
		});

		$(".suspension-kf").mouseout(function() {
			$(".suspension-dh").hide();
		});

		$("#gys_btn_click").on('click', function() {
			var $this = $(this);
			var tel = /^1\d{10}$/;
			if ($("#gys_name").val() == "" || $("#gys_name").val() == "请输入您的姓名") {
				alert("姓名不能为空！");
				return;
			} else if ($("#gys_tel").val() == "" || $("#gys_tel").val() == "请输入您的手机号") {
				alert("电话不能为空！");
				return;
			} else if (!tel.test($("#gys_tel").val())) {
				alert("请输入正确的电话号码");
				return;
			} else {
				var datas = $this.parents("form.gys-rzlist").serializeArray();
				$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
					if (data.status == true) {
						$("#gys_name").val("");
						$("#gys_tel").val("");
						//alert('加入成功！');
						cscs.dialogs('jhym-tijiao-list');
					} else {
						alert('提交失败！')
					}
				}, 'jsonp');
			}
		});

		$("#cgs_btn_click").on('click', function() {
			var $this = $(this);
			var tel = /^1\d{10}$/;
			if ($("#cgs_name").val() == "" || $("#cgs_name").val() == "请输入您的姓名") {
				alert("姓名不能为空！");
				return;
			} else if ($("#cgs_tel").val() == "" || $("#cgs_tel").val() == "请输入您的手机号") {
				alert("电话不能为空！");
				return;
			} else if (!tel.test($("#cgs_tel").val())) {
				alert("请输入正确的电话号码");
				return;
			} else {
				var datas = $this.parents("form.cgs-rzlist").serializeArray();
				$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
					if (data.status == true) {
						$("#cgs_name").val("");
						$("#cgs_tel").val("");
						cscs.dialogs('jhym-tijiao-list');
					} else {
						alert('提交失败！')
					}
				}, 'jsonp');
			}
		});
	});



	// <!-- 倒计时 -->
	var time = {
		init: function() {
			var EndTime = new Date('2015/08/17 17:00:00');
			var NowTime = new Date();
			var t = EndTime.getTime() - NowTime.getTime();
			var d = Math.floor(t / 1000 / 60 / 60 / 24);
			var h = Math.floor(t / 1000 / 60 / 60 % 24);
			var m = Math.floor(t / 1000 / 60 % 60);
			var s = Math.floor(t / 1000 % 60);
			//alert(h.substring(0,1));

			if (d < 10) {
				d = "0" + d;
			}
			if (h < 10) {
				h = "0" + h;
			}
			if (m < 10) {
				m = "0" + m;
			}
			if (s < 10) {
				s = "0" + s;
			}
			$("#ddjmh_time_d").html(d);
			$("#ddjmh_time_h").html(h);
			$("#ddjmh_time_m").html(m);
			$("#ddjmh_time_s").html(s);
			$("#ddjmh_time_d1").html(d);
			$("#ddjmh_time_h1").html(h);
			$("#ddjmh_time_m1").html(m);
			setTimeout(time.init, 1000);
		}
	}

	time.init();

	var cscs = {};
	cscs.dialogs = function(circleId) {
		dialog({
			id: circleId,
			title: '',
			fixed: true,
			lock: true,
			background: "#000",
			opacity: "0.3",
			content: $("#" + circleId).html(),
			init: function() {

			}
		})
	}
	exports.module = cscs;
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
	//抽奖相关js
	var arrObj = {
		'1': ['Ipad Air', 330],
		'2': ['拍立得', 89],
		'3': ['小米智能手环', 209],
		'4': ['奥莱购200元优惠券', 149],
		'5': [' 精美抱枕',270],		
		'6': ['华南城网推广广告位使用权2周', 30]
	};
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
	
	//大转盘	
	var rotateFun = function(angle, fun) {
		var fun = fun || function() {};
		$('#rotate-img').stopRotate();
		$("#rotate-img").rotate({
			duration: 5000, //转动时间间隔（转动速度）
			angle: 0, //开始角度 
			animateTo: 3600 + angle, //angle是图片上各奖项对应的角度，3600是我要让指针旋转10圈。所以最后的结束的角度就是angle的角度
			callback: fun
		});
	};
	$(".jstart").on("click",function(){
		$.post("http://api.csc86.com/newlottery/lottery", function(data) {
			// console.log(data);
			switch (data['No']) {
				case -1: //未登陆
					seajs.use(csc.url("res", "/f=js/m/sign"), function() {
						csc.checkSign("location.reload");
					});
					break;
				case -3: //本月抽奖活动已经结束
					tpcPop('ygqPop', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'ygqPop');
						closePop($('.jsOkBtn'), 'ygqPop');
					});
					break;
				case -4: //本月抽奖活动还未开始
					tpcPop('startCj', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'startCj');
						closePop($('.jsOkBtn'), 'startCj');
					});
					break;
				case -8: //您已参加过抽奖
					tpcPop('ycgjPop', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'ycgjPop');
						closePop($('.jsOkBtn'), 'ycgjPop');
					});
					break;
				case -10: //今天的抽奖活动还未开始
					tpcPop('startCj', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'startCj');
						closePop($('.jsOkBtn'), 'startCj');
					});
					break;
				case -11: //今天的抽奖活动已结束了
					tpcPop('startCj', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'startCj');
						closePop($('.jsOkBtn'), 'startCj');
					});
					break;
				case -12: //已中过奖
					tpcPop('yzgjPop', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'yzgjPop');
						closePop($('.jsOkBtn'), 'yzgjPop');
					});
					break;
				case -13: //今天的抽奖活动已结束了
					tpcPop('startCj', warnTipFun(data.msg), 613, 317, function() {
						closePop($('.jsClosePop'), 'startCj');
						closePop($('.jsOkBtn'), 'startCj');
					});
					break;
				case 1: //已中奖
					rotateFun(arrObj[data.data.prizeid][1], function() {
						// $("#xzjp").show();    
						$("#pripro").text(data.data.prize);
						tpcPop('yzjPop', $('#yzjPop').html(), 613, 279, function() {
							closePop($('.jsClosePop'), 'yzjPop');
							getZjList(10);//更新中奖列表
							$('form[name=cms_form_zhongjiang]').submit(function() {
								var _form = $(this),
									_json = _form.serializeJson();
								if (_json['linkman'] == "" || _json['phone'] == "" || _json['address'] == "") {
									alert("前面带星号的为必填项，请填写完整！");
									return false;
								}
								$.post(_form.attr('action'), _json, function(data) {
									if (data.status == true) {
										alert("提交成功！");
										art.dialog({
											id: 'yzjPop'
										}).close();
										tpcPop('sharePop', $('#sharePop').html(), 613, 304, function() {
											closePop($('.jsClosePop'), 'sharePop');
											var _html = $('jsShareCt').html();
											$('.jsQone').click(function() {
												window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent('华南城网订单见面会抽奖活动') + '&summary=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网订单见面会#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)));
											});
											$('.jsSina').click(function() {
												window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网订单见面会#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)) + '&amp;href=' + encodeURIComponent(location.href));
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
					var angle = [359,419,479,539,599];
					angle = angle[Math.floor(Math.random() * angle.length)];
					rotateFun(angle, function() {
						tpcPop('wzjPop', $('#wzjPop').html(), 613, 317, function() {
							closePop($('.jsClosePop'), 'wzjPop');
							closePop($('.jsOkBtn'), 'wzjPop');
						});
					});
			}			
		}, "jsonp");	
		getZjList(10);
	});

	//中奖名单
	function getZjList(num){
		$.post("http://api.csc86.com/newlottery/getLog", {
			l:num
		}, function(data) {
			// console.log(data);
			var len = data.data.length ;
			var html = "";
			for (var i = 0; i < len; i++) {
				var _data = data.data[i],
					winners = _data.account,
					wintime = formatDate(parseInt(_data.drawtime * 1000));
				var _len = winners.length;
				if (_len > 2) {
					winners = winners.substring(0, 1) + "****" + winners.substring(_len - 1, _len);
				} else {
					winners = winners.substring(0, 1) + "****";
				}
				html += '<tr>\
						  <td width="50%">' + winners + '</td>\
						  <td width="55%">' + wintime + '</td>\
					  </tr>';
			}
			$('.jsZjMdLst').html(html);
		}, "jsonp");
	}
	 getZjList(10);
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
	//百度分享
	window._bd_share_config={
		"common":{
			"bdSnsKey":{},
			"bdText":"",
			"bdMini":"2",
			"bdMiniList":false,
			"bdPic":"",
			"bdStyle":"0",
			"bdSize":"16",
			"onBeforeClick":function(cmd,config){
				config.bdText = "我在#华南城网订单见面会#抽奖活动中奖啦！快来一起参与吧！";
				return config;
			},
			"onAfterClick":function(cmd,config){
				$.get("http://api.csc86.com/newlottery/share",function(data){
					if(data.status){
						tpcPop('ygqPop', warnTipFun(data.msg), 613, 317, function() {
							closePop($('.jsClosePop'), 'ygqPop');
							closePop($('.jsOkBtn'), 'ygqPop');
						});
					}
					else{
						tpcPop('ygqPop', warnTipFun(data.msg), 613, 317, function() {
							closePop($('.jsClosePop'), 'ygqPop');
							closePop($('.jsOkBtn'), 'ygqPop');
						});
					}
				}, "jsonp")
			}
		},
		"share":{"bdSize":16}		
	};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
});
