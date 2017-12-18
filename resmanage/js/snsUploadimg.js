var swfu, uploadObj = {};
function uploadSuccess(file, serverData) {
	var response =  eval('(' + serverData + ')');
	if(response.result != "success"){
		var msg = response.msg || "上传失败!";
		csc.useDialog(function (){
			csc.alert(msg);
		})
		return;
	} else {
		var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]),stauts="upload";
		$("#imgload0").parent().attr("href",url);
		$("#imgload0").attr("src",url);
		$("#upDImg").attr("value",response.key);
	}
}