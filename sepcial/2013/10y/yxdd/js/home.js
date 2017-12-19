$(function(){
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-sign-info").html("您好，&nbsp;<b>"+data.data.userName+"&nbsp;&nbsp;&nbsp;&nbsp;");
		}
	},"jsonp");
});

