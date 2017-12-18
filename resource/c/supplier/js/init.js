/**
 * 前端模板js文件
 *
 */
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js',
		//'newtopnav': 'm/newtopnav/js/init.js',
		'newtopnav':'c2/newcgsc/js/newtop.js',/*统一用www.csc86.com页面的顶部导航*/
		'newsearch': 'm/newsearch/js/init.js',
		'backTop':'m/back-top/js/init.js'
	}
});
define(function(require, exports, module) {
	require('newtopnav');
	require('newsearch');
	require('backTop');
	$('.g-back').addCss().goBack();//返回头部
	//轮播
	require('./banner-scroll');
	var tms;
	$('.J-slide').Slide({
		onlineUp: tms,
		timer: 6000
	});
	//placeholder ie兼容
	var ph = require('m/sea-modules/placeholder');
	ph.placeholder('.placeholder', '#333');
	//选项卡
	var tabs = require("tab");
	tabs($(".tab-nav li"), $(".tab-content"), 'mouseover', 'cur');
	$('.successful-case').on('mouseover', 'li', function() {
		$(this).addClass('cur').siblings('li').removeClass('cur');
	});
	/*图片滚动*/
	require('m/img-scroll/scroll');
	var tm;
	$(".detail-registered").CscScroll({
		Left: 328,
		Right: 164,
		Time: 2000,
		linedUp: tm,
		Auto: true,
		Visual: 7
	});
	$('.detail-registered').on('mouseenter mouseleave', function(e) {
		var len = $(this).find('li').length;
		var $type = e.type;
		if (len > 7) {	
			switch ($type) {
				case 'mouseenter':
					$('.ctr-l,.ctr-r').show();
					break;
				case 'mouseleave':
					$('.ctr-l,.ctr-r').hide();
					break;
			}
		}
	});

	/*报名表单*/
	if ($('.J-join').length != 0) {
		var $activityId = $('input[name=activityId]').val();
		var $url = '//www.csc86.com/api.php?op=activity&act=show&activityId=' + $activityId
		$.get($url, function(data) {
			var $data = data
			var data = $data.data;
			if ($data.status) {
				$.each(data, function(i, v) {
					$('input[name=' + i + ']').val(v);
				})
			} else {
				if (data == -9) {
					$('.special-form-btn input').attr('type', 'reset')
				} else {
					$('.special-form-btn').find('input').attr('type', 'button')
				}
			}
		}, 'jsonp');

		$('.special-form').on('submit', 'form', function() {
			var $data = $(this).serializeArray();
			var $this = $(this);
			var returnOk = false
				//var Ary = ['企业名称不能为空！', '所属行业不能为空！', '旺铺网址不能为空！', '联系人不能为空！', '联系电话不能为空', '邮箱不能为空！', 'QQ号码不能为空！'];
			$.each($data, function(i, v) {
				var $val = v.value;
				var $name = v.name;
				if ($val == '') {
					$('input[name=' + $name + ']').css('border', '1px #ff0000 solid');
					returnOk = true;
				}
			})
			if (returnOk) {
				alert('带“*”的为必填项，不能为空！');
			} else {
				$.get('//www.csc86.com/api.php?op=activity&act=onclick', $data, function(data) {
					switch (data.data) {
						case -1:
							window.location = '//login.csc86.com/';
							break;
						case -2:
							$('input[name=register_url]').css('border', '1px #ff0000 solid');
							alert('旺铺地址输入错误！')
							break;
						case -3:
							$('input[name=register_phone]').css('border', '1px #ff0000 solid');
							alert('联系电话输入错误！')
							break;
						case -4:
							$('input[name=register_email]').css('border', '1px #ff0000 solid');
							alert('邮箱输入错误！')
							break;
						case -5:
							$('input[name=register_qq]').css('border', '1px #ff0000 solid');
							alert('QQ号码输入错误')
							break;
						case -10:
						case -9:
							alert('您已经报过名了！')
							break;
					}
					if (data.status) {
						alert('提交成功！');
						window.location.reload();
					}
				}, 'jsonp')
			}
			return false;
		}).on('focus', 'input', function() {
			$(this).removeAttr('style');
		});
		$('.special-form-btn').on('click', 'input[type=button]', function() {
			window.location = '//login.csc86.com/';
		}).on('click', 'input:reset', function() {
			alert('您已经报过名了！')
		})
	}
	/*首页圈子*/
	if ($('.circle-tallk').length != 0) {
		var parameter = 'ff6b7f51-83f6-4913-9f12-e72185cc39c4,0bf32c17-0443-41b5-a33e-2dcb2ee96aca';
		parameter = $('.circle-tallk').attr('quanid') == "undefined" ? parameter : $('.circle-tallk').attr('quanid');
		var $url = '//api.csc86.com/QuanNewsFeed/getNewFeed?number=4&quanId=' + parameter;

		$.get($url, function(data) {
			var len = data.length;
			if (len > 0) {
				var $li = '';
				var lens = len > 4 ? 4 : len;
				for (var i = 0; i < lens; i++) {
					var myData = data[i],
						userName = myData['userName'],
						objectName = myData['objectName'],
						gradeName = myData['gradeName'],
						objectId = myData['objectId'],
						userId = myData['userId'],
						gradeId = myData['gradeId'],
						gradeName = myData['gradeName'],
						url = myData['newsFeedType'] == 'CREATEACTIVITY' ?
						'//quan.csc86.com/event/detail/' :
						'//quan.csc86.com/thread/detail/';
					$li += '<li>' +
						'<a href="//quan.csc86.com/u/' + userId + '" target="_blank" title="' + userName + '">' + userName + '</a>' +
						'<span><i class="level us_l' + gradeId + '" title="' + gradeName + '"></i> ' + '刚刚发表了话题 </span> ' +
						'<b>' +
						'<a href="' + url + objectId + '.html" target="_blank" title="' + objectName + '">' +
						objectName +
						'</a></b></li>'
				}
				$('.circle-tallk').html($li);
			}
		}, 'jsonp')
	}
});