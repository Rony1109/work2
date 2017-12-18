csc.sns = csc.snsn || {};
//个人相册
csc.sns.uploadSetting = function (btnID) {
	return uploadSettings({
		type:"snsPersonalAlbum",
		file_size_limit : "600 KB",
		button_image_url : csc.url("res","/css/c/sns/img/upload.png"),
		button_placeholder_id : btnID || "upload00",
		button_width:86,
		button_height:24,
		button_text:"上 传",
		button_text_left_padding: 25,
		upload_error_handler : uploadObj.uploadError,
		upload_success_handler : uploadObj.uploadSuccess
	});
};

$(window).load(function (){
	var	othis = csc.sns;
	othis.picUpload=[];
	othis.picUpload[0] = new SWFUpload(csc.sns.uploadSetting("upload00"));
	othis.picUpload[1] = new SWFUpload(csc.sns.uploadSetting("upload01"));
	othis.picUpload[2] = new SWFUpload(csc.sns.uploadSetting("upload02"));
	othis.picUpload[3] = new SWFUpload(csc.sns.uploadSetting("upload03"));
	//othis.picUpload[5] = new SWFUpload(csc.sns.uploadSetting("upload04"));
});