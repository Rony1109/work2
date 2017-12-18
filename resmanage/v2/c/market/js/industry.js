//行业管理js
define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	var isSubmit=false;
	
	$('.jsUploadBtn').each(function(){
		var id=$(this).attr('id');
		new SWFUpload(uploadSettings({
			type:"androidPhoto",
			button_placeholder_id:id,
			file_types: "*.jpg;*.jpeg;*.png;*.gif;",
			file_size_limit : "2MB",
			file_upload_limit : 1,
			button_text_left_padding:16,
			button_text:"点击上传",
			upload_success_handler:function(file, serverData){
				var response =  eval('(' + serverData + ')');
				if(response.result != "success"){
					var msg = response.msg || "上传失败!";
					csc.useDialog(function (){
						csc.alert(msg);
					})
					return;
				} else {
					var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
					var $th=$('#SWFUpload_'+id);
					$th.siblings(".imgshow").children("img").attr("src",url);
					$th.siblings(".imglink").attr("value",response.key.replace(/\//,""));
				}
			}
		}));
	});
	
	//提交
	$('.jsIndstryFrm').on('submit',function(){
		var $this=$(this);
		
		//阻止表单重复请求
		if(isSubmit===true){return false;}
		isSubmit=true;
		$.post($this.attr('action'),$this.serializeArray(),function(data){
			var msg=data.msg;
			if(data.success==='true'){
				dialog.success(msg,2);	
			}else{
				dialog.tip(msg,2);	
			}
			//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
			isSubmit=false;
		},'json');
		
		return false;
	});
	
	
});