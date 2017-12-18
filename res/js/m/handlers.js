//图片上传SWFUpload默认配置
//参考网址 http://www.leeon.me/upload/other/swfupload.html#events 不再做详细说明

function fileQueued(file) {};

function fileQueueError(file, errorCode, message) {
	var msg = "您选择的图片错误，请重新选择图片上传！";
	switch (errorCode) {
	case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		msg = "您选择的图片大小错误，请重新选择图片上传！";
		break;
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		try{msg="您选择的图片超过最大("+this.settings.file_size_limit+")限制，请处理后上传！"}
		catch(e){msg = "您选择的图片大小超过最大限制，请处理后上传！";}
		break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		msg = "您的图片格式有误！";
		break;
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		msg = "您一次选择的图片太多，请重新选择图片上传！";
		break;
	default:
		msg = "您选择的图片错误，请重新选择图片上传！";
	};
	csc.useDialog(function () {
		csc.alert(msg);
	});
};
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	numFilesQueued > 0 && this.startUpload();
};

function uploadStart(file) {
};

function uploadProgress(file, bytesLoaded) {
	var progress = Math.ceil((bytesLoaded / file.size) * 100);
	csc.useDialog(function () {
		artDialog({
			id : "uploadProgress",
			title : "图片上传中，请稍候…",
			content : '图片已上传' + bytesLoaded / 1024 + 'KB 约' + progress + '%，请勿刷新页面',
			lock : true,
			width : 380,
			height : 90,
			cancel : false, //影藏关闭按钮
			//esc: false,//取消ESC关闭
			icon : 'csc-loading',
			init : function () {
				$(this.DOM.wrap[0]).find("div.aui_content").addClass("g-f-l g-fs-14").closest("table.aui_dialog").find("div.aui_iconBg").css("background-image", "url(" + csc.url("res", "/js/p/artDialog/4.1.5/skins/icons/csc-loading.gif") + ")");
			}
		});
		if (progress < 100) {
			artDialog.list['uploadProgress'].content('图片已上传' + bytesLoaded / 1024 + 'KB 约' + progress + '%，请勿刷新页面');
		} else {
			artDialog.list['uploadProgress'].content('正在生成缩略图，请稍候...');
		};
	});
}

function uploadError(file, errorCode, message) {
	csc.useDialog(function () {
		uploadProgressClose();
		csc.alert("图片上传失败，请重试！");
		if (window.console) {
			console.info("errorCode:" + errorCode + ";message" + message);
		}
	});
}

function uploadSuccess(file, serverData) { //上传一张图片成功后的回调
	if (window.console) {
		console.info(serverData);
	}
}

function uploadComplete(file) {
	try {
		var stats = this.getStats();
		if (stats.files_queued == 0) { //上传队列中文件为0时;
			uploadProgressClose();
			this.settings.file_upload_limit == 1 && this.setStats({
				successful_uploads : 0
			});
		} else {
			this.startUpload();
		}
	} catch (e) {
		try{
			uploadProgressClose();
			this.startUpload();
		}catch(e){}
	}
}

function uploadSettings(type, btnID, successCallback) { //至少需要传入一个参数
	var _default = {
		flash_url : csc.url("res", "/js/p/SWFUpload/v2.2.0.1/swfupload.swf"),
		upload_url : csc.url("img", "/upload?type=" + type),
		file_size_limit : "3MB",
		file_types : "*.jpg;*.jpeg;*.gif;*.png;",
		file_upload_limit : 1,
		button_action : SWFUpload.BUTTON_ACTION.SELECT_FILE,
		button_placeholder_id : btnID || "upPic",
		button_image_url : csc.url("res", "/css/c/offer/img/bg.png"),
		button_width : 67,
		button_height : 24,
		button_text : "上传图片",
		button_text_left_padding : 8,
		button_text_top_padding : /MSIE/.test(navigator.userAgent) ? 2 : 4,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor : -2,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : successCallback || uploadSuccess,
		upload_complete_handler : uploadComplete,
		debug : false
	};
	if (csc.typeOf(type) == "object") {
		type["type"] && (type.upload_url = csc.url("img", "/upload?type=" + type["type"]));
		return $.extend(true, _default, type);
	};
	return _default;
};

function uploadProgressClose() { //关闭上传进度弹窗
	if (window.art && artDialog.list['uploadProgress']) {
		artDialog.list['uploadProgress'].close();
	};
};
