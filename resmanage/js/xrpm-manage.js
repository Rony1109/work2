/*by pengle*/
define(function(require, exports, module){
	var isSubmit=false;
	var xrpmMng={
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
		},
		/*查看付费关键词*/
		showFfKey:function(){
			$('.jsShowFfKeyFrm').bind('submit',function(){
				var _this=$(this),
					_keyWord=$.trim(_this.find('input[name=keyWord]').val()),
					_keyWord1=_keyWord.match(/[^\d\w\u4e00-\u9fa5]+$/g),
					_productId = $.trim(_this.find("input[name='productId']").val());
				if(_keyWord.length<1){
					xrpmMng.dialogTip("请输入关键词！");
					return false;
				}
				if(_keyWord1==_keyWord){
					xrpmMng.dialogTip("关键词不能全部为特殊字符！");
					return false;
				}
				if(_productId.length<1){
					xrpmMng.dialogTip("请输入产品ID！");
					return false;
				}
				if(isSubmit===true){
					return false;
				};
				isSubmit=true;
				$.post(_this.attr('action'),_this.serializeArray(),function(data){
					console.log(data);
					if(data.success){
						xrpmMng.dialogSuc('修改成功！',1.5,function(){
							location.href=data.url;
						});
					}else{
						xrpmMng.dialogTip(data.msg?data.msg:"修改失败！",2.5);
					}
					isSubmit=false;
				},"json");
				return false;
			});
		}
	}
	
	module.exports=xrpmMng;
});