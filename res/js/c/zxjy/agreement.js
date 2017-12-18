var csc = csc || {};
csc.confirms = function(obj) {
	artDialog({
		id: 'cscConfirm',
		content: obj['content'],
		fixed: true,
		lock: true,
		opacity: 0.20,
		title: obj['title'],
		okVal: obj['okVal'],
		cancelVal: obj['cancelVal'],
		ok: obj['okFun'],
		cancel: obj['cancelFun'] || true,
		init: obj['callback'] || function() {
			$(this.DOM.title[0]).css('min-width', '380px')
		}

	});
}
csc.Mytips = function(obj) {
	artDialog({
		id: 'cscTip',
		content: obj['content'],
		fixed: true,
		title: false,
		icon: 'mem-w',
		lock: true,
		padding: obj['padding'] || '20px 25px',
		opacity: 0.20,
		time: obj['closeTime'] || false,
		close: obj['closeCallback'] || function() {},
		init: obj['callback'] || function() {}
	});
}
csc.onDialog = function() {
	var $this = this;
	var $div = '<iframe src="//res.csc86.com/v2/c/member/common/index.html" frameborder="0" width="500" height="450"></iframe>';
	var msg = '协议';
	csc.useDialog(function() {
		$this.confirms({
			title: '华南城网在线交易协议',
			content: $div,
			okVal: '确认开通在线交易服务',
			callback: function() {
				var $span = '<span style="float:left;color: #067ed4;"><input type="checkbox" class="Iread" checked />我已仔细阅读并同意以上协议</span>';
				this.DOM.buttons.css('background', '#ebebeb').addClass('g-cf').prepend($span).find('button:last').remove().end().find('button:first').css('float','right');
				this.DOM.content.css({
					'height': '450px',
					'padding': '0'
				});
			},
			okFun: function() {
				$.get('//i.csc86.com/applyOpenPay', function(data) {

					if (data.status == 200) {
						$('.online-trading').remove();
						$this.Mytips({
							content: '<b>申请提交成功！</b><br />工作人员会在5个工作日内与您联系确认！',
							closeTime: 2

						})
					} else if (data.status == 201) {
						$this.Mytips({
							content: data.msg + '！&nbsp;&nbsp;<a href="//member.csc86.com/accreditation/Accreditation.html" target="_blank">立即认证</a>'
						});
					} else {
						$this.Mytips({
							content: data.msg,
							closeTime: 2
						})
					}
				}, 'jsonp')
			},
			cancelFun: false
		});
	});
	return false;
}
csc.onDialogA = function(id, domThis) {
	var $this = this;
	var msg = '协议';
	var $div = '<iframe src="//res.csc86.com/v2/c/member/common/index.html" frameborder="0" width="500" height="450"></iframe>';
	csc.useDialog(function() {
		$this.confirms({
			title: '华南城网在线交易协议',
			content: $div,
			okVal: '确认开通在线交易服务',
			callback: function() {
				var $span = '<span style="float:left;color: #067ed4;"><input type="checkbox" class="Iread" checked />我已仔细阅读并同意以上协议</span>';
				this.DOM.buttons.css('background', '#ebebeb').addClass('g-cf').prepend($span).find('button:last').remove().end().find('button:first').css('float','right');
				this.DOM.content.css({
					'height': '450px',
					'padding': '0'
				})
			},
			okFun: function() {
				$.get('//i.csc86.com/applyOpenPay', function(data) {
					if (data.status == 200) {
						$('.online-trading').remove();
						$this.Mytips({
							content: '<b>申请提交成功！</b><br />工作人员会在5个工作日内与您联系确认！',
							closeTime: 2,
							closeCallback: function() {
								window.location.reload();
							}
						});

					} else if (data.status == 201) {
						$this.Mytips({
							content: data.msg + '！&nbsp;&nbsp;<a href="//member.csc86.com/accreditation/Accreditation.html" target="_blank">立即认证</a>',
							closeCallback: function() {
								window.location.reload();
							},
							closeTime: 2
						});
					} else {
						$this.Mytips({
							content: data.msg,
							closeTime: 2,
							closeCallback: function() {
								window.location.reload();
							}

						})
					}
				}, 'jsonp')
			},
			cancelFun: false
		});
	});
	return false;
}
$(function() {
	var domDl = $('#e0580aaf-8042-11e4-af14-001e679d01f9');
	var sText = domDl.find('.use').text();
	if (sText == '已使用') {
		domDl.find('a').attr('onclick', 'javascript:;');
	}
	$('body').on('click', '.Iread', function() {
		var isTrue = $(this).prop('checked');
		if (isTrue) {
			$(this).parent().siblings('button').removeAttr('disabled');
		} else {
			$(this).parent().siblings('button').attr('disabled', 'disabled');
		}
	})
})