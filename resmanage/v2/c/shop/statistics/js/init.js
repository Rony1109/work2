define(function(require, exports, module) {
	require('WdatePicker');
	require('autocomplete')();//自动填充搜索项
	require('page').init();
	$('form[data-autocomplete]').bind('submit', function(event) {
		var pvValue = $.trim($(this).find('input[name="pv_value"]').val());
		if(pvValue.length == 0 || /^[1-9]\d*?$/.test(pvValue) || /^[1-9]\d*?-[1-9]\d*?$/.test(pvValue)){
			if(pvValue.indexOf('-')>0){
				var arr = pvValue.split('-');
				if(arr[0] >= arr[1]){
					alert('请输入正确的数字或数字区间，如12或10-100');
					return false;
				}
			}
		}else{
			alert('请输入正确的数字或数字区间，如12或10-100');
			return false;
		}
	});
});