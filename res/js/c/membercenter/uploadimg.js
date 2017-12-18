csc.uploadImg=csc.uploadImg||{};
function fileQueueError(file, errorCode, message) {
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		alert("您选择上传的文件找不到，请重新选择图片上传！");
		break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		alert("您选择的图片大小超过最大限制，请处理后上传！");
		break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		alert("您的图片格式有误，允许的文件格式为:jpg、jpeg、png、gif");
		break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		alert("您一次选择的图片太多，请重新选择图片上传！");
		break;
		default:
		alert("您选择的图片错误，请重新选择图片上传！");
	}
}

	var swfu,uploadObj={};
	uploadObj.uploadSuccess=function(file,serverData){
		var response =  eval('(' + serverData + ')'); 
		csc.useDialog(function (){
			//artDialog.list['imgUping'].close();
			if(response.result != "success"){
				var msg = response.msg || "上传失败!";
				csc.error(msg);
				return;
			}
			var url = (csc.url("img",response.key)).replace(/(^\s*|\s*$)/ig,"");
			
			if(location.pathname == "/" || location.pathname == ""){
				var url_t = csc.url("img","/scale/160"+response.key); //缩略图地址;
				$("#infoimg").attr("src",url_t);
				$.post("//i.csc86.com/center",{"imgUrl":response.key},"json");//更新至SNS名片;
			}else{//影响范围：个人资料页，企业资料页，旺铺>公司管理>公司介绍页
				$("#infoimg").attr("src",url);
				$("#imgurl").val(response.key);				
			}
		});
	}