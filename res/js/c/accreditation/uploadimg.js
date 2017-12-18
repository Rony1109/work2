function uploadSuccess(file,serverData){
	var data = eval("("+serverData+")");
	csc.useDialog(function (){
		uploadProgressClose();
		if(data.result == "success"){
			var url=csc.url("img",data.key),arr=file.id.split("_"),id=arr[1];
			$("#imgload0"+id).attr("src",url);
			$("#imgurl0"+id).val(data.key);
			$("#phototips0,#phototips1").hide();
		}else{
			csc.alert(data.msg);
		}
	});
}