//旺铺联系方式表单
csc.FormVerify = function(form, btn) {
	var
		form = $(form),
		btn = form.find('.btn'),
		verify = form.find('input.verify');
	form.on('submit', function() {
		$.each(verify, function() {
			var
				$t = $(this),
				$val = $.trim($t.val()),
				$placeholder = $t.attr("placeholder");
			if ($val === '' || $val === $placeholder) {
				$t.trigger('blur').trigger('focus').val('');
				return false;
			};
		});
	});
};

function showDomainMsg(msg, eleClass) {
	var
		$domain = $(".domain-t"),
		tmp = '<div class="g-f-msg-box"><p class="' + eleClass + '">' + msg + '</p></div>';
	$domain.parents(".aff-value").find(".g-f-msg-box").remove();
	$domain.parents(".aff-value").addClass(eleClass).append(tmp);
}

var _ajaxRet;

function checkDomain() {
	var $domain = $(".domain-t"),
		oldDomain = $domain.data("domain"),
		domain = $.trim($domain.val()),
		LPattern = /^.{6,20}$/,
		TPattern = /^[a-zA-Z0-9]+$/;
	if (domain !== oldDomain) {
		if (!LPattern.test(domain)) {
			showDomainMsg("域名限定在6-20个字", "g-f-error");
			return false;
		} else if (!TPattern.test(domain)) {
			showDomainMsg("域名不能出现特殊字符，请使用字母或数字", "g-f-error");
			return false;
		} else {
			$.ajax({
				async: false,
				type: "post",
				url: csc.url("api", "/member/checkdomain.html"),
				dataType: "jsonp",
				data: {
					"domain": domain
				},
				success: function(data) {
					if (data.status) {
						showDomainMsg("该域名已被占用，请重新选择域名！", "g-f-error");
						_ajaxRet = false;
					} else {
						showDomainMsg("该个性域名可以使用", "g-f-success");
						_ajaxRet = true;
					}
				},
				complete: function() {}
			});
			if (!_ajaxRet) {
				return false;
			} else {
				return true;
			}
		}
	} else {
		showDomainMsg("该个性域名可以使用", "g-f-success");
	}
}

function tranMsg(msg, style) {
	style = style || 'tran-msg-error';
	var $form = $('div.tran-form'),
		$company = $form.find('dt.g-d-n,dd.g-d-n');
	$form.find('span.tran-msg').html('<span class="' + style + '">' + msg + '</span>');
	style == 'tran-msg-error' ? $company.hide() : $company.show();
}

function tranDomain() { //转让域名
	try {
		tranDialog.close();
	} catch (err) {}
	tranDialog = artDialog({
		title: '您在申请域名转让，请输入：',
		width: 560,
		content: '<form action="//api.csc86.com/shop/addTransfer.html" method="get" class="J_tran">' +
			'<div class="tran-form">' +
			'<dl><dt class="g-f-l g-t-r">转让会员账号：</dt><dd><input type="text" name="account" class="aff-text"/><span class="tran-msg"></span></dd><dt class="g-f-l g-t-r g-d-n">请核对公司名称：</dt><dd class="g-fw-b g-d-n"></dd><dt class="g-f-l g-t-r"></dt><dd><a href="javascript:" class="long-btn J_submit"><span>确定</span></a><a href="javascript:void(tranDialog.close())" class="long-btn long-btn-cancel"><span>取消</span></a></dd></dl>' +
			'</div>' +
			'</form>',
		init: function() {
			$(document).data('tranDomain') || $(document).delegate('a.J_submit', 'click', function(event) {
				$(this).parents('form').trigger('submit');
			}).delegate('form.J_tran', 'submit', function(event) {
				var $f = $(this),
					account = $.trim($f.find('input').val());
				if (account == '') {
					tranMsg('会员账号不能为空！');
					return false;
				}
				$.get($f.attr('action'), $f.serializeArray(), function(data) {
					if (data['status']) {
						tranDialog.close();
						csc.success('域名转让申请提交成功,客服人员将在48h内审核您的申请,请耐心等候.');
						$('div.shopdomain').load(location.href + ' div.shopdomain>ul');
					} else {
						tranMsg(data['msg']);
					}
				}, 'jsonp');
				return false;
			}).delegate('form.J_tran input', 'blur', function(event) {
				var $t = $(this),
					account = $.trim($t.val());
				if (account == '') {
					tranMsg('会员账号不能为空！');
					return false;
				}
				$.get('//api.csc86.com/shop/checkaccount.html', {
					account: account
				}, function(data) {
					if (data['status']) {
						tranMsg('', 'tran-msg-success');
						$('form.J_tran').find('dd.g-d-n').html(data['data']['company']);
					} else {
						tranMsg(data['msg']);
					}
				}, 'jsonp');
			}).data('tranDomain', true);
		}
	});
}

$(function() {
	$("#domain").on("submit", function() {
		return checkDomain();
	});

	$(".domain-t").on("blur", function() {
		return checkDomain();
	});

	//旺铺证书荣誉表单
	$('.cert-btn').on('click', function() {
		var
			$t = $(this),
			$bt = $('input[name="beginTime"]'),
			$et = $('input[name="endTime"]'),
			$bn = $('input[name="bookName"]'),
			$url = $('input[name="bookUrl"]'),
			bTime = new Date(($bt.val()).replace(/-/g, "/")),
			eTime = new Date(($et.val()).replace(/-/g, "/"));
		if ($.trim($bn.val()) === '') {
			$bn.focus();
			return false;
		} else if ($.trim($bt.val()) === '') {
			$bt.blur();
			return false;
		} else if ($.trim($url.val()) === '') {
			$url.blur();
			return false;
		};
		if (bTime > eTime) {
			csc.tip("证书截止日期不正确");
			return false;
		}
	});

	//旺铺联系方式提交提示
	(function() {
		var tipVal = $("#tipsbox").val();
		csc.useDialog(function() {
			switch (tipVal) {
				case 'true':
					if ($.trim($('#referer').val()).length > 0) {
						csc.success("您提交的资料正在审核中，请耐心等待。审核通过前，您无法查看最新的企业资料。", 3);
					} else {
						csc.success("提交成功", 3);
					}
					break;
				case 'false':
					csc.alert("提交失败");
					break;
			}
		});
	})();

	$(".comp-info").delegate(".aff-submit", "click", function() {
		var
			$t = $(this);
		$t.addClass("aff-cancel").find("input").attr("disabled", "disabled");
		$(".comp-info form").trigger("submit");
	});

});