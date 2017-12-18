define(function(require, exports, module) {

	//价格区间
	$('.j-tab').on('click', 'label', function() {
		var $attr = $('#price-1').attr('checked');
		if ($attr == 'checked') {
			$('.price-section').show().find('input').removeAttr('disabled');
		} else {
			$('.price-section').hide().find('input').attr('disabled', 'disabled');
		}
	});
	$(function() {
		var nuits = $('select[name=units]').val();
		nuits = $('option[value=' + nuits + ']').text();
		var unitsStart = nuits + '(含)以上';
		var unitsEnd = '元/' + nuits;
		$('.g-f-content').on('change', 'select[name="units"]', function() {
			var $this = $(this);
			var $val = $this.val();
			var units = $this.find('option').eq($val).text();
			unitsStart = units + '(含)以上';
			unitsEnd = '元/' + units;
			$('.units-start').text(unitsStart);
			$('.units-end').text(unitsEnd);
			$('.units-nums').text(" " + units);
		});


		//新增区间
		//var i=$dom.find('tr').length
		$('.add-units').on('click', 'i', function() {

			var $dom = $('.price-table'),
				len = $dom.find('tr').length,
				$tr = '<tr>' +
				'<td><input type="text" name="productCustomprices[' + (len - 1) + '][minimum]"  class="price-tyle" /></td>' +
				'<td class="units-start">' + unitsStart + '</td>' +
				'<td><input type="text" name="productCustomprices[' + (len - 1) + '][price]" class="price-tyle" /></td>' +
				'<td class="units-end">' + unitsEnd + '</td>' +
				'</tr>',
				_num = (3 - len) > 0 ? 3 - len : 0;
			var sTips = '( 最多还可添加' + _num + '组 )';
			$(this).siblings('u').text(sTips)
			if (len < 4) {
				$dom.append($tr);
			} else {
				alert('最多只能添加三个区间！')
			}
		});
	});


	//新增
	require('c/member/common/js/alertDialog');

	//颜色
	$('.add-color').on('click', function() {
		var len = $('.add-color').parent().find('input').length;
		var tprNum = len > 0 ? len : 0;
		var domLi = '<li><input type="text" name="color_style[' + tprNum + ']" value="" maxlength="10"><span></span></li>';
		$(this).before(domLi);
	})

	$('.items').on('mouseenter mouseleave', 'li', function(e) {
		var $type = e.type;
		var $span = $(this).find('span');
		if ($type == 'mouseenter') {
			$span.css('display', 'block');
		} else if ($type == 'mouseleave') {
			$span.hide();
		}
	}).on('click', 'span', function() {
		var $this = $(this).parent();
		var domParents = $this.parent();
		$this.remove();
		domParents.find('input').each(function(i) {
			var myName = $(this).attr('name');
			var Reg = /^(color_style)/g;
			if (Reg.test(myName)) {
				$(this).attr('name', 'color_style[' + i + ']');
			} else {
				$(this).attr('name', 'size_property[' + i + ']');
			}

		})
	});

	//尺码
	$('.add-size').on('click', function() {
		var len = $('.add-size').parent().find('input').length;
		var tprNum = len > 0 ? len : 0;
		var domLi = '<li><input type="text" name="size_property[' + tprNum + ']" value="" maxlength="10"><span></span></li>';
		$(this).before(domLi);
	})


	//供货数量
	$('#unlimited').on('click', function() {
		var isChecked = $(this).attr('checked');
		if (isChecked == 'checked') {
			$('.suply-num').attr('disabled', 'disabled').css('background', '#ebebe4');
		} else {
			$('.suply-num').removeAttr('disabled style')
		}
	});


	//样品
	$('.simple-set').on('click', 'input', function() {
		var isChecked = $('#sample-yes').attr('checked');
		if (isChecked == 'checked') {
			$('.set-simple').show();
			$('.set-simple input').removeAttr('disabled');
		} else {
			$('.set-simple').hide();
			$('.set-simple input').attr('disabled', 'disabled ');
		}
	});
	$('.simple-set input,.j-tab input').each(function() {
		var $this = $(this);
		var $isChecked = $this.attr('checked');
		if ($isChecked == 'checked') {
			$this.trigger('click');
		}
	});

	//产品属性
	$('.add-attr i').on('click', function() {
		var len = $('.jsCstmProAttr').length;
		var i = len > 0 ? len : 0
		var Tpr = '<li class="g-c-f jsCstmProAttr">' +
			'<span class="t-t">自定义属性：</span>' +
			'<input type="text" name="productCusPropertys[' + i + '][propertyname]" class="text-input custom fc-888" value="属性" placeholder="属性" maxlength="10" />' +
			'<input type="text" name="productCusPropertys[' + i + '][property]" value="属性值" placeholder="属性值" class="text-input custom fc-888" maxlength="10" /><span class="removeParent">删除</span></li>'
		$('.attributes').append(Tpr);
	})

	$('.j-sellect').on('change', function() {
		var $val = $(this).val();
		if ($val == 'other') {
			$('.other').removeAttr('disabled').show();
		} else {
			$('.other').attr('disabled', 'disabled').hide();
		}
	});

	$('.attributes').on('focus blur', '.custom', function(e) {
		var $type = e.type,
			$this = $(this),
			$val = $this.val();
		if ($type == 'focusin' || $type == 'focus') {
			if ($val == "属性" || $val == "属性值") {
				$this.val('').removeClass('fc-888');
			}
		} else if (e.type == "focusout" || $type == 'blur') {
			if ($val == "") {
				$this.addClass('fc-888');
				$this.val($this.attr('placeholder'));
			}
		}
	}).on('click', '.removeParent', function() {
		var $this = $(this).parent();
		var domParents = $this.parent();
		$this.remove();
		domParents.find('.jsCstmProAttr').each(function(i) {
			$(this).find('input').eq(0).attr('name', 'productCusPropertys[' + i + '][propertyname]');
			$(this).find('input').eq(1).attr('name', 'productCusPropertys[' + i + '][property]');
		})

	});


	//在线交易服务
	$('#agree').on('click', function() {
		var $isCheckedSimple = $('#sample-yes').prop('checked');
		var $isCheckedPrice = $('#price-1').prop('checked');
		if ($isCheckedPrice || $isCheckedSimple) {

		} else {

			alert('“自定义价格区间”和“提供样品”至少需要选择一个才能正常开通在线交易！')
			$('#disagree').trigger('click');
		}
	});

	$('#sample-no').on('click', function() {
		var $attr = $('#price-1').attr('checked');
		if ($attr != 'checked') {
			$('#disagree').trigger('click');
		}
	});
	$('#price-2').on('click', function() {
		var $attr = $('#sample-yes').attr('checked');
		if ($attr != 'checked') {
			$('#disagree').trigger('click');
		}
	});

	//供货方式只读
	$('#transship').on('click', function() {
		return false;
	});

	//
	$('#addWtrMrk').on('click', function() {
		var isChecked = $(this).prop('checked');
		if (isChecked) {
			$.get('//member.csc86.com/ajax/watermarkCheck', function(data) {
				var oStatus = data.status;
				switch (oStatus) {
					case '-1':
						$.tip({
							content: '您尚未登录，请登录后在设置水印！',
							closeTime:1.5,
							closeCallback: function() {
								window.location.reload();
							}
						});
						break;
					case '0':
						$.tip({
							content: '您尚未设置水印，请先设置水印，才能正确的显示水印！',
							closeTime:1.5,
							closeCallback: function() {
								$('#addWtrMrk').prop('checked', false);
								window.open('//member.csc86.com/shop/watermark.html');
							}
						});
						break;
					default:
						break;


				}
			}, 'jsonp')
		} else {

		}
	})
	$('body').on('click', '.Iread', function() {
		var isTrue = $(this).prop('checked');
		if (isTrue) {
			$(this).parent().siblings('button').removeAttr('disabled');
		} else {
			$(this).parent().siblings('button').attr('disabled', 'disabled');
		}
	})
})