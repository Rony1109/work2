define(function(require, exports, module) {
	require('c/member/common/js/alertDialog');
	$('.af-list').on('click', '.revoke', function() {
		var proid = $(this).attr('data-id');
		$.get('//member.csc86.com/product/sell/UpdateTradeState?proid=' + proid, function(data) {
			var $status = data.status;
			switch ($status) {
				case 1:
					$.tip({
						content: '撤销成功！',
						closeCallback: function() {
							window.location.reload();
						},
						closeTime: 1.5
					});
					break;
				case 0:
					$.tip({
						content: '撤销失败！',
						closeCallback: function() {
							window.location.reload();
						},
						closeTime: 1.5
					});
					break;
			}
		}, 'jsonp');

	})/*优化去掉开通协议部分
	.on('click', '.open', function() {
		var $url = $(this).attr('data-href');
		var $div = '<iframe src="//res.csc86.com/v2/c/member/common/index.html" frameborder="0" width="500" height="450"></iframe>';
		$.get('//member.csc86.com/product/sell/isOpenOnLineTrade', function(data) {
			var $data = data,
				$status = data.status;
			switch ($status) {
				case -1:
				case 2:
					$.cscConfirm({
						title: '华南城网在线交易协议',
						content: $div,
						callback: function() {
							var $span = '<span style="float:left;color: #067ed4;"><input type="checkbox" class="Iread" checked />我已仔细阅读并同意以上协议</span>';
							this.DOM.buttons.css('background', '#ebebeb').addClass('g-cf').prepend($span).find('button:last').remove().end().find('button:first').css('float', 'right');
							this.DOM.content.css({
								'height': '450px',
								'padding': '0'
							})
						},
						okVal: '确认开通在线交易服务',
						okFun: function() {
							$.get('//i.csc86.com/applyOpenPay', function(data) {
								switch (data.status) {
									case '200':
										$.tip({
											content: '<b>申请提交成功！</b><br />工作人员会在5个工作日内与您联系确认！',
											closeTime:1.5,
											closeCallback: function() {
												window.location.reload();
											}
										});
										break;
									case '201':
										$.tip({
											content: data.msg + '！&nbsp;&nbsp;&nbsp;<a href="//member.csc86.com/accreditation/Accreditation.html" target="_blank">立即认证</a>'
										});
									default:
										$.tip({
											content: data.msg,
											closeTime:1.5
										});
								}
							}, 'jsonp');
						}
					})
					break;
				case 0:
					$.tip({
						content: '您的在线交易开通申请正在审核中，请审核通过后再试！',
						closeTime: 1.5
					})
					break;
				case 1:
					window.location = '//member.csc86.com' + $url;
					break;
				case 3:
					$.tip({
						content: '请求失败，请重试！',
						closeTime: 1.5
					})
					break;
			}
		}, 'jsonp');
	});*/
	$('body').on('click', '.Iread', function() {
		var isTrue = $(this).prop('checked');
		if (isTrue) {
			$(this).parent().siblings('button').removeAttr('disabled');
		} else {
			$(this).parent().siblings('button').attr('disabled', 'disabled');
		}
	})
})