var swfu, uploadObj = {};
uploadObj.uploadSuccess = function(file, serverData) {
	var response =  eval('(' + serverData + ')'); 
    csc.useDialog(function() {
		uploadProgressClose();
		if(response.result != "success"){
			var msg = response.msg || "上传失败!";
			csc.useDialog(function (){
				csc.error(msg);
			})
			return;
		}
		var url = (csc.url("img",response.key)).replace(/(^\s*|\s*$)/ig,""),arrId = file.id.split("_"), id = arrId[1];
		$("#imgurl0" + id).attr("src", url);
		$.post("/personal/personal/album", {"sort": id,"photoUrl": url,"t": "update"}, function(){}, "jsonp");
    });
};
uploadObj.uploadError = function(file, errorCode, message) {
    csc.useDialog(function() {
        csc.alert(message);
        return;
        csc.alert("图片上传失败，错误代码：" + errorCode + "，错误信息：" + message);
    });
    $("#progress").remove();
};