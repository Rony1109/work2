 	var sign={num:60};
	var countclear="";
	function count() {
		if(sign.num<=0){
			clearInterval(countclear);
			sign.num=60;
			if($("#getCode").length){
				$("#getCode").val("获取验证码").attr("disabled", false)
			};
			if($("#getEmailCode").length){
				$("#getEmailCode").val("获取验证码").attr("disabled", false)
			};
			if($("#getPhoneCode").length){
				$("#getPhoneCode").val("获取验证码").attr("disabled", false)
			};
			 return;
		 }
		sign.num--;

		if($("#getCode").length){ $("#getCode").val("剩余"+sign.num+"秒");}
	    if($("#getEmailCode").length){ $("#getEmailCode").val("剩余"+sign.num+"秒");}
		if($("#getPhoneCode").length){ $("#getPhoneCode").val("剩余"+sign.num+"秒");}
	}

$(function(){
	$("#email").blur(function(){
	  var $val=$(this).val();
	  var emailreg=/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	  if($val==""){
		 sign.tips("emailmtips",'邮箱不能为空',"#email", null);
	  }else if(emailreg.test($val) == false){
		 sign.tips("emailmtips",'邮箱不是有效的电子邮件地址.',"#email", null);
	  }else{
		 $("#emailmtips").addClass("right").removeClass("msg hides");
	  }
    }).keydown(function(){
		$("#mtips").addClass("hides");
	}).focus(function(){
		 sign.num=60;
		 $("#getEmailCode").val("获取验证码").attr("disabled", false);
		 clearInterval(countclear);
  });

	sign.tips = function(adress,msg,id,tips) {
		$("#"+adress).html(msg).addClass("msg").removeClass("cd-tips").show();
		$("#"+tips).hide();
		$("#"+id).keydown(function(){
			$("#"+adress).hide().removeClass("g-f-success");;
		}).change(function(){
			$("#"+adress).hide();
		});
		return false;
	};
	/*
	$("#emailsbmit").click(function() {
		var $val=$("#email").val(),l=$("#password").val().length;
	  	var emailreg=/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		if (!$val || $val == '请输入邮箱') {
			return sign.tips("emailmtips",'邮箱不能为空', "#email",null);
		} else if (!$("#verifycode").val()) {
			return sign.tips("verifytips",'验证码不能为空', "#verifycode",null);
		} else if (!$("#password").val()) {
			return sign.tips("passwordmtips",'密码不能为空', "#password",null);
		}else if(l<6){
		  	return sign.tips("passwordmtips",'请输入6-20个英文字母﹑数字或符号', "#password",null);
		}else if(emailreg.test($val) == false){
			return sign.tips("emailmtips",'邮箱 不是有效的电子邮件地址.',"#email",null);
		}else if(!$("#accord").is(":checked")){
			return sign.tips("tips",'您还没有同意，华南城网的注册协议',null,null);
		}
	});*/
	sign.getUsername=function(){
		var $val=$.trim($("#username").val()),data=$("#username").attr("placeholder");
		if(!$val||$val===data){
			return sign.tips("usernametips",'请输入您的手机号码或邮箱', "username",null);
		}
	};
	/*
	$("#getPhonepwdCode").click(function(){
	  $.post("/register/phonepwd/getphonepwdverifycode/",{"phone":$("#phone").val(),"code":$("#code").val()}, function(data) {
	  },"jsonp");
    });

	$("#getEmailpwdCode").click(function(){
	  $.post("/register/emailpwd/getemailpwdverifycode/",{"email":$("#email").val(),"code":$("#code").val()}, function(data) {
	},"jsonp");
    });


	$("#getspeedy").click(function(){
		var $email=$("#email").val(),
		$phone=$("#phone").val(),
		$signpassword=$("#signpassword").val(),
		//$tips=$("#tips").addClass("g-d-b");
		$val=$("#email").val()||$("#phone").val();
		  var ab=/^1\d{10}$/;
		  var emailreg=/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		 if(!$signpassword){
			return sign.tips("tips","密码不能为空","signpassword", null);
		 }
		 if(!$email&&$("#email").is(":visible")){
			 return sign.tips("tips","邮箱不能为空","email", null);
		 }else if(!$phone&&$("#phone").is(":visible")){
			 return sign.tips("tips","手机号不能为空","phone", null);
	  	 }else  if($("#email").is(":visible")){
			 if(emailreg.test($val)== false){
				 return sign.tips("tips",'邮箱格式不正确，请重新输入',"email",null);
			 }
		}else  if($("#phone").is(":visible")){
			 if(ab.test($val)== false){
				 return sign.tips("tips",'手机号码不正确，请重新输入',"phone",null);
			 }
		}
	  $.post("/register/speedy/getSpeedyVerifyCode/",{"email":$("#email").val(),"phone":$("#phone").val(),"password":$("#signpassword").val()}, function(data) {
		  if(!data.status){
			 return sign.tips("tips",data.msg,"#phone",null);
		  }else{
			location.href=data.url;
		  }
       },"jsonp");
    });

	$("#getqq").click(function(){
		var $Name=$("#loginName").val(),password=$("#password").val();
		if(!$Name){
		 	return sign.tips("logtips",'请输入您的用户名',"#loginName",null);
		}else if(!password){
			return sign.tips("logtips",'请输入您的密码',"#password",null);
	    }
	   $.post("/register/speedy/getSpeedy/",{"loginName":$("#loginName").val(),"password":$("#password").val()}, function(data) {
		   if(!data.status){
			 return sign.tips("logtips",data.msg,"#loginName",null);
		   }else{
			 location.href=data.url;
		  }
	   },"jsonp");
    });
	*/
	$("#phonegetpwd").click(function(){
		var ab=/^1\d{10}$/;
		var $phone=$("#phone").val();
		var $code=$("#verifycode").val();
		if(!$phone){
			return sign.tips("phonetips",'手机号不能为空', "#phone",null);
		}else if(ab.test($phone)== false){
			return sign.tips("phonetips",'手机号码不正确，请重新输入',"#phone",null);
		}else if(!$code){
			return sign.tips("verifytips",'验证码不能为空', "#verifycode","#emailsbmit");
		}
	});

	$("#emailgetpwd").click(function(){
		var emailreg=/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var $email=$("#email").val();
		var $code=$("#verifycode").val();
		if(!$email){
			 return sign.tips("emailmtips",'邮箱不能为空',"#email", null);
		}else if(emailreg.test($email)== false){
			 return sign.tips("emailmtips",'邮箱格式不正确，请重新输入',"#email",null);
		}else if(!$code){
			 return sign.tips("verifytips",'验证码不能为空', "#verifycode","#emailsbmit");
		}
	});
	/*
	$("#getspeedyForm").delegate("li.info :radio","change",function(){
		$("#tips").addClass("g-d-n").hide();
	})*/

$("#username").on("focus",function(){
	//$(this).next("span").html("请输入11位手机号码").removeClass("right").addClass("cd-tips").show();
	$("#usernametips").html("请输入您的用户名/邮箱/已验证手机").removeClass("right").addClass("cd-tips").show();
});
})
