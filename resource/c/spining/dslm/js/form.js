define(function(require, exports, module) {
	//对话框
	require('m/dialog/js/init');

	//企业成员对话框
	$('.J-one').on('click', function() {
		var b = artDialog({
			lock: true,
			id: 'cscAlert',
			padding: '0 0 35px',
			content: $('#enterprise').html(),
			title: '电商联盟报名表 - 企业成员'
		}).show();
		$('.companyErro,.nameErro,.telErro,.emailErro').text('');
		textareaTxt();
		focusProving();
		$('.cancel').off().on('click', function() {
			b.hide();
		});
		$('.myform').off().on('submit', function(e) {
			var $this = $(this);
			proving($this.serialize(), b, 18, true);
			return false;
		});
		return false;
	});
	//个人成员对话框
	$('.J-two').on('click', function() {
		var a = artDialog({
			lock: true,
			padding: '0 0 35px',
			id: 'cscAlert1',
			content: $('#individual').html(),
			title: '电商联盟报名表 - 个人成员'
		}).show();

		focusProving()
		textareaTxt();
		$('.companyErro,.nameErro,.telErro,.emailErro').text('');
		$('.cancel').off().on('click', function() {
			a.hide();
		});
		$('.myform').off().on('submit', function() {
			var $this = $(this);
			proving($this.serialize(), a, 17);
			return false;
		});
		return false;
	});
	//textarea 文字限制
	function textareaTxt() {
		$(".myform textarea").attr("maxlength", "250")
			.off()
			.on("keyup", function(e) {
				if (e.type == "keyup") {
					var _val = $(this).val();
					if ($(this).length > 250) {
						e.returnValue = false;
					}
				}
				/*else if (e.type == "focusin"||e.type =='focus') {
					if ($.trim($(this).html()) == "请您填写留言") {
						$(this).text('').val('').addClass('fc-444');
					}
				} else if (e.type == "focusout"||e.type =='blur') {
					if ($.trim($(this).val()).length == 0) {
						$(this).text('请您填写留言').val('请您填写留言').removeClass('fc-444').show();
					}
				}*/
			});
	}

	function focusProving() {
		var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
		var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		$('.company,.name,.tel,.email').off().on('focus blur', function(e) {
			var me = this;
			if (e.type == 'focus') {
				switch (me.className) {
					case 'company':
						$('.companyErro').text('');
						break;
					case 'name':
						$('.nameErro').text('');
						break;
					case 'tel':
						$('.telErro').text('');
						break;
					case 'email':
						$('.emailErro').text('');
						break
				}
			} else if (e.type == 'blur') {
				switch (me.className) {
					case 'company':
						if ($('.company').val() == '') {
							$('.companyErro').text('请填写您的公司名称');
						}
						break;
					case 'name':
						if ($('.name').val() == '') {
							$('.nameErro').text('请填写您的真实姓名');
						}
						break;
					case 'tel':
						if (reg.test($('.tel').val()) == false) {
							$('.telErro').text('请填写您的联系方式');
						}
						break;
					case 'email':
						if (regEmail.test($('.email').val()) == false) {
							$('.emailErro').text('请填写您的邮箱');
						}
						break
				}
			}
		});
	}
	//表单验证
	function proving(parameters, obj, id, Flag) {
		var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
		var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var flag = true;
		if (Flag === true) {
			if ($('.company').val() == '') {
				$('.companyErro').text('请填写您的公司名称');
				flag = false;
			}
		}
		if ($('.name').val() == '') {
			$('.nameErro').text('请填写您的真实姓名');
			flag = false;
		}
		if (reg.test($('.tel').val()) == false) {
			$('.telErro').text('请填写您的联系方式');
			flag = false;
		}
		if (regEmail.test($('.email').val()) == false) {
			$('.emailErro').text('请填写您的邮箱');
			flag = false;
		}
		if (flag == false) {
			return;
		}
		var Url = id == 20 ?
			'/index.php?m=formguide&c=index&a=show&formid=20&action=js&siteid=1&ajax=1&' :
			'/index.php?m=formguide&c=index&a=show&formid=21&action=js&siteid=1&ajax=1&';

		$.get(Url + parameters, function(data) {
			if (data.stutas == true) {
				obj.hide();
				$('form').each(function(){
					this.reset();
				})
				alert('申请成功！');
			} else {
				alert('申请失败！')
			}
		}, 'jsonp');
	}
})