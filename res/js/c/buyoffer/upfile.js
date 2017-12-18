function fileQueueError(file, errorCode, message) {
	var
		msg,
		othis = this;
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		msg = "图片大小错误";
		break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		msg = "图片过大";
		break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		msg = "图片格式错误";
		break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		csc.useDialog(function (){
			var msg = "最多可以上传10张图片",
				uploads = upFile.getStats().successful_uploads;
			if(uploads>0){
				msg += "，您已上传" + uploads + "张图片";
				if(uploads <10 ){
					msg +="，最多还可以再上传" + (10-uploads) + "张";
				}
			}
			csc.alert(msg);
		});
		return;
		break;
		default:
		msg = "图片错误";
	}
	msg = '<span>上传失败(' + msg +')</span><a href="javascript:" onclick="csc.buyoffer.delPic(this);">删除</a>';
	csc.buyoffer.upMsg(file,msg);
}

function uploadProgress(file, bytesLoaded) {
	csc.buyoffer.upMsg(file,"图片上传中...");
}

function uploadError(file, errorCode, message) {
	if(file){
		csc.buyoffer.upMsg(file,'<span>上传失败(上传错误)</span><a href="javascript:" onclick="csc.buyoffer.delPic(this);">删除</a>');
	}
}

function uploadSuccess(file, serverData) {
		var
			msg,
			data = eval("("+serverData+")");
		if(data.result == "success"){
			msg = '<a href="javascript:" onclick="csc.buyoffer.delPic(this,true);" data-img=\'{"'+data.key+'":"'+file.name+'"}\'>删除</a>';
		}else{
			this.setStats({successful_uploads:this.getStats().successful_uploads-1});
			msg = '<span>上传失败(' + data.msg +')</span><a href="javascript:" onclick="csc.buyoffer.delPic(this);">删除</a>';
		}
		csc.buyoffer.upMsg(file,msg);
}

function uploadComplete(file) {
	this.startUpload();
}

var upload_url = csc.url("img","/upload?type=inquiryFile");
function uploadStart ( file ) {
	var type1 = [".jpg", ".jpeg", ".gif", ".png"],
		type2 = [".doc", ".docx", ".xls", ".xlsx"],
		type = file.type;
	if ( $.inArray( type, type2 ) != -1 ) {
		upFile.setUploadURL("//inquiry.csc86.com/inquiry/upload");
	} else {
		upFile.setUploadURL( upload_url );
	}
}
$(window).load(function (){
	upFile = new SWFUpload(
		uploadSettings({
		    upload_url: upload_url,
		    button_placeholder_id : "upFile",
		    file_size_limit : "2 MB",
			file_types : "*.jpg;*.jpeg;*.gif;*.png;*.doc;*.docx;*.xls;*.xlsx;",
			button_text : "上传附件",
		    button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,
		    file_upload_limit : 10,
		    button_image_url : csc.url("res","/css/c/offer/img/bg.png")
		})
	);
	
	setTimeout(function (){
		if(window.upImgs){
			upFile.setStats({successful_uploads:upImgs.length});
			upImgs = null;
		}
	},500)
});