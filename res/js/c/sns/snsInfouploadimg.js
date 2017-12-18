csc.sns = csc.sns || {};
$(function (){//商圈修改 LOGO上传
	csc.sns.picUpload=[];
	csc.sns.picUpload[0] = new SWFUpload(uploadSettings({
		type:"snsGroupLogo",
		file_types : "*.jpg;*.jpeg;*.gif;*.png;",
		file_size_limit : "600 KB",
		button_image_url : csc.url("res","/css/c/sns/img/upload.png"),
		button_placeholder_id : "upload00",
		button_width:87,
		button_height:24,
		button_text:"上 传",
		button_text_left_padding: 24,
		upload_success_handler : uploadObj.uploadSuccess
	}));
});