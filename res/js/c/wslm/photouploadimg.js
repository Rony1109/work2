var sns=csc.sns||{};
sns.uploadSetting = function (btnID,btntxt,padding,size,type) {
	var type = type || "";
	return uploadSettings({
		file_size_limit :size || "100KB",
		file_upload_limit : 0,
		type:type,
		button_image_url : csc.url("res","/css/c/wslm/img/upload.png"),
		button_placeholder_id : btnID || "upload00",
		button_width:86,
		button_height:26,
		button_text:btntxt,
		button_text_left_padding: padding||5,
		file_queued_handler : fileQueued,
		upload_success_handler : uploadObj.uploadSuccess
	});	
};
sns.uploadSettingReLoad = function (btnID,btntxt,padding,size,type){
	var type = type || "";
	return uploadSettings({
		file_size_limit :size || "100KB",
		file_upload_limit : 0,
		type:type,
		button_image_url : csc.url("res","/css/c/wslm/img/upload.png"),
		button_placeholder_id : btnID || "upload00",
		button_width:86,
		button_height:26,
		button_text:btntxt,
		button_text_left_padding: padding||5,
		upload_success_handler : uploadObj.uploadSuccessReLoad
	});
};
csc.sns=sns;

$(function (){
	var	othis = csc.sns, $upImgList = $("#upImgList");
	othis.picUpload=[];
	new SWFUpload(csc.sns.uploadSetting("upload00","上传相册图片",0,"","weiAlbum"));
	for(var i=1; i <= $upImgList.children().length; i++){
		$upImgList.children().eq(i-1).find('div.upbtn>span.g-f-l>a').attr('id','upload0'+i);
		new SWFUpload(csc.sns.uploadSettingReLoad("upload0"+i,"重新上传",17,"","weiAlbum"));
	}
});

function delPhoto(dom,id,key){
	$.post('/member/photo/delete',{'id':id,'filePath':key},function(data){
		if(!data.status){
			csc.error('删除失败，请刷新后再试！');
		}else{
			$(dom).parents('li').remove();
		}
	},'json');
}