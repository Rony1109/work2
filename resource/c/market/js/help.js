/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('./init');
	var $form = $('div.help-form').find('form'),
		$list = $('div.help-list'),
		$success = $form.find('div.success'),
		showSuccess;
	$form.delegate('[name=type]', 'change', function(event) {
		var val = $(this).val(),
			$other = $form.find('[name=typevalue]');
		if(val == '5'){
			$other.prop('disabled',false).trigger('focus');
		}else{
			$other.prop('disabled',true).removeClass('error');
		}
	}).delegate('.error', 'blur', function(event) {
		var $t = $(this);
		if($.trim($t.val()).length > 0){
			$t.removeClass('error');
		}
	}).on('submit',function(){
		var q = $form.find('[name=type]:checked').val(),
			$c = $form.find('textarea'),
			c = $.trim($c.val());
		clearTimeout(showSuccess);
		$success.hide();
		if(q == '5'){
			var $q = $form.find('[name=typevalue]');
			if($.trim($q.val()).length == 0){
				$q.addClass('error').trigger('focus');
				return false;
			}else{
				$q.removeClass('error');
			}
		}
		if(c.length == 0){
			$c.addClass('error').trigger('focus');
			return false;
		}else{
			$c.removeClass('error');
		}
		$.post($form.attr('action'),$form.serializeArray(),function(data){
			if(data['status'] == false){//失败
				if(data['isContainBadWord']){
					alert('内容包含敏感词语！');
				}
				return;
			}

			$form.trigger('reset');
			$list.load('//market.csc86.com/service div.help-list>*');
			$success.show();
			showSuccess = setTimeout(function(){
				$success.fadeOut();
			},3000);
		},'jsonp');
		return false;
	});
});