function btn(){
 $.get(csc.url("member","/public/personal/username"),function(data){
		$name=$.trim(data.username);
		if($name=="NotLogin"){
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}else{
			
		
	var name=$("input[name=name]").val(),
		 style=$("input[name=style]:checked").val(),
		 number=$("input[name=number]").val(),
		 range=$("input[name=range]").val(),
		 area=$("input[name=area]").val(),
		 connection=$("input[name=connection]").val();
	//alert(name+"===="+style+"===="+number+"===="+range+"===="+area+"===="+connection);return;
	$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 18,"subtype": "ajax","dosubmit":"华利嘉见面会","info[name]":name,"info[style]":style,"info[number]":number,"info[range]":range,"info[area]":area,"info[connection]":connection},function(data){
		if(data.status == true){
			alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
			$("input[name=name]").val("");
			$("input[name=style]:checked").removeAttr("checked");
			$("input[name=number]").val("");
			$("input[name=range]").val("");
			$("input[name=area]").val("");
			$("input[name=connection]").val("");
		}else{
			alert("申请失败，请刷新后重试！");
		}
	},"jsonp");
	
	}
	},"jsonp");
}