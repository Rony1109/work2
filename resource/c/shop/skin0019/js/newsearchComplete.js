define(function(require, exports, module) {
	require('//res.csc86.com/v2/c2/newcgsc/css/newsearch-complete.css')
	$.fn.extend({
		Temporary: {},
		SearchComplete: function() {
			var url = null;
			var me = this;
			var $me = null;
			var index = 0;
			var options = $.extend({
				top: '36px',
				left: '0px',
				width: '400px',
				tirggerDom: '#searchbtn'
			}, arguments[0]);
			$(this).on('focus  keyup blur', 'input[name=q]', function(e) {
				$me = $(this);
				var e = window.event || e;
				var $parent = $me.parent()
				var placeholder = $(this).attr('placeholder');
				var $val = $(this).val();
				if (e.type == 'focus' || e.type == 'focusin') {
					$parent.addClass('g-pr');
					if (placeholder == '请输入产品名称') {
						url = '//search.csc86.com/product/suggest'
					} else if (placeholder == '请输入公司名称') {
						url = '//search.csc86.com/company/suggest'
					}
					var isHasDiv = $parent.find('.search-slide').length;
					if (isHasDiv == 0) {
						$parent.append('<div class="search-slide newslide" style="top:' + options.top + ';left:' + options.left + ';width:' + options.width + '"><ul></ul></div>');
					}
					if ($val.length <= 10) {
						if (placeholder == '请输入产品名称') {
							me._condition(url, $val, $me, true);
						} else if (placeholder == '请输入公司名称') {
							me._condition(url, $val, $me, false);
						}
					}
				} else if (e.type == 'blur' || e.type == "focusout") {
					setTimeout(function() {
						$me.siblings('.search-slide').hide().find('li').remove();
						$('.zjss').data("show",1);
					}, 300)
				} else if (e.type == 'keyup') {
					var $dom = $(this)
					var $val = $(this).val();
					switch (e.keyCode) {
						case 40:
							var $Li = $('.search-slide ul li');
							var len = $Li.length;
							$Li.eq(index).css('background', '#f7f7f7').siblings('li').css('background', '');
							$me.val($Li.eq(index).text());
							index++;
							if (index == len) {
								index = 0
							}
							break;
						case 38:
							var $Li = $('.search-slide ul li');
							var len = $Li.length;
							$Li.eq(index).css('background', '#f7f7f7').siblings('li').css('background', '');
							$me.val($Li.eq(index).text());
							index--;
							if (index == -1) {
								index = len - 1;
							}
							break;
						default:
							if ($val.length <= 10) {
								if (placeholder == '请输入产品名称') {
									me._condition(url, $val, $me, true);
								} else if (placeholder == '请输入公司名称') {
									me._condition(url, $val, $me, false);
								}
							}
							break;

					}
				}
			}).parent().on('mouseover click', '.search-slide li', function(e) {
				var $this = $(this)
				var me = this;
				if (e.type == 'mouseover') {
					index = $me.parent().find('.search-slide').find('li').index(this);
					$this.css('background', "#f7f7f7").siblings('li').css('background', '')
				} else if (e.type == 'click') {
					$me.val($this.text());
					$('.search-slide ul li').remove();
					$(options.tirggerDom).trigger('click');
				}
			});
		},
		_condition: function(url, $val, $dom, flag) {
			var me = this;
			if ($val != '' && $val != 'undefined') {
				me._ajaxGet(url, {
					'q': $val
				}, $dom, flag);
			} else {
				$('.search-slide ul li').remove();
			}
		},
		_ajaxGet: function(url, data, $dom, flag) {
			var me = this;
			var _val = null;
			var $val = $dom.val();
			if (flag) {
				_val = $dom.val();
			} else {
				_val = 'company' + $val;
			}
			var tpr = me.Temporary[_val];
			if (tpr) {
				me._render($val, tpr, $dom);
				return;
			}
			$.ajax({
				url: url,
				dataType: 'jsonp',
				data: data
			}).done(function(data) {
				me.Temporary[_val] = data;
				me._render($val, data, $dom);
			});
		},
		_render: function(_val, data, $dom) {
			if (data.length > 0) {
				$('.search-slide').show();
				$('.zjss').data("show",0);
				$('.zjss').hide();
				var sDom = '';
				$.each(data, function(i, value) {
					var data = value.replace(eval('/^' + _val + '/'), '');
					var sText = _val + '' + data;
					sDom += '<li title="' + sText + '">' + _val + '<b>' + data + '</b></li>';
				});
				$dom.siblings('.search-slide').find('ul').html(sDom);
			} else {
				$dom.siblings('.search-slide').hide();
			}
		}
	});
})