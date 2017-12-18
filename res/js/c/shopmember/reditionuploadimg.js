var sns=csc.sns||{};
sns.uploadSetting = function (btnID,btntxt,padding,size,type) {
	var type = type || "";
	return uploadSettings({
		file_size_limit :size || "2 MB",
		file_upload_limit : 0,
		type:type,
		button_image_url : csc.url("res","/css/c/membercenter/img/upload.png"),
		button_placeholder_id : btnID || "upload00",
		button_width:82,
		button_height:24,
		button_text:btntxt,
		button_text_left_padding: padding||5,
		//upload_progress_handler :uploadObj.uploadProgress,
		//upload_error_handler : uploadObj.uploadError,
		upload_success_handler : uploadObj.uploadSuccess
	});
};
csc.sns=sns;
$(function (){
	var	othis = csc.sns;
	othis.picUpload=[];
	if($("#upload00").length && $("#upload13").length){//旺铺轮换广告上传
		var type = "shopBanner";
		othis.picUpload[0] = new SWFUpload(csc.sns.uploadSetting("upload00","上传幻灯广告",2,"",type));
		othis.picUpload[1] = new SWFUpload(csc.sns.uploadSetting("upload10","重新上传",15,"",type));
		othis.picUpload[2] = new SWFUpload(csc.sns.uploadSetting("upload01","上传幻灯广告",2,"",type));
		othis.picUpload[3] = new SWFUpload(csc.sns.uploadSetting("upload11","重新上传",15,"",type));
		othis.picUpload[4] = new SWFUpload(csc.sns.uploadSetting("upload02","上传幻灯广告",2,"",type));
		othis.picUpload[5] = new SWFUpload(csc.sns.uploadSetting("upload12","重新上传",15,"",type));
		othis.picUpload[6] = new SWFUpload(csc.sns.uploadSetting("upload03","上传幻灯广告",2,"",type));
		othis.picUpload[7] = new SWFUpload(csc.sns.uploadSetting("upload13","重新上传",15,"",type));
	}
	if($("#upload_s_logo").length){//旺铺LOGO上传
		new SWFUpload(csc.sns.uploadSetting("upload_s_logo","浏　览",20,"","memberCompanyLogo"));
	}
	if($("#upload_lx_1").length){//旺铺联系人
		var type = "shopContactFace";
		new SWFUpload(csc.sns.uploadSetting("upload_lx_1","修改头像",15,"5MB",type));
		new SWFUpload(csc.sns.uploadSetting("upload_lx_2","修改头像",15,"5MB",type));
	}
	if($("#upload_zs").length){//旺铺证书
		new SWFUpload(csc.sns.uploadSetting("upload_zs","浏　览",20,"3 MB","shopHonor"));
	}
	if($("#upload_news").length){//公司动态
		var shopName = $.trim($("#shopname").val());
		new SWFUpload(uploadSettings({
			type:"shopNews",
			button_placeholder_id:"upload_news",
			post_params:{
				watermarkContent:shopName
			},
			upload_success_handler:shopNewsSuccess
		}));
	}
});