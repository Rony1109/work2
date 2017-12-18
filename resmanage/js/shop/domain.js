function batchDelete() { //批量删除
	var $checked = $('.list-id input:checked');
	if ($checked.length < 1) {
		alert('请选择域名后操作！');
		return;
	}
	var ids = [];
	$checked.each(function(i) {
		ids[i] = this.value;
	});
	del(ids);
}

function add() { //添加保留域名
	artDialog({
		title: '添加保留域名',
		lock: true,
		content: '<div class="add-domain"><form action="shopkeepdomain.save" method="post" id="J_addDomain">' +
			'<label><span>*</span>域名：</label>http://<input type="text" name="domainAddress" style="width:100px" placeholder="仅支持字母和数字" />.csc86.com<div class="g-h-10"></div>' +
			'<label><span>*</span>预留备注：</label><input type="text" name="remark" />' +
			'</form></div>',
		okVal:'添加',
		ok: function() {
			var dialog = this;
			var $form = $('#J_addDomain');
			var domain = $.trim($form.find('[name="domainAddress"]').val());
			var remark = $.trim($form.find('[name="remark"]').val());
			if (domain === '') {
				alert('域名不能为空');
				return false;
			}
			if(!/^[\da-z]+$/i.test(domain)){
				alert('域名只能为英文和数字');
				return false;
			}
			if (remark === '') {
				alert('预留备注不能为空');
				return false;
			}
			if(remark.length > 30){
				alert('预留备注在30字以内');
				return false;
			}
			$.post($form.attr('action'), $form.serializeArray(), function(data) {
				if (data > 0) {
					dialog.hide();
					artDialog('添加成功！');
					setTimeout(function() {
						location.href = location.href;
					}, 1500);
				} else {
					alert('添加失败！');
				}
			}, 'jsonp');
			return false;
		},
		cancel: true
	});
}


function del(ids) { //删除保留域名
	if (confirm('确定删除域名？')) {
		ids = $.isArray(ids) ? ids : [ids];
		$.post('shopkeepdomain.batchDelete', {
			uuid: ids
		}, function(data) {
			if (data > 0) {
				artDialog('删除成功！');
				setTimeout(function() {
					location.href = location.href;
				}, 1500);
			} else {
				artDialog('删除失败！');
			}
		}, 'jsonp');
	}

}

$(function() {
	$('div.g-list').delegate('thead input:checkbox', 'change', function(event) { //全选事件
		change($(this).prop('checked'));
	});
});