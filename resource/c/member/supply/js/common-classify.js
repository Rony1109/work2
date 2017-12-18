define(function(require, exports, module) {
	$('.cmmn-clssfy-lst').delegate("input[name=category]", "change", function(){
		var _this=$(this);
		var _html=_this.siblings('label').html();
		var _youSlt=$('.you-select');
		_this.parent().addClass('cur').siblings().removeClass('cur');
		_youSlt.html('您当前选择的类目是：<strong>'+_html+'</strong>');
		$('input[name=categoryPath]').val(_html);
	});
	$('select[name=lableId]').change(function(){
		var _txt=$.trim($(this).find('option:checked').text());
		$('input[name=lableName]').val(_txt);
	});
});