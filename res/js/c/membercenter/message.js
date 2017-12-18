$(function(){
	//seajs.use(csc.url("res", "/f=js/p/artDialog/4.1.5/skins/blue.css"));
	$("#msg-up .del,#msg-down .del").click(function(){
		var arrid=$(this).attr("id").split(":"),messageIds=[],str=arrid[1]||"";
		messageIds[0]=arrid[0];
		csc.confirm("您是否要真的删除这条消息",function(){
			$.post("/user/deleteMsg",{"messageIds":messageIds},function(data){
				 if (data.status) {
					csc.success(data.msg, 2);
					setTimeout(function() {
						location.href="/user/message?messageType="+str;
					}, 2000);
					} else {
						csc.alert(data.msg);
				 }	
			},"json");
		});	
	});	
});