$(function(){
	//seajs.use(csc.url("res", "/f=js/p/artDialog/4.1.5/skins/blue.css"));
	$("#msg-up .del,#msg-down .del").click(function(){
		var id=$(this).attr("id");	
		csc.confirm("您是否要真的删除这条消息",function(){
			$.post("/membercenter/messagelook",{"id":id},function(data){
				 if (data.status) {
					csc.success(data.msg, 2);
					setTimeout(function() {
						location.href="/membercenter/messagelist";
					}, 2000);
					} else {
						csc.alert(data.msg);
				 }	
			},"jsonp");
		});	
	});	
});