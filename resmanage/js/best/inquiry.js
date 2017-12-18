function goPage(f){
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='page']").val()),
		msg = '';
	if(inputpage.length == 0){
		msg = '请输入页码数！';
	}else if(/\D/.test(inputpage)){
		msg = '页码只能为正整数！'
	}else if(/^0+$/.test(inputpage)){
		msg = '页码数不能为0！';
	}else if(parseInt(inputpage) > $f.data('total')){
		msg = '输入页码数大于实际页码数！';
	}else if(parseInt(inputpage) == $f.data('index')){
		msg = '当前已经是第'+inputpage+'页！';
	}
	if(msg.length != ''){
		artDialog({
			icon:'error',
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	}else{
		$f.find("[name='page']").val(inputpage);
	}
}

$(function(){
	$('div.g-list').delegate('thead input:checkbox', 'change', function(event) {//全选事件
		change($(this).prop('checked'));
	});

	$('form[data-total]').bind('submit',function(){
		return goPage(this);
	}).delegate('a.pg-prev,a.pg-next', 'click', function(event) {

		var $t = $(this),
			$form = $t.parents('form'),
			index = $form.data('index'),
			total = $form.data('total');
		if(index == 1 && $t.is('.pg-prev')){
			artDialog({
				icon:'error',
				content: '已经是第一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		if(index == total && $t.is('.pg-next')){
			artDialog({
				icon:'error',
				content: '已经是最后一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		$form.find('input[name="page"]').val( $t.is('.pg-next') ? index + 1 : index-1);
		$form.trigger('submit');
		event.preventDefault();
	});

	autoCompleteDefaultVal($('form[data-autocomplete]'));


});