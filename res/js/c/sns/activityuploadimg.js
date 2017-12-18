//圈子，活动上传
csc.sns = csc.sns || {};

$(window).load(function (){
	try{var	othis = csc.sns;
	othis.picUpload=[];
	othis.picUpload[1] = new SWFUpload(uploadSettings({
		type:"snsActivityLogo",
		file_size_limit : "2 MB",
		button_image_url : csc.url("res","/css/c/sns/img/uploadqt.png"),
		button_placeholder_id : "upload00",
		button_width:86,
		button_height:24,
		button_text:"上传",
		button_text_left_padding: 25,
		upload_success_handler : uploadObj.uploadSuccess
	}));
	}catch(e){}
	//othis.picUpload[2] = new SWFUpload(csc.sns.uploadSetting("upload01"));
});