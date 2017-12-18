define(function(require, exports, module) {
	//var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	function goPage($form, opt) {
		var page = $.trim($form.find("[name='" + opt.name + "']").val()),
			msg = '';
		if (page.length === 0) {
			msg = '请输入页码数！';
		} else if (/\D/.test(page)) {
			msg = '页码只能为正整数！'
		} else if (/^0+$/.test(page)) {
			msg = '页码数不能为0！';
		} else if (parseInt(page, 10) > $form.data('total')) {
			msg = '输入页码数大于实际页码数！';
		} else if (parseInt(page, 10) == $form.data('page')) {
			msg = '当前已经是第' + page + '页！';
		}
		if (msg !== '') {
			alert(msg);
			//dialog.tip(msg,3);	
			return false;
		}
	}
	exports.goPage = goPage;
	exports.init = function($form, opt) {
		$form = $form || $('form[data-page][data-total]');
		opt = $.extend({
			name: 'page'
		}, opt || {});
		$form.bind('submit', function() {
			return goPage($(this), opt);
		}).delegate('a.pg-prev,a.pg-next', 'click', function(event) {
			event.preventDefault();
			var $t = $(this),
				$form = $t.parents('form'),
				page = $form.data('page'),
				total = $form.data('total');
			if (page == 1 && $t.is('.pg-prev')) {
				alert('已经是第一页!');
				//dialog.tip('已经是第一页!',2);
				return;
			}
			if (page == total && $t.is('.pg-next')) {
				alert('已经是最后一页!');
				//dialog.tip('已经是最后一页!',2);
				return;
			}
			$form.find('input[name="' + opt.name + '"]').val($t.is('.pg-next') ? page + 1 : page - 1);
			$form.trigger('submit');
		});
	};
});