/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
		'dialog':'m/dialog/js/init.js'
        //'header': 'm/head-search/js/init.js',
        //'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	var isSubmit=false;
// 	require('jquery');
	console.log($(window));
    require('top');
	require('./jQueryRotate.js');
   // require('header');
   // require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 
	var dialog=require('dialog');
		$(function(){
			 $(".sign").click(function(){
				art.dialog({
				title:false,
				lock:true,
				padding:0,
				content:$('.signinPop')[0]
				});
			 });
		});
	
	//签到表单
	$('.ipt-smt-sign').click(function() {
					var 	_json = $("#subform").serializeArray(),_form=$("#subform");
					var name = $.trim($('#name').val()),
						   id = $.trim($('#id').val()),
						   lxdh = $.trim($('#lxdh').val()),
						   gsmc = $.trim($('#gsmc').val()),
						   wpwz = $.trim($('#wpwz').val());
					if (name== "" || id == ""|| lxdh == ""|| gsmc == "" || wpwz == ""  ) {
						alert("尊敬的用户，你还有重要资料未填写完整，请您核对完毕再提交！");
						return false;
					}
				
					$.get(_form.attr('action'), _json, function(data) {

						if (data.status) {
							window.location.reload();
						} else {
							alert("提交失败，请重新填写提交！");
						}
					}, "jsonp");
					
					return false;
				});
	
	
	
	
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
		dialog({
			id: id,
			content: content,
			width: w,
			height: h,
			fixed: false,
			lock: true,
			padding: 0,
			init: fun
		});
	};
	var closePop = function(obj, id) {
		obj.click(function() {
			dialog({
				id: id
			}).close();
			return false;
		});
	};
	
	var randomNum = parseInt(Math.random()*Math.random()*100,10)%2;
	var arrObj = {
		'41': ['抱枕', 315,],
		'42': ['50点积分 ', randomNum ? 105:285],
		'43': ['100点积分', randomNum ? 105:345],
		'44': ['耳机', 75],
		'45': ['拍立得', 135],
		'46': ['吹风机', 195],
		'47': ['ipad', 255],
		'48': ['iphone6', 15]
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
		$('.jsStartCj').addClass('cjzbtn');
		$("#rotateBd").rotate({
			duration: 5000, //转动时间间隔（转动速度）
			angle: 0, //开始角度 
			animateTo: 3600 + angle, //angle是图片上各奖项对应的角度，3600是我要让指针旋转10圈。所以最后的结束的角度就是angle的角度
			callback: fun
		});
	};


	//点击立即抽奖
	$('.jsStartCj').click(function() {

		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		$.post("http://api.csc86.com/choujiang/lottery.html", {
			channelid: 1,
			eventid: 13
		}, function(data) {
			
			switch (data['No']) {
				case -1: //未登陆
					require.async('http://res.csc86.com/js/m/sign.js',function(){
						csc.checkSign();
					});
					break;
				case -2: //活动已禁用
					tpcPop('frPop', $('#frPop').html(), 440, 243, function() {
						closePop($('.jsClosePop'), 'frPop');
						closePop($('.jsOkBtn'), 'frPop');
					});
					break;
				case -3: //活动已过期
					tpcPop('psPop', $('#psPop').html(), 440, 243, function() {
						closePop($('.jsClosePop'), 'psPop');
						closePop($('.jsOkBtn'), 'psPop');
					});
					break;
				case -4: //活动未开始
					tpcPop('startCj', $('#startTimePop').html(), 440, 317, function() {
						closePop($('.jsClosePop'), 'startCj');
						closePop($('.jsOkBtn'), 'startCj');
					});
					break;
				case -5: //没有找到验证器
					tpcPop('illPop', $('#illPop').html(), 440, 243, function() {
						closePop($('.jsClosePop'), 'illPop');
						closePop($('.jsOkBtn'), 'illPop');
					});
					break;
				case -6: //不是本行业
					break;
				case -7: //已中过奖
					tpcPop('yzgjPop', $('#yjcgjPop').html(), 440, 317, function() {
						closePop($('.jsClosePop'), 'yzgjPop');
						closePop($('.jsOkBtn'), 'yzgjPop');
					});
					break;
				case -8: //已抽过奖
					tpcPop('ycgjPop', $('#yjcgjPop').html(), 440, 224, function() {
						closePop($('.jsClosePop'), 'ycgjPop');
						closePop($('.jsOkBtn'), 'ycgjPop');
					});
					break;
				case 1: //已中奖
					rotateFun(arrObj[data['data']['prizeid']][1], function() {
						tpcPop('yzjPop', $('#yzjPop').html(), 440, 460, function() {
							$('.jsSzJx').val(arrObj[data['data']['prizeid']][0]);
							closePop($('.jsClosePop'), 'yzjPop');
							$('form[name=cms_form_jhcj ]').submit(function() {
								var _form = $(this),
									_json = _form.serializeJson();
								if (_json['info[name]'] == "" || _json['info[id]'] == "" || _json['info[shdz]'] == "" || _json['info[lxdh]'] == "" || _json['info[yb]'] == "") {
									alert("请填写完整！");
									return false;
								}
								$.get(_form.attr('action'), _json, function(data) {
									if (data.status == true) {
										alert("提交成功！");
										dialog({
											id: 'yzjPop'
										}).close();
										
									} else {
										alert("提交失败，请重新填写提交！");
									}
								}, "jsonp");
								return false;
							});

						});
						$('.jsStartCj').removeClass('cjzbtn');
					});
					
					break;
				default: //0 未中奖
					var angle = [45, 225];
					angle = angle[Math.floor(Math.random() * angle.length)];
					rotateFun(angle, function() {
						tpcPop('wzjPop', $('#wzjPop').html(), 440, 234, function() {
							closePop($('.jsClosePop'), 'wzjPop');
							closePop($('.jsOkBtn'), 'wzjPop');
						});
						$('.jsStartCj').removeClass('cjzbtn');
					});
			}
			isSubmit=false;
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
		eventid: 13,
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
	
	$('.jsQone').click(function() {
												window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent('华南城网囤年货活动') + '&summary=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网囤年货#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)));
											});
											$('.jsSina').click(function() {
												window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网囤年货#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)) + '&amp;href=' + encodeURIComponent(location.href));
											});
	
	
});
