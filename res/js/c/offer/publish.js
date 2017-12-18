csc.offer = csc.offer || {};

csc.offer.delPic = function(id) {
	var $id = $(id).parent();
	$id.children("div.ibox").html('<span class="i"><img src="' + csc.url("res") + '/image/no-img.png"></span>');
	$id.children("a").remove();
	$id.children(":hidden").val("");
};
csc.offer.changeUnit = function(id) {
	var
		id = id || "select[name='units']",
		$span = $("div.range-bd td>span,span.r-p");
	$(id).on("change", function() {
		var txt = $.trim($(this).find(":selected").text());
		txt && $span.text(txt);
	}).trigger("change");
};

/*csc.offer.mustImg = function (){
	var tmp = "";
	$(".input[name^='pic']").each(function (){
		tmp += $.trim($(this).val());
	});
	return tmp.length == 0;
};*/
csc.offer.mustImg = function() {
	var tmp = "";
	$(".jsPropicLst input[type=hidden]").each(function() {
		tmp += $.trim($(this).val());
	});
	return tmp.length == 0;
};

csc.offer.showErrors = function(errors) {
	errors = errors || {};
	var custorErrors = {},
		normalErrors = {},
		systemerror = {};

	if (errors) {
		$.each(errors, function(i, v) {
			console.log(i)
			if (i.indexOf("productPropertys") == 0 || i.indexOf('productCusPropertys') == 0 || i == 'productName' || i.indexOf('brand_producer') == 0 || i == 'productNumber') {
				custorErrors[i] = v;
			} else {
				normalErrors[i] = v;
			}
			if (csc.offer.mustImg()) {
				normalErrors['pic[]'] = "请至少上传一张产品图片！";
			}
		});
	}
	custorErrors && csc.formErros(custorErrors, {
		parentClass: "g-c-f"
	});
	if (errors && errors.systemerror) {
		csc.useDialog(function() {
			csc.tip(errors.systemerror, 1.5);
		});
	};
	normalErrors && csc.formErros(normalErrors);

	var _jsCstmProAttr = $('.jsCstmProAttr');
	if (errors.productCusPropertys) {
		_jsCstmProAttr.parent().addClass('g-f-error');
		_jsCstmProAttr.parent().find('.opts').show();
		_jsCstmProAttr.parent().append('<div class="g-f-msg-box"><p class="g-f-error">产品自定义属性不得超过10个字</p></div>');
	}

	var domSelectA = $('select[name^=productPropertys]');
	var domSelectB = $('select[name=brand_producer]');

	domSelectA.each(function() {
		var $this = $(this);
		var isHasClass = $this.hasClass('aff-text-error');
		var sVal = $this.val().replace(/\|/g, '');
		if (isHasClass && sVal == '其他') {
			$this.removeClass('aff-text-error');
		}
	});

	domSelectB.each(function() {
		var $this = $(this);
		var isHasClass = $this.hasClass('aff-text-error');
		var sVal = $this.val();
		if (isHasClass && sVal == 'other') {
			$this.removeClass('aff-text-error');
		}
	});
};


