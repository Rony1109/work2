define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	var isSubmit=false;

	//增加 和 编辑 商铺区域
	$('.jsSpqyAddFrm').on('submit',function(){
		var $this=$(this);
		var $title=$this.find('#title');
		if($title.val()==""){
			dialog.tip("带“*”为必填项！",3);
			return false;
		}
		//阻止表单重复请求
		if(isSubmit===true){return false;}
		isSubmit=true;
		$.post($this.attr('action'),$this.serializeArray(),function(data){
			var msg=data.msg;
			if(data.success==='true'){
				dialog.success(msg,2,function(){
					//location.href='http://bops.csc86.com/bops-app/bops/'+data.url;
					//location.href=location.href;
					location.href='http://bops.csc86.com/bops-app/bops/shopAreaManage?floorId='+$("#floorId").val();
				});	
			}else{
				dialog.tip(msg,2);	
			}
			//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
			isSubmit=false;
		},'json');
		return false;
	});
});