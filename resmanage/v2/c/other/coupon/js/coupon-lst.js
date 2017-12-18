/*优惠券历史记录、优惠券明细、优惠券详情页 js*/
define(function(require, exports, module){
	require('http://resmanage.csc86.com/v2/m/page.js').init();//分页
	
	//历史记录页面搜索处选择券号和名称的下拉列表，其右侧的文本框的placeholder属性值跟着变化
	$('#cpnNn').on('change',function(){
		var $this=$(this),
			$cpnNum1=$('#cpnNum1'),
			val=$this.val(),
			txt='';
		if(val==='couponId'){
			txt='请输入券ID';
		}else{
			txt='请输入券名称';
		}
		$cpnNum1.attr('placeholder',txt);
	});
	
	
	//导出
	$('.jsChckOut').on('click',function(){
		var $this=$(this),
			url=$this.data('url');
		window.location.href=url;
	});
	
});