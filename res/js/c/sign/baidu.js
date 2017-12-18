baidu.require('connect', function(connect){
       connect.init("d0HdmQw2KBaHQojMPfLdGvz0");
	   document.getElementById('baidu_login').onclick= function(){
       connect.login(function(info){
        var access_token = info.session.access_token;//获取access_token
		console.log(info.session);
		$.post("/ajax/Loginback",{"openId":access_token,"source":"baidu"},function(data){
			console.log(data);
		});
		
    });
  };
	   
 });
	
baidu.require( ['connect' , 'event'] , function( connect , event ){
    event.addEventListener( 'connect.login' , function(){
     // alert('User Logined!');
	  connect.logout();
    } );
} );
