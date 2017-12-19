define(function(require , exports , module){
	var submit = function(form){
		isLogin('span.bd','isLogin.html','messagecount.html');
		$(form).submit(function(){
			var contacts = $('input[name="contacts"]');
			var phone = $('input[name="phone"]');

			if($.trim(contacts.val()) == "" || $.trim(phone.val()) == "") {
				if($.trim(contacts.val()) == ""){
					contacts.css('border-color', 'red').focus().blur(function(){
						$(this).css('border-color', '#dedede');
					});
				}
				else {
					phone.css('border-color', 'red').focus().blur(function(){
						$(this).css('border-color', '#dedede');
					});
				}
				return false;
			}
			else {
				$.post('http://cncms.csc86.com/formguide/index.php',$(this).serialize(), function(data){
					if(data.status == true){
						alert('恭喜您！申请加入成功！');
					}
					else {
						alert('申请失败！请刷新后重试！');
					}
				},'jsonp');
				return true;
			}
			
		});
	
	
	function isLogin(obj,url1,url2){
		var path="http://api.csc86.com/member/";
		url1=path+url1;
		url2=path+url2;
		$.ajax({
	        type: "get",
	        url: url1,
	        dataType:"jsonp",
	        data: "", //例如："name=John&location=Boston";
	        success: function(data){
	        	if(data.status){
	        		$.get(url2,{type:"json"},function(dataMsg){	
	        			/*var html="<b>您好,</b><a href='http://member.csc86.com/'>";
	        			html+=data.data.userName+"!";
	        			html+="</a><b>消息</b><a class='msg' href='http://member.csc86.com/membercenter/messageall/'>";
	        			html+=dataMsg.data.count;
	        			html+="</a><a href='http://member.csc86.com/login/logout' class='logout'>退出</a>";*/

	        			$(obj).html('<a href="http://member.csc86.com/" target="_blank" id="J_signEd" data-memberid="'+data.data.userName+'">'+data.data.userName+'</a>！消息<a href="http://member.csc86.com/membercenter/messageall/" target="_blank" class="top-msg-num">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout">退出</a>');
	        		},"jsonp");
	        		
	        	}
	        },
	        error: function (d,d1,d2) {
	            alert(this.url);
	        }
	    });
	}//isLogin end;
	};
	module.exports = submit;
});