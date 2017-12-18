/*
 $.post("/ajax/TaoBao",function(data){
	 
});
*/
$("#taobaologin").click(function(){
 TOP.auth(function(){
	 //alert("fdgf");
	 var user = TOP.auth.getUser();
	 $.post("/ajax/Loginback",{"openId":user.id,"nickname":user.nick,"source":"taobao"},function(data){
							 //if(csc.signCallback){
								  //csc.signCallback();
							// }else{
							//console.log(data);alert(data);
							//alert(top.csc.signDialogClose);
							//console.log(data);
							//alert(data);
							var para=$("#redirecturi").val();
							if(data.message){ 
								 $.get(data.callback,function(url){},"json");
								 alert(data);
								 if(para){
										//alert(para);
										location.href = para;
									}else if(top.csc.signDialogClose){
										top.csc.signDialogClose();
										top.location.reload();
							  	  	}else{
										//alert("dd");
									    location.href = "//member.csc86.com";	
									}	
									
							}else{
							   alert("连接服务失败，请稍后登录，谢谢");	
							}
						close();
						
				},"json");
				
	 //console.info(user);
	 }
 )}
 )
/*
$("#taobaologin").click(function(){
	alert("sdffs");
 TOP.login(function(){
	alert("sd");
	 TOP.api('rest','post',{
		 method:'taobao.user.buyer.get',
		 fields:'nick,user_id,sex'
		},function(resp){
			//console.log(resp);
		//alert(resp);
		if(resp.user){
			 $.post("/ajax/Loginback",{"openId":resp.user.user_id,"nickname":resp.user.nick,"source":"taobao"},function(data){
							 //if(csc.signCallback){
								  //csc.signCallback();
							// }else{
							
							var para=$("#redirecturi").val();
							if(para){
								alert("dd")
								//var pare=para.substr(0,para.lastIndexOf("/"));
								if(data.message){
									//alert("dsf");
									location.href = para;
								}else{
									alert("dsfggfgfgf");
									location.reload();
								}
							}
						close();
				});
		}else{
			alert('登录失败!请重新登录');
		} 	
	},"json"); 
});	
});*/

/*
TOP.ui("login-btn", {
    container: "#taobao-login",
	 type: "11,1",
	 callback:{
         login:function(user){			 			
			TOP.api('rest','post',{
			 method:'taobao.user.buyer.get',
			 fields:'nick,user_id,avatar,sex'
			},function(resp){
			if(resp.user){
				 $.post("/ajax/Loginback",{"openId":resp.user.user_id,"nickname":user.nick,"source":"taobao"},function(data){
								 //if(csc.signCallback){
									  //csc.signCallback();
								// }else{
								
								var para=$("#redirecturi").val();
								if(para){
									//var pare=para.substr(0,para.lastIndexOf("/"));
									if(!!data.message){
										location.href = para;
									}else{
										location.reload();
									}
								}
							close();
					});
			}else{
				alert('登录失败!请重新登录');
			} 
			}); 
		 },
         logout:function(){}
    }
  });*/

