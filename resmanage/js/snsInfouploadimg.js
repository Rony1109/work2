/*if (typeof csc=="undefined") var csc={};
csc.url = function (host ,path ,domain){
	var	domain = domain || (function (){
			var	domain = location.host;
			if(domain.indexOf("csc86.com") > 0){
				return "csc86.com";
			}
			return "csc86.com";
		})();
	if(host){
		switch(host){
			case "search":
			case "member":
			host += "1";
			break;
			default:
			;
		}
	}
	return location.protocol + "//" + (host ? host + "." : "") + domain + (path ? path : "");
};
var picUpload;
var uploadSetting = function () {
	return {
		//flash_url :"/js/SWFUpload/v2.2.0.1/swfupload.swf",
		flash_url :csc.url("resmanage","/js/SWFUpload/v2.2.0.1/swfupload.swf"),
		upload_url :csc.url("img")+"/upload?type="+type,
		file_types : "*.jpg;*.jpeg;*.gif",
		file_size_limit : "3MB",
		file_upload_limit : 1,
		button_image_url : csc.url("resmanage","/img/upload.png"),
		button_placeholder_id : "upload00",
		button_width:86,
		button_height:25,
		button_text:"图片上传",
		button_text_left_padding: 15,
		button_text_top_padding : $.browser.msie?2:4,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor:-2,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler :uploadObj.uploadProgress,
		upload_error_handler : uploadObj.uploadError,
		upload_success_handler : uploadObj.uploadSuccess,
		upload_complete_handler : uploadComplete,
		debug : false
	};
};
$(window).load(function (){
	picUpload = new SWFUpload(uploadSetting());
});*/