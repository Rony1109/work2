var swfu,uploadObj={};
uploadObj.uploadSuccess=function(file,serverData){
	var response =  eval('(' + serverData + ')');
	csc.useDialog(function (){
		if(response.result != "success"){
			var msg = response.msg || "上传失败!";
			csc.useDialog(function (){
				csc.error(msg);
			});
			return;
		}
		var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]),stauts="upload";
		if(window.location.href.indexOf("logo")!=-1){
			$("#imgload0"+id).attr("src",url);
			$.post("/shop/logo",{"imgNumber":id,"imgUrl":response.key},function(){},"jsonp");
			$("#imgurllogo").val(url).focus(function(){
				$(this).select();	
			});
			
		}else if(window.location.href.indexOf("modifycert")!=-1 || location.href.indexOf("addcertificates")!=-1){
			$("#imgUrl0").val(response.key).blur();
		}else if(window.location.href.indexOf("contact")!=-1){
			$("#imgUrl"+id).val(response.key);
			$("#imgload0"+id).attr("src",url);
		}
		else{
			switch(id){
				case 0:
					stauts="load";
					$("#conn0").find("span").show().prev().hide();
				break;
				case 1:
					id=0;
				break;
				case 2:
					id=1;
					stauts="load";
					$("#conn1").find("span").show().prev().hide();
				break;
				case 3:
					id=1;
				break;
				case 4:
					id=2;
					stauts="load";
					$("#conn2").find("span").show().prev().hide();
				break;
				case 5:
					id=2;
				break;
				case 6:
					id=3;
					stauts="load";
					$("#conn3").find("span").show().prev().hide();
				break;
				case 7:
					id=3;
				break;
			}
			$("#srcimg"+id).parent().html('<img src="'+url+'" id="srcimg'+id+'" data-maxw="800" data-maxh="176" />');
			$("#imgload0"+id).parent().html('<img src="'+url+'" id="imgload0'+id+'" data-maxw="175" data-maxh="80" />');
			(csc.ie6 || csc.ie8) && csc.shopAdvMax();

			$.post("/shop/decoration",{"imgNumber":id,"imgUrl":response.key,"status":stauts},function(data){
				if(data.status){
					csc.success(data.msg);;
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");
		}
	});
};