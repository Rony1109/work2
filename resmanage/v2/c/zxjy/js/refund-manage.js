define(function(require, exports, module) {
	require('./init');
	var csc = {};
	var token=$('input[name="refundToken"]').val();
	console.log(token);

	var $ajaxPost = function(url, parameter) { //成功或失败提示
		$.post(url, parameter, function(data) {
			if (data > 0) {
				artDialog.success({
					msg: '操作成功！',
					callback: function() {
						window.location.reload();
					}
				});
			} else {
				artDialog.tip({
					msg: '操作失败！'
				});
			}
		}, 'jsonp');
	}
	var $confirm = function(type) { //去热退款数据交互
		var Ary = [],
			flag = false;
		switch (type) {
			case 0:
				$.each(csc.Tpr, function(i, v) {
					var $val = v.split('-')[1],
						$val_A = v.split('-')[0];
					csc.Tpr[i] = $val_A;
					switch ($val) {
						case '1':
							Ary.push(true);
							break;
						case '2':
						case '3':
							Ary.push(false);
							break;
					}
				});
				for (var i in Ary) {
					if (Ary[i] === false) {
						artDialog.tip({
							title: '提示',
							msg: '有不可操作的选项！'
						});
						return false;
					}
				}
				artDialog.confirm({
					title: '确认退款',
					msg: '请确认此单可退款后再操作！',
					okFun: function() {
						var url = 'http://bops.csc86.com/bops-app/bops/sz.b2brefundConfirm';
						$ajaxPost(url, {
							"id": csc.Tpr,"refundToken":token});
						csc.Tpr = [];
					},
					lock: true
				})
				break;
			case 1:
				$.each(csc.Tpr, function(i, v) {
					var $val = v.split('-')[1],
						$val_A = v.split('-')[0];
					csc.Tpr[i] = $val_A;
					switch ($val) {
						case '1':
						case '3':
							Ary.push(false);
							break;
						case '2':
							Ary.push(true);
							break;
					}
				});
				for (var i in Ary) {
					if (Ary[i] === false) {
						artDialog.tip({
							title: '提示',
							msg: '有不可操作的选项！'
						});
						return false;
					}
				}
				artDialog.confirm({
					title: '退款成功确认',
					msg: '请确认已成功退款后再操作！',
					okFun: function() {
						var url = 'http://bops.csc86.com/bops-app/bops/sz.b2brefundSuccess';
						$ajaxPost(url, {
							"id": csc.Tpr,"refundToken":token});
						csc.Tpr = [];
					},
					lock: true
				});
				break;
		}
	}
	$('.operation-l').on('click', 'input', function() { //批量操作
		var index = $('.operation-l').find('input').index(this),
			parameter = null,
			gather = null,
			$checked = $('.list-id', 'tbody').find('input:checked'),
			len = $checked.length;
		csc.Tpr = [];
		if (len > 0) {
			$checked.each(function(i, v) {
				var $val = $(this).val();
				csc.Tpr[i] = $val
			});
			$confirm(index);

		} else {
			artDialog.tip({
				title: '提示',
				msg: '请选择你要操作的项!'
			});
		}
	});
	$('.s_refund_ok').on('click', function() { //确认退款成功
		var $val = $(this).parents('tr').find('input:[name=chkbox]').val();
		csc.Tpr = [$val];
		$confirm(1)
	})
	$('.s_refund').on('click', function() { //确认退款
		var $val = $(this).parents('tr').find('input:[name=chkbox]').val();
		csc.Tpr = [$val];
		$confirm(0)
	})
	$('#checkall').on('click', function() { //全选
		var isChecked = $(this).prop('checked');
		if (isChecked) {
			$('.list-id', 'tbody').find('input').prop('checked', true);
		} else {
			$('.list-id', 'tbody').find('input').prop('checked', false);
		}
	})
})