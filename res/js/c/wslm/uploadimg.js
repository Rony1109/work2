csc.uploadImg=csc.uploadImg||{},csc.sessionId='';
function fileQueueError(file, errorCode, message) {
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		csc.error("您选择上传的文件找不到，请重新选择图片上传！");
		break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		csc.error("您选择的图片大小超过最大限制，请处理后上传！");
		break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		csc.error("传入的图片格式不对，只能上传jpg、jpeg、png、gif格式的图片");
		break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		csc.error("您一次选择的图片太多，请重新选择图片上传！");
		break;
		default:
		csc.error("您选择的图片错误，请重新选择图片上传！");
	}
}

function fileQueued() {
	if($('#upImgList').children('li').length >=10){
        this.cancelUpload(this.eventQueue.pop(), false);
		csc.error('最多只能上传10张图片！');
	}
};

var swfu,uploadObj={};
uploadObj.uploadSuccess=function(file,serverData){
	var response =  eval('(' + serverData + ')') , i , $upImgList = $('#upImgList') , imgLength = $upImgList.children().length , url = (csc.url("img",response.key)).replace(/(^\s*|\s*$)/ig,"");
	csc.useDialog(function (){
		if(response.result != "success"){
			var msg = response.msg || "上传失败!";
			csc.error(msg);
			return false;
		}else{
			imgLength > 0 ? i = imgLength + 1 : i = 1 ;
			$.post('/member/photo/add',{'filePath':response.key},function(data){
				$upImgList.prepend('<li><div class="upimg"><img src="'+url+'" width="175" height="175"></div><div class="upbtn clearfix"><span id="'+data.id+'" class="g-f-l"><a id="upload0'+i+'" href="javascript:">重新上传</a></span><span class="g-f-r"><a onclick="delPhoto(this,'+data.id+',\''+response.key+'\')" class="btn" href="javascript:">删除</a></span></div></li>');
				new SWFUpload(csc.sns.uploadSettingReLoad("upload0"+i,"重新上传",17,"","weiAlbum"));
			},'json')
		}
	});
};

uploadObj.uploadSuccessReLoad=function(file,serverData){
	var response =  eval('(' + serverData + ')') , i , $id = $('#'+this.movieName), idv = $id.parent('span').attr('id'), $upImgList = $('#upImgList') , imgLength = $upImgList.children().length , url = (csc.url("img",response.key)).replace(/(^\s*|\s*$)/ig,"");
	csc.useDialog(function (){
		if(response.result != "success"){
			var msg = response.msg || "上传失败!";
			csc.error(msg);
			return false;
		}else{
			$.post('/member/photo/update',{'id':idv,'filePath':response.key},function(data){
				if(data.status){
					$id.parents('li').find('div.upimg>img').attr('src',url);
				}else{
					csc.error("上传失败，请刷新后再试！");
				}
			},'json')
		}
	});	
}