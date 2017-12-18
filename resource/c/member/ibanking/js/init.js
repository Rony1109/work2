define(function(require, exports, module) {
	
	/*活动管理 删除功能*/ 
	$('.jsDelAct').bind('click',function(){
		var _this=$(this);
		require.async('//res.csc86.com/v2/m/dialog/js/init.js',function(){
			artDialog.confirm('删除贷款申请后，将不可恢复，您确定要删除吗？',function(){
				$.post(_this.attr('href'), function(data) {
					if (data.result == 'Y') {
						artDialog.tip('删除成功！');
						location.reload();
					}
				}, "json");
			});
		});
		return false;
	});
   
   	/*删除问题*/
	$('.jsDelPrblm').bind('click',function(){
		var _this=$(this);
		require.async('//res.csc86.com/v2/m/dialog/js/init.js',function(){
			artDialog.confirm('删除问题后，将不可恢复，您确定要删除吗？',function(){
				$.post(_this.attr('href'), function(data) {
					if (data.result == 'Y') {
						artDialog.tip('删除成功！');
						location.reload();
					}
				}, "json");
			});
		});
		return false;
	}); 
	
	$(function(){
		/*问题标题超出2行时隐藏*/
		$('.b-list .prblm-t').each(function(){
			var _this=$(this),
				_h=_this.height();
			if(_h>=44){
				_this.height(44);
			}
		});
		
		/*答案相关js*/
		$('.b-list .answer p').each(function(){
			var _this=$(this),
				_h=_this.height(),
				_opt=_this.closest('.answer').find('.opt');
			if(_h>30){
				_this.height(22);
				_opt.show().html('展开<span>︾</span>');
			}
		});
		$('.b-list').delegate(".answer .opt", "click", function(){
			var _this=$(this);
			var _dtl=_this.closest('.answer').find('p');
			if(_this.hasClass('unfold')){
				_this.removeClass('unfold').html('展开<span>︾</span>');
				_dtl.height(22);
			}else{
				_this.addClass('unfold').html('收起<span>︽</span>');
				_dtl.height('auto');
			}
			return false;
		});
	});

});