$(function() {
	KindEditor.ready(function(K) {
		K.each({
			'plug-align': {
				name: '对齐方式',
				method: {
					'justifyleft': '左对齐',
					'justifycenter': '居中对齐',
					'justifyright': '右对齐'
				}
			},
			'plug-order': {
				name: '编号',
				method: {
					'insertorderedlist': '数字编号',
					'insertunorderedlist': '项目编号'
				}
			},
			'plug-indent': {
				name: '缩进',
				method: {
					'indent': '向右缩进',
					'outdent': '向左缩进'
				}
			}
		}, function(pluginName, pluginData) {
			var lang = {
				'image': '网络图片',
				'multiimage': '本地上传'
			};
			lang[pluginName] = pluginData.name;
			KindEditor.lang(lang);
			KindEditor.plugin(pluginName, function(K) {
				var self = this;
				self.clickToolbar(pluginName, function() {
					var menu = self.createMenu({
						name: pluginName,
						width: pluginData.width || 100
					});
					K.each(pluginData.method, function(i, v) {
						menu.addItem({
							title: v,
							checked: false,
							iconClass: pluginName + '-' + i,
							click: function() {
								self.exec(i).hideMenu();
							}
						});
					})
				});
			});
		});
		var editor = K.create('#content', {
			themeType: 'qq',
			allowImageUpload: false,
			items: [
				'bold', 'italic', 'underline', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'plug-align', 'plug-order', 'plug-indent', 'link', 'image', 'multiimage', 'table'
			],
			untarget: true,
			filterLink: true,
			afterChange: function() {
				var
					$content = $("#content"),
					errorMsg = "插入的图片超过了最大值10张";
				if (this.count('img') > 10) {
					csc.showFormError($content, errorMsg);
					$content.data("error", "too many images");
				} else {
					$content.removeData("error");
					if ($content.closest("div.g-f-content").find("div.g-f-msg-box").text() == errorMsg) {
						$content.closest("div.g-f-content").removeClass("g-f-error").find("div.g-f-msg-box").remove();
					}
				}
			}
		});

		//点击预览产品
		var removeError = function(obj) {
			obj.siblings('.g-f-msg-box').remove();
			obj.parents('.g-f-content').removeClass('g-f-error');
			obj.removeClass('aff-text-error');
		}
		$('input[name=reviewBtn]').bind('click', function() {
			editor.sync();
			var _form = $('form[name=categoryform]');
			var _url = window.location.href,
				_title = $('input[name=title]'),
				_getName = $('input[name=productName]'),
				_property = $('select[name^=productPropertys]'),
				_content = $('#content'),
				_units = $('select[name=units]'),
				_jsCstmProAttr = $('.jsCstmProAttr'),
				_prcNum = $('input[name^=productCustomprices]');
			$.ajax({
				url: _url,
				data: _form.serializeArray(),
				async: false,
				type: "POST",
				dataType: 'json',
				success: function(data) {
					if (data.status == "1") {
						window.open(data.url);
					} else {
						removeError(_title);
						removeError(_getName);
						removeError(_content);
						removeError($('.jsPropicLst'));
						removeError(_units);
						removeError(_property);
						removeError(_prcNum.eq(0).parents('.range-bd'));
						removeError(_jsCstmProAttr);
						csc.offer.showErrors(data.error);
					}
				}
			});
			return false;
		});

	});
	$("form[name='categoryform']").on('submit', function() {
		var $t = $(this);
		if ($t.data('url')) {//检测是否在重发或推荐列表中....
			$.get($t.data('url'), function(data) {
				if(data.status === '1'){
					$t.data('url','').find('.org-btn').trigger('click');
					return;
				}
				csc.useDialog(function() {
					csc.confirm('<span class="g-fs-14">' + data.error + '</span>', function() {
							$t.data('url','').find('.org-btn').trigger('click');
					});
				});
			}, 'json');
			return false;
		}
		if ($("#content").data("error")) { //编辑器图片过多
			$("#content").trigger("focus");
			return false;
		}
		$("input.required").trigger("blur");

	});
	seajs.use(csc.url("res", "/f=js/m/verify"), function() {
		csc.verify("input[data-verify]");
	});

	var $range = $("div.range-bd");
	csc.offer.changeUnit();
	csc.offer.showErrors(csc.offer.errors);
	$("input[name='speak']").on("change", function() {
		this.value == "N" ? $range.show() : $range.hide();
	}).filter(":checked").trigger("change");
	csc.showFormEx("[name='title']", "请输入产品标题，建议包含产品相应关键字！");

	$("select[name*='productPropertys']").each(function() {
		var $t = $(this);
		if ($t.next("input").length) {
			$t.next('input').keyup(function() {
				var val = $(this).val();
				$(this).prev('select').find("option:contains('其他')").val('其他|' + val);
			});
		}
	});
	csc.offer.otherOpt("select[name*='productPropertys']");
});

csc.offer.otherOpt = function(select) {
	var $select = $(select);
	$select.each(function() {
		var $t = $(this),
			$option = $t.find(":selected");
		if ($option.text() == '其他' && !$t.next().is(".de-txt")) {
			$t.after('<input type="text" class="de-txt text-input ctr-style" maxlength="10" />');
		}
		$t.next('input').keyup(function() {
			var val = $(this).val();
			$(this).prev('select').find("option:contains('其他')").val('其他|' + val);
		});
	});
	$select.change(function() {
		var $t = $(this),
			$option = $t.find(":selected");
		if ($option.text() == '其他') {
			$t.after('<input type="text" class="de-txt text-input ctr-style" maxlength="10" />');
		} else {
			$t.next("input").remove();
			$t.find("option:contains('其他')").val('其他');
		}
		$t.next('input').keyup(function() {
			var val = $(this).val();
			$(this).prev('select').find("option:contains('其他')").val('其他|' + val);
		});
	});
};