function fileQueueError(file, errorCode, message) {
	console.log(SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE)
	var msg = "您选择的文件错误，请重新选择文件上传！";
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		msg = "您选择的文件大小错误，请重新选择文件上传！";
		break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		try{msg="您选择的文件超过最大("+this.settings.file_size_limit+")限制，请上传小于100MB的文件！"}
		catch(e){msg = "您选择的文件大小超过最大限制，请上传小于100MB的文件！";}
		break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		msg = "您的文件格式有误！";
		break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		msg = "您一次选择的文件太多，请重新选择文件上传！";
		break;
		default:
		msg = "您选择的文件错误，请重新选择文件上传！";
	};
	alert(msg);
};
function uploadSettings(type,btnID,successCallback){//至少需要传入一个参数
	var _default = {
		flash_url : csc.url("resmanage","/js/SWFUpload/v2.2.0.1/swfupload.swf"),
		upload_url:"http://marketApp.csc86.com/appservice-app/apk/upload",
	    type:"Multipart",
	    file_types: "*.apk;",
	    file_size_limit : "100MB",
	    file_upload_limit : 1,
		button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,
		button_placeholder_id : btnID || "upload00",
		button_image_url : csc.url("resmanage","/img/upload.png"),
		button_width:86,
		button_height:25,
		button_text:"文件上传",
		button_text_left_padding: 15,
		button_text_top_padding : $.browser.msie?2:4,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor:-2,
		file_dialog_start_handler : fileDialogStart,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,
		debug : false
	};
	if(typeof(type) == "object"){
		type["type"] && (type.upload_url = "http://marketApp.csc86.com/appservice-app/apk/upload");
		return $.extend(true,_default,type);
	};
	return _default;
};

function uploadSuccess(file, serverData) {//上传成功时回调
	var response =  eval('(' + serverData + ')');
	if(!(response.status)){
		dialog.error(response.msg,function(){window.location.href = window.location.href});
		return;
	} else {
		$("body").find("input#fileName").val(response.data[0].fileName);
		$("body").find("input#filePath").val(response.data[0].filePath);
		$("body").find("ul#upUl").children("li#nameFile").remove();
		var c = (response.data[0].fileName).substring((response.data[0].fileName).indexOf("_")+1);
		$("body").find("ul#upUl").append("<li id='nameFile'><span class='upload-td'>&nbsp;</span>"+c+"</li>");
	}
}

function newUpload(id){//newUpload
  new SWFUpload(uploadSettings( {button_placeholder_id:id }));
}
