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
		var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
		var $th=$('#SWFUpload_'+id);
		$th.siblings(".imgshow").children("img").attr("src",url);
		$th.siblings(".imglink").attr("value",response.key.replace(/\//,""));
	}
}

