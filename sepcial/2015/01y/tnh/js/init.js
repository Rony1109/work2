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
	},

	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	var isSubmit=false;
    require('top');
	var dialog=require('dialog');
	require('./jQueryRotate.js');
	

	 require('./scroll');
			var tm;
			$(".img-scroll").CscScroll({
				Left: 470,
				Right: 235,
				Time: 2000,
				linedUp: tm,
				Auto: true,
				Visual: 4
			});
			
		 $(window).scroll(function(){
			 var topscr = $(this).scrollTop();
				//alert(topscr);

				if(topscr<505){
					$(".fiexd").addClass("fiexd_nav");	
				}else{
					$(".fiexd").removeClass("fiexd_nav");	
				}

				if(topscr<505){
					$(".fiexd2").addClass("fiexd_nav");	
				}else{
					$(".fiexd2").removeClass("fiexd_nav");	
				}
		
				if(topscr<505){
					$(".fiexd3").addClass("fiexd_nav");	
				}else{
					$(".fiexd3").removeClass("fiexd_nav");	
				}

				if(topscr<505){
					$(".fiexd4").addClass("fiexd_nav");	
				}else{
					$(".fiexd4").removeClass("fiexd_nav");	
				}

				if(topscr<505){
					$(".fiexd5").addClass("fiexd_nav");	
				}else{
					$(".fiexd5").removeClass("fiexd_nav");	
				}

				if(topscr<505){
					$(".fiexd6").addClass("fiexd_nav");	
				}else{
					$(".fiexd6").removeClass("fiexd_nav");	
				}

				if(topscr<505){
					$(".fiexd7").addClass("fiexd_nav");	
				}else{
					$(".fiexd7").removeClass("fiexd_nav");	
				}
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
	 
	//var dialog = require('m/dialog/js/init');
		$(".cjpupbtn").click(function(){
			var dg=dialog({
				title:false,
				lock: true,
				fixed:true,
				padding: 0,
				content: $('.pup')[0],
				init:function(){
					$('.jsClosePop').on('click',function(){
						dg.close();
						return false;
					});
				}
			});
		});
		


//公用弹窗
	var tpcPop = function(id, content, w, h, fun) {
		var fun = fun || function() {};
		dialog({
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
			dialog({
				id: id
			}).close();
			return false;
		});
	};


	var randomNum = parseInt(Math.random()*Math.random()*100,10)%2;
	var arrObj = {
		'34': ['午睡法兰绒小毯子', randomNum ? 195 : 345,],
		'35': ['usb咖啡杯加湿器', randomNum ? 285 : 165],
		'36': ['折叠吹风机', randomNum ? 315:135],
		'37': ['抱枕',randomNum ? 75 : 255 ],
		'38': ['IPAD', 105],
		'39': ['IPHONE', 15]
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
			eventid: 11
		}, function(data) {
			switch (data['No']) {
				case -1: //未登陆
					require.async('http://res.csc86.com/js/m/sign.js',function(){
						csc.checkSign();
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
								if (_json['info[name]'] == "" || _json['info[TEL]'] == "" || _json['info[dz]'] == "" || _json['info[yb]'] == "") {
									alert("带星号的为必填项，请填写完整！");
									return false;
								}
								$.get(_form.attr('action'), _json, function(data) {
									if (data.status == true) {
										alert("提交成功！");
										dialog({
											id: 'yzjPop'
										}).close();
										tpcPop('sharePop', $('#sharePop').html(), 613, 354, function() {
											closePop($('.jsClosePop'), 'sharePop');
											var _html = $('jsShareCt').html();
											$('.jsQone').click(function() {
												window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent('华南城网囤年货活动') + '&summary=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网囤年货#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)));
											});
											$('.jsSina').click(function() {
												window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent('@华南城网：人品爆发啊~ 我在#华南城网囤年货#抽奖活动中奖啦！快来一起参与吧！' + encodeURIComponent(location.href)) + '&amp;href=' + encodeURIComponent(location.href));
											}); 
										});

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
						tpcPop('wzjPop', $('#wzjPop').html(), 613, 317, function() {
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
		eventid: 11,
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
					  <td width="40%">' + winners + '</td>\
					  <td width="60%">' + wininfo + '</td>\
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
