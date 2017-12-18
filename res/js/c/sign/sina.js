$(function(){
	if(WB2.checkLogin()){
		WB2.logout();
	//	WB2_Login();
	}
});

function WB2_Login(){
	WB2.login(function(){
	/***授权成功后回调***/
		getWbUserData(function(o){
		/***o是/users/show.json接口返回的json对象***/
					var inviteId=$("#inviteId").val()||"";
					$.post("//login.csc86.com/api/openlogin",{"openId":o.id,"nickname":o.screen_name,"inviteId":inviteId,"source":"sina"},function(data){
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
								
							//close();
					},"jsonp");
		});
	});
}

function getWbUserData(callback) {
		WB2.anyWhere(function (W) {
			/***获取授权用户id***/
			W.parseCMD("/account/get_uid.json", function (sResult, bStatus) {
				if (!!bStatus) {
				/**请求uid成功后调用以获取用户数据**/
				getData(W, sResult);
				}else{
					/*** 这里只是简单处理出错***/
					alert("授权失败或错误");
				}
				}, {}, {
					method: 'GET'
				});
			});
	/***请求用户数据，并执行回调***/
			function getData(W, User) {
				W.parseCMD("/users/show.json", function (sResult, bStatus) {
					if (!!bStatus && !!callback) {
						callback.call(this,sResult);
					}
				},
				{
					'uid': User.uid
				},
				{
					method: 'GET'
				});
			}
};

$("#wb_connect_btn").click(function(){	
	WB2_Login();
});
