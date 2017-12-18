define(function(require, exports, module) {
	var addFfKeyMe={
	   dialogTip:function(msg, closeTime, callback){
		  artDialog({
			  id: 'xrpmTip',
			  content: msg || '提示信息',
			  fixed: true,
			  lock:true,
			  opacity: .1,
			  icon: 'csc-tip',
			  time: closeTime || 1.5,
			  close: callback || null
		  });
	  },
	  dialogSuc:function(msg, closeTime, callback){
		  artDialog({
			  id: 'xrpmSuc',
			  content: msg || '成功提示',
			  fixed: true,
			  lock:true,
			  opacity: .1,
			  icon: 'succeed',
			  time: closeTime || 1.5,
			  close: callback || null
		  });
	  }
	};
	
	var $form = $('.add-form form');
	var keys = {
		allCount: '付费关键词名额',
		charge: '价格',
		months: '有效期'
	};
	
	$form.bind('submit', function() {
		var arr = $form.serializeArray();
		var error = '';
		var key = '';
		var val = '';
		for (var i = 0; i < arr.length; i++) {
			key = arr[i]['name'];
			val = arr[i]['value'];
			if (key in keys) {
				if (val == '') {
					error = keys[key] + '不能为空';
					break;
				}
				if (key != 'charge' && /^[1-9](\d+)?$/.test(val) == false) {
					error = keys[key] + '只能为大于0的整数';
					break;
				}
				if (key == 'charge' && /^\d+(\.\d{1,2})?$/.test(val) == false) {
					error = keys[key] + '只能为数字且小数点后数字不能多于两位';
					break;
				}
			}
		}
		if (error != '') {
			addFfKeyMe.dialogTip(error,200.5);
			return false;
		}
		$form.find('button').prop('disabled', true);
		$.post($form.attr('action'), arr, function(data) {
			$form.find('button').removeProp('disabled');
			if (data['success'] == true) {
				addFfKeyMe.dialogSuc(data['msg'] || '添加成功',2,function(){
					location.href = data['url'];
				});
			} else {
				addFfKeyMe.dialogTip(data['msg'] || '添加失败，请稍后重试',2.5);
			}
		}, 'jsonp');
		return false;
	});
	
	$('.place-list').delegate('td a[href*="deletePayWordCount"]', 'click', function(event) {
		event.preventDefault();
		$.get($(this).attr('href'), function(data) {
			if (data['success'] == true) {
				addFfKeyMe.dialogSuc(data['msg'] || '删除成功',2,function(){
					location.href = data['url'];
				});
			} else {
				addFfKeyMe.dialogTip(data['msg'] || '删除失败，请稍后重试',2.5);
			}
		}, 'jsonp');
	
	});
});