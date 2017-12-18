function upMsg(file,msg){
	var
		$li = $("#file-"+file.index),
		$upMsg = $("#upMsg");
	$li.length ? $li.html('<strong>'+file.name+'</strong> '+msg) :
		$upMsg.length ? $upMsg.append('<li id="file-'+file.index+'"><strong>'+file.name+'</strong> '+msg+'</li>') :  $("#tpcImgBox").before('<ul id="upMsg" class="up-img"><li id="file-'+file.index+'"><strong>'+file.name+'</strong> '+msg+'</li></ul>');	
}

function delPic(id,index){
	$(id).closest("li").remove();
	if(index){
		upFile.setStats({successful_uploads:upFile.getStats().successful_uploads-1});
	}
}

function uploadStart(file){}

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
			/*var msg = "最多可以上传10张图片",
				uploads = upFile.getStats().successful_uploads;
			if(uploads>0){
				msg += "，您已上传" + uploads + "张图片";
				if(uploads <10 ){
					msg +="，最多还可以再上传" + (10-uploads) + "张";
				}				
			}*/
			csc.alert(msg);
		});
		return;
		break;
		default:
		msg = "图片错误";
	}
	msg = '<span>上传失败(' + msg +')</span><a href="javascript:" onclick="delPic(this);">删除</a>';
	upMsg(file,msg);
}

function uploadProgress(file, bytesLoaded) {
	upMsg(file,"图片上传中...");
}

function uploadError(file, errorCode, message) {
	if(file){
		upMsg(file,'<span>上传失败(上传错误)</span><a href="javascript:" onclick="delPic(this);">删除</a>');
	}
}

function uploadSuccess(file, serverData) {
		var response =  eval('(' + serverData + ')');
		var msg;
		if(response.result != "success"){
			msg = response.msg || "上传到服务器失败";
			msg = '<span>上传失败(' + msg +')</span><a href="javascript:" onclick="delPic(this);">删除</a>';
		}else{
			msg = '<a href="javascript:" onclick="delPic(this,true);" data-img="'+$.trim(response.key)+'">删除</a>';
		}
		/*if(serverData.match(/\d{4}\/\d{2}\/\d{2}\/\d{10}/) != null){
			msg = '<a href="javascript:" onclick="delPic(this,true);" data-img="'+$.trim(serverData)+'">删除图片</a>';
		}else{
			this.setStats({successful_uploads:this.getStats().successful_uploads-1});
			switch(serverData) {
				case "upload file size limit exceeded":
				case "Size exceeds the limit":
				msg = "图片过大";
				break;
				default:
				msg = "上传到服务器失败";
			}
			msg = '<span>上传失败(' + msg +')</span><a href="javascript:" onclick="delPic(this);">删除图片</a>';
		}
		*/
		upMsg(file,msg);
}

//function uploadComplete(file) {
//	this.startUpload();
//}

$(function (){
	upFile = new SWFUpload(uploadSettings({
		type:"snsTopicLogo",
		button_placeholder_id : "upImgs",
		file_types : "*.jpg;*.jpeg;*.gif;*.png;",
		file_size_limit : "2 MB",
		file_upload_limit : 100,
		button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,
		button_image_url : csc.url("res","/css/c/sns/img/upload.png"),
		button_width:86,
		button_height:24,
		button_text_left_padding:15,
		button_text:"上传图片"
	}));
	setTimeout(function (){
		if(window.upImgs){
			upFile.setStats({successful_uploads:upImgs.length});
			upImgs = null;
		}
	},500)
});