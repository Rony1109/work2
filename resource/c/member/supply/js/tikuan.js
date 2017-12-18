
define(function(require, exports, module) {
	var placeholder = require('//res.csc86.com/v2/m/jsM/placeholder');
	/*
	var dialog=require('m/dialog/js/init.js');
	require('//res.csc86.com/f=v2/c/member/supply/css/tk.css');
	*/
	$.extend({
		verify: function(obj) {
			var Reg = /^[0-9]{1,50}$/g;
			var RegA = /^(\d|([1-9]\d+))(\.\d{1,2})?$/;
			var aData = obj['Ary'];
			var $me = this;
			$.each(aData, function(index, value) {
				var $this = this,
					$val = $this['value'],
					$value = $('input[name=password]').val(),
					$value1 = $('input[name=password1]').val(),
					$name = $this['name'],
					$meVal = $this['value'],
					$len = $val.length;
				var domDiv = obj['$dom'];
				var sText = obj['tips'][$name];
				//提款金额必须浮点小数
				var blurMoney = ($name == 'money' && RegA.test($meVal) == false);
				//提款帐号必须是数字
				var blurAccount = ($name == 'account' && Reg.test($meVal) == false || $meVal <= 0);
				//提款金额必须小于等于余额
				var blurMoneyA = ($name == 'money' && Math.floor($meVal * 100) > Math.floor($('#drawMoney').text() * 100));
				//密码不能小于6位数
				var blurPassword = ($name == 'password' && ($meVal.length < 6 || $meVal.length > 16));
				//确认密码必须与设置密码一致
				var blurPasswordA = ($name == 'password1' && $value1 != $value);
				//收款人姓名长度不能超过50
				var blurName = ($name == 'accountName' && $len > 50);
				//开户行字数限制
				var blurType = ($name == 'type' && $len > 100);
				//支行信息字数限制
				var blurBranch = ($name == 'branch' && $len > 100);
				switch ($val) {
					//输入为空的验证
					case '':
						$me.tips(domDiv, sText, index);
						$.nameSpace.returnOk = false;
						break;
						//值不为空的验证
					default:
						if (blurName) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;
						} else if (blurType) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;
						} else if (blurBranch) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;
						} else if (blurMoney) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;

						} else if (blurAccount) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;

						} else if (blurMoneyA) {
							var $val = $('#drawMoney').text();
							$('input[name=money]').val($val);
							domDiv.eq(index).show();
							$.nameSpace.returnOk = false;

						} else if (blurPassword) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;

						} else if (blurPasswordA) {
							$me.tips(domDiv, sText, index);
							$.nameSpace.returnOk = false;

						} else {
							domDiv.eq(index).hide();

						}
						break;
				}
			});
		},
		nameSpace: {},
		tips: function($dom1, $text, index) {
			$dom1.eq(index).show().text($text);
		}
	});
	/*
	var dialogs=function dialogs(content,cancel,fun1,fun2,id){
				$.dialog({
											id: id||'tk',
											cancel:cancel&&null,
											title: false,
											background: '#000', 
											content: content||"",
											fixed: true,
											lock: true,
											opacity: .7,
											init: fun1||null,
											close: fun2|| null
		});
	};
	
	dialogs('<div class="tk"><img src="//res.csc86.com/v2/c/member/supply/css/img/tk.png"></div>');
	*/
	
	//更换账户
	$('#formVerify').on('submit', function() {
		$.nameSpace.returnOk = true;
		if ($.nameSpace.flgs) {
			return false;
		}
		var Ary = $(this).serializeArray();
		var tips = {
			accountName: '收款人信息不能为空，且不能超过50个字',
			account: '收款账号（阿拉伯数字），且不能超过50个字！',
			type: '请填写银行信息，且不能超过100个字！',
			branch: '请填写开户支行,且不能超过100个字！',
			password: '不同于银行卡取款密码，用于在华南城网提取货款，6-16位数字',
			password1: '确认密码为空或与提款密码不一致',
			money: '提款金额必须是大于0的数字，并不能超出账户余额！'
		}
		$.verify({
			Ary: Ary,
			$dom: $('.g-f-error'),
			tips: tips
		});
		if ($.nameSpace.returnOk == true) {
			$.nameSpace.flgs = true;
		}
		return $.nameSpace.returnOk;
	});

	$('input[name=money]').on('keyup', function() {
		var $this = $(this);
		var $val = $this.val();
		var $Ary = $val.split('\.');
		if ($Ary[1]) {
			var $len = $Ary[1].length;
			var $floot = $Ary[1].slice(0, 2);
			if ($len >= 2) {
				$this.val($Ary[0] + '.' + $floot)
			}
		}

	});

	placeholder($('input[name=branch]'), '#999');
	require('c/member/common/js/alertDialog');
	$('#affirm').on('click', function() {
		var memberId = $(this).attr('data-id');
		var sDom = '<table class="change-paseword">' +
			'<tr>' +
			'<th>请输入旧密码：</th><td><input type="password" name="oldPassword" /></td>' +
			'</tr><tr>' +
			'<th colspan="2"></th>' +
			'</tr><tr>' +
			'<th>请输入新密码：</th><td><input type="password" name="password" /></td>' +
			'</tr><tr>' +
			'<th></th><td><span class="icon-tips">请输入6位数的数字</span></td>' +
			'</tr><tr>' +
			'<th>请再次输入新密码：</th><td><input type="password" name="password1" /></td>' +
			'</tr>' +
			'</table>'
		$.cscConfirm({
			content: sDom,
			title: '修改密码',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '490px')
			},
			okFun: function() {
				var $url = '//i.csc86.com/draw/updatePassword';
				var $oldPassword = encodeURI ($('input[name=oldPassword]').val());
				var $password = encodeURI ($('input[name=password]').val());
				var $password1 = encodeURI ($('input[name=password1]').val());
				var $data = {
					oldPassword: $oldPassword,
					password: $password,
					memberId: memberId
				}
				var returnOk = true
				if ($oldPassword == '' || $oldPassword == 'undefined') {
					alert('请输入旧密码！');
					returnOk = false;
				} else if ($password == '' || $password == 'undefined') {
					alert('请输入新密码!');
					returnOk = false;
				} else if ($password1 == '' || $password1 == 'undefined') {
					alert('请再次输入新密码!');
					returnOk = false;
				} else if ($password1 != $password) {
					alert('再次输入密码与输入密码不符！');
					returnOk = false;
				} else {
					$.get($url, $data, function(data) {
						$.tip({
							content: data['msg'],
							closeTime: 1
						});
					}, 'json');
				}
				return returnOk;
			},
			cancelFun: true
		});
		return false;
	});
})