$(function () {
	var btnbg="",h=24,w=82,txt="修改个人头像";
	if(location.href.indexOf("userinfo")===-1){
		btnbg =csc.url("res","/css/c/memberhome/img/mem-upload.png");
		w=120;h=120;txt="";
	}
	swfu1 = new SWFUpload(uploadSettings({
		
		button_placeholder_id : "infoloadimg",
		type:"memberPersonalFace",
		file_size_limit:"2MB",
		button_text :txt,
		color:"#184C95",
		button_text_style:"color:#067ED4;",
		button_text_top_padding:3,
		BUTTON_ACTION:-100,
		button_width:w,
		button_height:h,
		button_image_url :btnbg,
		upload_success_handler : uploadObj.uploadSuccess
	}));
})