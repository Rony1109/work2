Bridge.setup('13870a6c4b8b7b0c6bf512ee00685164'); //360' 是开发者中心提供的appkey。
	$("#login-360").click(function(){
	
		Bridge.connect.tryLogin( function( userData ) { 
		 if ( userData ) {   
			 //在这里可以直接访问userData  
			alert(userData.id );  
		 } else { 
		   	console.log(userData);
			 //处理不支持统一登录情形
			 Bridge.oauth2.getAuthCode( {
 			   'redirect_uri' :'//member.csc86.com/ajax/Loginback',
 			   'state' : 'test' // 可选
		} );
		 }
		});
	});
	