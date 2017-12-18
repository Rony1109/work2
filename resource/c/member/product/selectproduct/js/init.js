define(function(require, exports, module) {
	var dialog = require('/v2/m/dialog/js/init.js');
	var $body = $('body');

	var $tip = $body.find('p.tip');
	var limitNumber = parent.limitRepublish || 12;
	var $select = $('.jsHvSltProLst');

	var $productIds = $('input[name="productIds"]');

	function updateCount() { //更新已选择信息
		var $li = $select.find('li');
		var selectNumber = $li.length;
		$tip.find('.total-num').text(selectNumber);
		var arr = [];
		if (selectNumber > 0) {
			$li.each(function() {
				arr.push($(this).data('pid'));
			});
			$productIds.val(arr);
		} else {
			$productIds.val('');
		}
	}

	function param(k, v, url) { //url参数处理
		var url = url || location.search.substr(1),
			urls = url.split("&"),
			pars = {},
			u;
		for (var i in urls) {
			var arr = urls[i].split("=");
			arr[0] == k && v !== u && (arr[1] = v);
			arr[1] !== u && arr[1] !== null && (pars[arr[0]] = decodeURIComponent(arr[1]));
		}
		pars[k] === u && v !== u && v !== null && (pars[k] = v);
		return v !== u ? $.param(pars) : (pars[k] || "");
	}

	$body.on('click', '.jsCnclBtn', function closeParentDialog() { //取消关闭弹窗
		parent.selectDialog.close();
	}).on('click', '.jsSltPro', function selectProduct() { //单个产品选择
		var $t = $(this);
		var $li = $t.parents('li');
		var selectNumber = parseInt($tip.find('.total-num').text(), 10);
		if (selectNumber < limitNumber) {
			$li.clone().find('a.gray-xbtn').remove().end().appendTo($select);
			$t.after('<span class="have-slt">已选择</span>');
			$t.remove();
			updateCount();
		} else {
			dialog.alert('最多可以选择' + limitNumber + '个产品，不能再选择！');
		}
		return false;
	}).on('click', '.Spage li a', function() {
		var _this = $(this),
			_href = _this.attr('href').split('?'),
			productIds = encodeURIComponent($productIds.val());
		location.href = _href[0] + '?' + param('productIds', productIds, _href[1]);
		return false;
	}).on('mouseenter', '.jsHvSltProLst li', function() {
		var $t = $(this);
		var index = $t.index();
		var isFirst = index === 0 ? ' no-move-up' : '';
		var isLast = index === $t.parent().find('li').length - 1 ? ' no-move-down' : '';
		$t.addClass('hover').append('<div class="sltpro-opts" href="javascript:">\
                	<a class="move-up jsMoveUp' + isFirst + '" href="javascript:"></a>\
                    <a class="move-down jsMoveDown' + isLast + '" href="javascript:"></a>\
                    <a class="del-opt jsDelOpt" href="javascript:"></a>\
                </div>');
	}).on('mouseleave', '.jsHvSltProLst li', function() {
		var $t = $(this);
		$t.removeClass('hover').find('.sltpro-opts').remove();
	}).on('click', '.jsDelOpt', function() { //删除
		var $li = $(this).parents('li');
		var $slt = $body.find('.jsSltProLst li[data-pid="' + $li.data('pid') + '"] .have-slt');
		$slt.after('<a class="gray-xbtn jsSltPro" href="javascript:">选择</a>');
		$slt.remove();
		$li.remove();
		updateCount();
	}).on('click', '.jsMoveUp', function() { //上移
		var $t = $(this);
		var $li = $t.parents('li');
		if ($t.is('.no-move-up')) return false;
		$li.trigger('mouseleave').insertBefore($li.prev());
		updateCount();
	}).on('click', '.jsMoveDown', function() { //下移
		var $t = $(this);
		var $li = $t.parents('li');
		if ($t.is('.no-move-down')) return false;
		$li.trigger('mouseleave').insertAfter($li.next());
		updateCount();
	}).on('click', '.jsOkBtn', function() {
		var $t = $(this);
		if ($t.data('loading')) return;
		$t.data('loading', true);
		$.post($t.data('url'), {
			productIds: $productIds.val()
		}, function(data) {
			if (data.status === '1') {
				parent.$wrap.find('tbody').html(data.product);
				parent.$wrap.find('.item-ft a[style]').removeAttr('style');
				$t.next().trigger('click');
			} else {
				dialog.alert(data.status === '0' ? '请至少选择一个产品！' : '操作失败，请稍后重试！');
			}
			$t.removeData('loading');
		}, 'jsonp');
	});

	window.$PHP_pageto_submit = function() { //重写翻页提交
		var page = $('.Spage .pageNo').val();
		if (!/\d/.test(page)) return false;
		location.href = location.pathname + '?' + param('page', page, param('productIds', encodeURIComponent($productIds.val())));
		return false;
	};
});