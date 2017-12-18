$(function(){
	$("#upload-inner li a.del").on("click",function(){
		var url ="/image/c/membercenter/tips02.jpg",$img=$(this).next("span").children("img");
		$img.attr("src",csc.url("res","/image/c/membercenter/male.jpg"));
		var id=$img.attr("id").slice($img.attr("id").length-1);
		$.post("/personal/personal/album",{"sort":id,"t":"delete"},function(){},"jsonp");
	});	
});