var swfu, uploadObj = {};

function fileQueueError(file, errorCode, message) {
	var msg = "您选择的图片错误，请重新选择图片上传！";
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		msg = "您选择的图片大小错误，请重新选择图片上传！";
		break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		msg = "您选择的图片大小超过最大限制，请处理后上传！";
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
	csc.useDialog(function (){
		try{
			top.csc.alert(msg);
		}catch(e){
			top.alert(msg);
		}
	});
};

function uploadProgress(file, bytesLoaded) {
	var progress = Math.ceil((bytesLoaded / file.size) * 100);
	csc.useDialog(function() {
		uploadObj.upmsgbox = artDialog.through({id: "uploadProgress",title: "图片上传中，请稍候…",content: '图片已上传' + bytesLoaded / 1024 + 'KB 约' + progress + '%，请勿刷新页面',lock: true,width: 380,height: 90,icon: 'csc-loading',init: function() {
				$("div.aui_content").addClass("g-f-l g-fs-14").closest("table.aui_dialog").find("div.aui_iconBg").css("background-image", "url(" + csc.url("res", "/js/p/artDialog/4.1.5/skins/icons/csc-loading.gif") + ")");
				this.DOM.close.remove();
			}});
		if (progress < 100) {
			uploadObj.upmsgbox.content('图片已上传' + bytesLoaded / 1024 + 'KB 约' + progress + '%，请勿刷新页面');
		} else {
			uploadObj.upmsgbox.content('正在生成缩略图，请稍候...');
		};
	});
}

function uploadProgressClose(){//关闭上传进度弹窗
	if(window.art && uploadObj.upmsgbox && uploadObj.upmsgbox.close){
		uploadObj.upmsgbox.close();
	};
};

uploadObj.uploadSuccess = function(file, serverData) {
	var response =  eval('(' + serverData + ')'); 
    csc.useDialog(function(){
		if(response.result != "success"){
			var msg = response.msg || "上传失败!";
			csc.useDialog(function (){
				top.csc.error(msg);
			})
			return;
		}
		var url = (csc.url("img",response.key)).replace(/(^\s*|\s*$)/ig,"");
		$("#imgload0").attr("src",url);
		$("#circleLogoUrl").attr("value",response.key);
    });
};