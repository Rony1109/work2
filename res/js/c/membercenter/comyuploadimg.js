$(function () {
	swfu = new SWFUpload(uploadSettings({
		button_placeholder_id : "comploadimg",
		type:"memberCompanyLogo",
		button_text:"修改Logo",
		file_size_limit:"5MB",
		button_text_top_padding:3,
		BUTTON_ACTION:-100,
		button_width:77,
		button_height:24,
		button_image_url:csc.url("res","/css/c/membercenter/img/transparent.png"),
		upload_success_handler : uploadObj.uploadSuccess
	}));
	
	
	//删除logo
	$('.jsDelLogo').click(function(){
		$('#infoimg').attr('src','//res.csc86.com/image/no-img.png');
		$('#imgurl').val("");
		return false;
	});
	
	
	var shopPic=new SWFUpload(uploadSettings({
		type:"memberCompanyLogo",
		button_placeholder_id:'uploadShopPic',
		file_types: "*.jpg;*.jpeg;*.png;*.gif;",
		file_size_limit : "5MB",
		file_upload_limit : 1,
		button_width:130,
		button_height: 24,
		button_text_left_padding:4,
		button_text:"点击上传店铺实景照片",
		button_image_url:'//res.csc86.com/css/c/membercenter/img/upload-shop-btn.jpg',
		upload_success_handler:function(file, serverData){
			var response =  eval('(' + serverData + ')');
			if(response.result != "success"){
				var msg = response.msg || "上传失败!";
				csc.useDialog(function (){
					csc.alert(msg);
				})
				return;
			} else {
				var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
				$("#shopPic").attr("src",url);
				$("#shopPicUrl").attr("value",response.key);
			}
		}
	}));
})