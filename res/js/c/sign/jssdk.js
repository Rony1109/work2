$(function(){
	 //if(QC.Login.check()){QC.Login.signOut()};
	QC.Login({
       //btnId：插入按钮的节点id，必选
       btnId:"qqLoginBtn",	
       //用户需要确认的scope授权项，可选，默认all
       scope:"all",
       //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
       size: " C_S"
   }, function(reqData, opts){//登录成功
       //根据返回数据，更换按钮显示状态方法
       var dom = document.getElementById(opts['btnId']),
       _logoutTemplate=[
            //头像
            '<span><img src="{figureurl}" class="{size_key}"/></span>',
            //昵称
            '<span>{nickname}</span>',
            //退出
            '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'	
                     ].join("");
       dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
           nickname : QC.String.escHTML(reqData.nickname),
           figureurl : reqData.figureurl
              }));
   }, function(opts){//注销成功
     }
);
//QQ回转信息

//从页面收集OpenAPI必要的参数。get_user_info不需要输入参数，因此paras中没有参数
var paras = {};
QC.Login.getMe(function(openId, accessToken){
	//alert(accessToken);
	//用JS SDK调用OpenAPI	
QC.api("get_user_info", paras)
	//指定接口访问成功的接收函数，s为成功返回Response对象
	.success(function(s){
			var inviteId=$("#inviteId").val()||"";
			$.post("//login.csc86.com/api/openlogin",{"openId":openId,"nickname":s.data.nickname,"inviteId":inviteId,"source":"QQ"},function(data) {
				
					 var para=$("#redirecturi").val();
					 	//var arr=data.callback.split("?"),para=arr[1].split("=");
						//console.log(data);
					   if(data.status){
						// $.get(data.callback,{"sessionId":data.sessionId,"returnUrl":"ajax"},function(msg){
							 if(para){
									location.href = para;
							 }else if(top.csc.signDialogClose){
									top.csc.signDialogClose();
									top.location.reload();
					  	  	 }else{
								   location.href = csc.url("member");
							  }
							 
						// },"jsonp");
						 //alert(data);
								
						}else{
						    alert(data.msg);	
						}
	 		},"jsonp");

		
		//成功回调，通过s.data获取OpenAPI的返回数据
		//alert("获取用户信息成功！当前用户昵称为："+s.data.nickname);
	})
	//指定接口访问失败的接收函数，f为失败返回Response对象
	.error(function(f){
		//失败回调
	//	alert("获取用户信息失败！");
	})
	
	.complete(function(c){
		
	});
  },"jsonp");
});

