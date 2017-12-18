(function(win){

	var
		win = win,pwdreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,20}$/,//数字字母组合，必须包含数字、小写字母或者大写字母
		tips = function(adress,msg,id) {
			$("#"+adress).removeClass("g-d-n cd-tips g-f-tip g-f-success right").addClass("g-f-error msg").html(msg).show().css("visibility","visible").parent("li.g-d-n").removeClass("g-d-n");
			//alert("dd");
			$(id).is(":disabled") || $(id).focus().select();
			return false;
		},
		option = {
			regxemail:/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
			regNum : /^\d+$/,
			regxphone:/^1\d{10}$/,
			num:60
		},
		countclear = "";
	//还原到初时状态
	function reductionCount(id){
		clearInterval(countclear);
		option.num=60;
		$("#phone,#email,#mem-email,#memphone").prop("disabled", false).removeClass("txt-dis");
		$("#verifycode").prop("disabled", false).removeClass("txt-dis");
		$("#msg-content").hide();
		$("#"+id).val("重新获取验证码").prop("disabled", false).removeClass("btn-dis");
	}
	//倒计时
	function count(id,num) {
		if(num){
			option.num = num;
		}
		var id=id;
		function _c(){
			if(option.num<=0){
				reductionCount(id);
				return;
			 }
			if($("#"+id).length){ $("#"+id).val(option.num+"秒后重新获取");}
			option.num--;
		};
		_c();
		countclear = setInterval(_c,1000);
	}
	function _uniq($pwd){
		var arr=[],l=$pwd.length;
		for(var i=0;i<l;i++){
			arr.push($pwd.charAt(i));
		}
		for(var i=0;i<arr.length;i++){
			for(var j=i+1;j<arr.length;j++){
				if(arr[j]===arr[i]) {
					arr.splice(j,1);
					j--;
				}
			}
		}
		if(arr.length<=1){
			return tips("passwordmtips",'不能使用相同的字母﹑数字或符号作为密码',"",null);
		}
		$("#passwordmtips").addClass("right").html("").show();
		return true;
	}
	//对象的构造函数
	 function sign(){};
	 //密码强度等级
	sign.prototype.level=function(){
	  var $val=$.trim($(this).val());
	  $("div.pwd-level").addClass("g-d-b");
	  $("#passwordmtips").addClass("g-d-n");
	  var l=$val.length;
	  if($val.length>5&&$val.length<=9){
	  	   $("div.pwd-level>span:eq(1)").addClass("level-cur").siblings().removeClass("level-cur");
	  }else if($val.length>10){
		   $("div.pwd-level>span:eq(2)").addClass("level-cur").siblings().removeClass("level-cur");
	  }else if($val.length<=5){
		   $("div.pwd-level>span:eq(0)").addClass("level-cur").siblings().removeClass("level-cur");
	  }
  };
   //手机格式验证
  sign.prototype.phonevaliate=function(){
  	if($(this).is("[readonly]")) return;
	  var $val=$.trim($(this).val());
	 if($val&&option.regxphone.test($val) == false){
		return tips("phonetips",'格式不正确,手机号码为11位数字',"", null);
	  }else if($val&&option.regxphone.test($val)){
		  $("#phonetips").addClass("right").html("");
		  $("#hen-phone").val($val);
	  }
	 };
	 //手机格式验证(会员中心)
	 sign.prototype.memphonevaliate=function(){
		 if($(this).is("[readonly]")) return;
	  var $val=$.trim($(this).val());
	  if(option.regxphone.test($val) == false){
		return tips("phonetips",'格式不正确,手机号码为11位数字',"#memphone", null);
	  }else if(option.regxphone.test($val)){
		    $("#hen-phone").val($val);
		 $("#phonetips").addClass("g-f-success").removeClass("msg g-d-n").html("").show().parent("div").addClass("g-f-success");
	  }
    };
	 //隐藏提示功能
	  sign.prototype.hide=function(event){
		    if (event.keyCode!=13)
			{
			   $("#tips").hide();
			   $(this).next("span").addClass("g-d-n").end().next().children("p").hide();
		    };
	 }
	  sign.prototype.loginhide=function(event){
		    if (event.keyCode!=13)
			{
			   $("#logtips").css("visibility","hidden");
			};
	 }

	 //起用手机获取验证码功能
	 sign.prototype.keyphone=function(event){
		 var $val=$(this).val();
		 if (event.keyCode!=13){
			$("#tips").hide();
			$(this).next().children().hide();
		 };
		if(option.regxphone.test($val)){
			$("#phonetips").removeClass("msg g-f-error").addClass("right g-f-success").html("").parent("div").addClass("g-f-success");
			$("#getCode,#getPhoneCode,#getMemberPhoneCode").prop("disabled", false).removeClass("btn-dis");
		}else{
			$("#phonetips").removeClass("msg right");
			$("#getCode,#getPhoneCode,#getMemberPhoneCode").prop("disabled", true).addClass("btn-dis");
		}

	  };
	   //起用邮箱获取验证码功能
	 sign.prototype.keyemail=function(event){
		 var $val=$(this).val();
		 if (event.keyCode!=13){
			$("#tips").hide();
			$(this).next().children().hide();
		 };
		if(option.regxemail.test($val)){
			$("#emailmtips").removeClass("msg").addClass("right g-f-success").html("").parent("div").addClass("g-f-success");;
			$("#getEmailCode,#getMemberEmailCode").prop("disabled", false).removeClass("btn-dis");
		}else{
			$("#getEmailCode,#getMemberEmailCode").prop("disabled", true).addClass("btn-dis");
		}
	  };
	  //手机获取焦点功能
	 sign.prototype.focusphonetips=function(){
		$("#phonetips").html("请输入11位手机号码").removeClass("right").addClass("cd-tips").show();
	  };
	  //邮箱获取焦点功能
	 sign.prototype.focusemailtips=function(){
		$("#emailmtips").html("请输入您的常用邮箱").removeClass("right").addClass("cd-tips").show();
	  };
	   //邮箱获取焦点功能(会员中心)
	 sign.prototype.focusmememailtips=function(){
		$("#emailmtips").html("请输入您的常用邮箱").removeClass("g-f-error msg g-f-success").addClass("g-f-tip").show();
	  };
	  //验证码获取焦点功能
	 sign.prototype.focusvailtips=function(){
		 if(window.location.href.indexOf("emailreg")!=-1||window.location.href.indexOf("emailpwd")!=-1){
			$(this).next("span").html("请输入邮箱验证码").removeClass("right").addClass("cd-tips").show();
		 }else if(window.location.href.indexOf("phonereg")!=-1||window.location.href.indexOf("phonepwd")!=-1){
			$(this).next("span").html("请输入短信验证码").removeClass("right").addClass("cd-tips").show();
		}
	  };
	  //密码获取焦点功能
	 sign.prototype.focuspwdtips=function(){
		$("#passwordmtips").html("密码须8-20个字符，包含字母和数字").removeClass("right g-f-error").addClass("cd-tips").show();
	 };
	  //密码获取焦点功能
	 sign.prototype.oldfocuspwdtips=function(){
		$("#oldpasswordmtips").html("请输入旧密码").removeClass("right g-f-error").addClass("cd-tips").show();
		$("#passwordmtips").html("").removeClass("right g-f-error").hide();
	 };
	   //找回确认密码获取焦点功能
	 sign.prototype.focusrepwdtips=function(){

		$("#reppasswordmtips").html("请重复输入密码").removeClass("right g-f-error").addClass("cd-tips").show();
	  };

	//邮箱格式验证
	sign.prototype.emailvaliate=function(){
		if($(this).is("[readonly]")) return;
	  var $val=$.trim($(this).val());
	   if($val&&option.regxemail.test($val)==false){
		   return tips("emailmtips",'请输入正确邮箱地址,如：XXX@XXX.com',"", null);
	   }else if($val&&option.regxemail.test($val)){
		  $("#emailmtips").addClass("right").html("");
		    $("#hen-email").val($val);
	  }
    };
	//邮箱格式验证(会员中心)
	sign.prototype.mememailvaliate=function(){
	   if($(this).is("[disabled]")) return;
	   var $val=$.trim($(this).val());
	   if($val&&option.regxemail.test($val)==false){
			return tips("emailmtips",'请输入正确邮箱地址,如：XXX@XXX.com',"", null);
	   }else if($val&&option.regxemail.test($val)){
		   $("#getMemberPhoneCode").prop("disabled", false).removeClass("btn-dis");
		     $("#hen-email").val($val);
		   	$("#emailmtips").addClass("g-f-success").removeClass("msg g-d-n").html("").show() .parent("div").addClass("g-f-success");

	 }
    };
   //手机获取验证码(发送post请求)
	sign.prototype.getpluginPhoneCode=function(){
   	  $("#getPhoneCode").prop("disabled", true).addClass("btn-dis");
	  var $val = $("#phone").val();
	  $("#hen-phone").val($val);
	  $.post("//member.csc86.com/ajax/VCPhone",{"s":$val}, function(data) {
		 if(data.count>3){
			  //$("#phone").prop("readonly", true);
			  $("#msg-content").html("点击超过三次：每天限发送3条验证信息！").addClass("uncon").show().css("visibility","visible");
			  $("#getPhoneCode").prop("disabled",true).addClass("btn-dis");
			  return ;
		  }else if(data.status){
			 $("#msg-content").html("验证码发送成功，如1分钟后仍未收到,请重新获取").removeClass("uncon").show().css("visibility","visible");
			 $("#phone").prop("disabled",true).addClass("txt-dis");
			 $("#verifycode").prop("disabled", false).removeClass("txt-dis").prev().removeClass();
			 count("getPhoneCode");
		  }else{
			alert(data.msg);
		  }
       },"jsonp");
    };
	 //手机获取验证码(发送post请求)
	sign.prototype.getPhoneregCode=function(){
	  $("#getCode").prop("disabled", true).addClass("btn-dis");
	  var hostname=location.host;
	  var $val = $("#phone").val();
	  $("#hen-phone").val($val);
	  var url='//member.csc86.com/ajax/VCPhone';
	  var dataobj={"s":$val};
	  if($('#getCode').is('.newsjyz')){
		  url='//'+hostname+'/getPhoneCode';
		  dataobj={ "type":'phoneRegister',"phoneNumber":$val};
		  }
	  $.post(url,dataobj,function(data) {
		  if(data.count>3){
			  $("#msg-content").html("点击超过三次：每天限发送3条验证信息！").addClass("uncon").show();
			  $("#getCode").prop("disabled", true).addClass("btn-dis");
			  return ;
		  }

		  if(data.expire){
		  	$("#msg-content").html(data.msg).addClass("uncon").show();
		  	$("#phone").prop("disabled",true).addClass("txt-dis");
			$("#verifycode").prop("disabled", false).removeClass("txt-dis").prev().removeClass();
			count("getCode",data.expire);
		  	return;
		  }

		  if(data.status){
		  	 $("#msg-content").html("验证码发送成功，如2分钟后仍未收到,请重新获取").removeClass("uncon").show();
			 $("#phone").prop("disabled",true).addClass("txt-dis");
			 $("#verifycode").prop("disabled", false).removeClass("txt-dis").prev().removeClass();
			 count("getCode",120);
		  }else{
			 $("#phonetips").removeClass().addClass("msg").html(data.msg);
		  }
       },"jsonp");
    };
	 //手机获取验证码(找回密码发送post请求)
	sign.prototype.getPhonepwdCode=function(){
	  $("#getpwdCode").prop("disabled",true).addClass("btn-dis");
	  $.post("/ajax/passphone",{"s":$("#phone").val()},function(data) {
		 if(data.count>3){
			  $("#phone").prop("disabled", true);
			  $("#msg-content").html("点击超过三次：每天限发送3条验证信息！").addClass("uncon").show();
			 // $("#getpwdCode").prop("disabled", true).addClass("btn-dis");
			  return ;
		  }else if(data.status){
		  	 $("#msg-content").html("验证码发送成功，如1分钟后仍未收到,请重新获取").removeClass("uncon").show();
			 $("#phone").prop("disabled",true);
			 count("getpwdCode");
		  }else{
			 $("#phonepwdtips").removeClass("cd-tips right").addClass("msg").html(data.msg);
		  }
       },"jsonp");
    };
	 //邮箱获取验证码(找回密码发送post请求)
	sign.prototype.getEmailpwdCode=function(){
	  $("#getpwdEmailCode").prop("disabled", true).addClass("btn-dis");
	  var $val = $.trim($("#email").val()),index =$val.indexOf("@"),url="http://mail." + $val.substr(index+1),posturl;
		$("#hen-email").val($val);
	  $.post("/ajax/passemail",{"s":$("#email").val()},function(data) {
		  if(data.status){
			  $("#email").prop("disabled",true);
			  $("#msg-content").show().find("a").attr("href",url);
			 count("getpwdEmailCode");
			}else{
			 $("#emailmtips").removeClass("cd-tips right").addClass("msg").html(data.msg);
		  }
       },"jsonp");
    };
	//手机会员中心获取验证码(发送post请求)
	sign.prototype.getMemberPhoneCode=function(){
	    $("#getMemberPhoneCode").prop("disabled",true).addClass("btn-dis");
		var $val = $("#memphone").val(),url,t=1;
		$("#hen-phone").val($val);
		/*修改验证手机*/
		if(window.location.href.indexOf("getphoneold")!=-1){
			url="/ajax/verifyPhone";
			t=0;
		}
		/*if(window.location.href.indexOf("getphonenew")!=-1){
			//url="/membercenter/getphonenew/getPhoneVerifyCode";
		}*/
		$.post(url||"/ajax/verifyPhone",{"s":$val,"t":t}, function(data) {
		  if(data.count>3){
			  $("#memphone").prop("readonly", true);
			  $("#msg-content").html("点击超过三次：每天限发送3条验证信息！").addClass("uncon").css("visibility","visible").show();
			  $("#getMemberPhoneCode").prop("disabled", true).addClass("btn-dis");
			  return ;
		  }else if(data.status){
			 $("#msg-content").html("验证码发送成功，如1分钟后仍未收到,请重新获取").removeClass("uncon").css("visibility","visible").show();
			 $("#memphone").prop("disabled",true).addClass("txt-dis");
			 count("getMemberPhoneCode");
			 $("#verifycode").prop("disabled",false).removeClass("txt-dis");
		  }else{
			  return tips("phonetips",data.msg,"#phone", null);
		  }
       },"jsonp");
    };
	//邮箱会员中心获取验证码(发送post请求)
	sign.prototype.getMemberEmailCode=function(){
		$("#getMemberEmailCode").prop("disabled", true).addClass("btn-dis");
		var $val = $.trim($("#mem-email").val()),index =$val.indexOf("@"),url="http://mail." + $val.substr(index+1),posturl;
		$("#hen-email").val($val);
		/*修改验证邮箱*/
		if(window.location.href.indexOf("getemailold")!=-1){
			posturl="/ajax/PassEmail";
		}
		if(window.location.href.indexOf("getemailnew")!=-1){
			//posturl="/membercenter/getemailnew/getEmailVerifyCode";
		}
		$.post(posturl||"/ajax/VCEmail",{"s":$("#mem-email").val()}, function(data) {
			if(data.status){
				$("#msg-content").show().css("visibility","visible");
				$("#mem-email").prop("disabled",true).addClass("txt-dis");
				$("#verifycode").prop("disabled",false).removeClass("txt-dis");
				$("#msg-content").show().find("a").attr("href",url);
				count("getMemberEmailCode");
			}else{
				return tips("emailmtips",data.msg,"#email", null);
			}
       },"jsonp");
    };
	 //邮箱获取验证码(发送post请求)
	sign.prototype.getEmailCode=function(){
		$("#getEmailCode").prop("disabled", true).addClass("btn-dis");
		var $val = $.trim($("#email").val()),index =$val.indexOf("@"),url="http://mail." + $val.substr(index+1);
		$("#hen-email").val($val);
		$.post("/ajax/VCEmail",{"s":$("#email").val()}, function(data) {
		    if(data.status){ $("#msg-content").show().find("a").attr("href",url);
			 $("#email").prop("disabled",true).addClass("txt-dis");
			 $("#verifycode").prop("disabled", false).removeClass("txt-dis").prev().removeClass();
			 count("getEmailCode");
			}else{
		    $("#getEmailCode").prop("disabled", false).addClass("btn-dis");
			return tips("emailmtips",data.msg,"", null);
		  }
       },"jsonp");
    };

    sign.prototype.usernametips=function(){//用户名认证
    	$("#usernametips").html("5-25个字符，一个汉字为两个字符，不能为纯数字").removeClass("right g-f-error").addClass("cd-tips").show();
    };

    sign.prototype.usernamevaliate=function(){//用户名认证
    	var username = $.trim($("#username").val());
    	if(username == ""){
    		return tips("usernametips","不能为空");
    	}
    	var rlength = /[\u4e00-\u9fa5]/.test(username) ? username.length + username.match(/[\u4e00-\u9fa5]/g).length : username.length;
    	if(25 < rlength || rlength < 5){
    		return tips("usernametips","会员名需在5-25个字符范围内");
    	}
    	if(/^\d+$/.test(username)){
			return tips("usernametips","不能全为数字");
    	}
    	if(/^_/.test(username) || /_$/.test(username)){
    		return tips("usernametips","会员名首位与末位不能为下划线");
    	}
    	if(!/^[\da-z\u4e00-\u9fa5_]+$/i.test(username)){
			return tips("usernametips","包含特殊字符");
    	}
		//$("#usernametips").addClass("right").html("");
		return true;
    };

	sign.prototype.repeatName = function(){//验证用户名是否重复
		var username = $.trim($("#username").val()), v = csc.sign.usernamevaliate();
		if(v){
			$.ajax({
				url:csc.url("member","/ajax/checkUser.html"),
				type:"POST",
				data:{"account":username},
				dataType:"jsonp",
				async:false,
				beforeSend: function(data){
					$("#usernametips").addClass("loading").empty().show();
					$("#username").attr("disabled","disabled");
				},
				success: function(data){
					if(data.status){
						$("#usernametips").removeClass("loading").addClass("right").html("");
						$("#username").removeAttr("disabled");
					}else{
						$("#usernametips").removeClass("loading");
						$("#username").removeAttr("disabled");
						v = false;
						return tips("usernametips",data.msg);
					}
				}
			});
		};
		return v;
	};

    sign.prototype.rcodevaliate = function(){//验证码认证
    	var code = $("#rcode").val();
    	if(code == ""){
    		return tips("rcodetips","不能为空");
    	}
    	if(code.length != 4){
    		return tips("rcodetips","验证码长度不正确");
    	}
    	$("#rcodetips").removeClass().html("");
    };

	 //密码验证
	sign.prototype.pwdvaliate=function(){
	    var $val=$.trim($("#password,#firpassword").val());
	    var l=$val.length;
		if($val == ""){
			return tips("passwordmtips","不能为空");
		//}else if(($val&&l<8)||($val&&l>20)){
		}else if(!pwdreg.test($("#password,#firpassword").val())){
		  	return tips("passwordmtips",'密码须8-20个字符，包含字母和数字');
		}else{
			if($val){
				return _uniq($val);
			}
		}
  };
  //确认密码密码验证
	sign.prototype.repwdvaliate=function(){
		var $valpass=$.trim($("#password").val())||$.trim($("#firpassword").val());
		var $valreppass=$.trim($("#repassword").val());
		if($valreppass == ""){
			return tips("reppasswordmtips","不能为空");
		}/*else if($valpass&&($valpass.length<6||$valpass.length>20)){
			 return tips("passwordmtips","密码长度为6-20位", "",null);
		}else if(!$valpass&&$valreppass){
			return tips("reppasswordmtips","请先输入正确的密码", "",null);
		}else if($valpass&&!$valreppass){
			return tips("reppasswordmtips","确认密码不能为空", "",null);
		}*/else if($valpass!=$valreppass){
			return tips("reppasswordmtips","两次密码输入不一致,请重新输入");
		}else if($valpass===$valreppass){
			$("#reppasswordmtips").addClass("right").html("");
		}
		//$("#reppasswordmtips").hide();
	 };

   //验证码验证
	sign.prototype.vailphonevaliate=function(){
	    var $val=$.trim($(this).val());
		var l=$val.length;
		 if($val&&l>6){
		  	return tips("verifytips",'验证码输入有误',null,null);
		}else if($val&&l<=6&&option.regNum.test($val)){
			$("#verifytips").removeClass("msg g-f-error").addClass("right g-f-success").html("").parent("div").addClass("g-f-success");;
		}
  };
	//登录验证
	sign.prototype.submitlog=function (){
		var
			$loginName=$.trim($("#loginName").val()),
			$password=$.trim($("#passwordlog").val());
		if ((!$loginName || $loginName == $("#loginName").attr("placeholder"))&&!$password) {
			return tips("logtips",'请输入帐号和密码', "#loginName",null);
		}else if (!$loginName || $loginName == $("#loginName").attr("placeholder")) {
			return tips("logtips",'请输入帐号', "#loginName",null);
		} else if (!$password) {
			return tips("logtips",'请输入密码', "#passwordlog",null);
		}
		if($("#code").length>0){
			var $code=$.trim($("#code").val());
			if (!$code) {
				return tips("logtips",'请输入验证码', "#code",null);
			}
		};

	};

	sign.prototype.reg = function(){//注册第一步
		if(sign.prototype.repeatName() == false || this.pwdvaliate() == false || this.repwdvaliate() == false || this.rcodevaliate() == false){
			return false;
		}
		if(!$("#accord").is(":checked")){
			tips("tips",'需同意《华南城网服务条款》和《华南城网在线交易平台服务协议》才能注册会员',null,null);
			return false;
		}
	};

	//手机注册验证(submit提交)
	sign.prototype.submitreg=function (){
		var $val=($("#memphone").length&&$.trim($("#memphone").val()))||($("#phone").length&&$.trim($("#phone").val())),$pwd=$.trim($("#password").length&&$("#password").val()),respasswd=$.trim($("#repassword").val()),l=$pwd.length,hostname=location.host;
		var flag=true,ped=true;

		if (!$val || $val == '请输入手机号') {
			flag=tips("phonetips",'请输入11位手机号码', "",null);
		}else if(option.regxphone.test($val) == false){
			flag=tips("phonetips",'格式不正确,手机号码为11位数字',"",null);
		}
		if (!$.trim($("#verifycode").val())){
			flag=tips("verifytips",'请输入短信验证码', "",null);
		} else if ($.trim($("#verifycode").val()).length!=6){
			flag=tips("verifytips",'验证码输入有误,请重新输入', "",null);
		 }



		if($("#password").length&&!$pwd) {
			 flag=tips("passwordmtips",'请输入密码', "",null);
		//}else if($("#password").length&&l<6){
		}else if(!pwdreg.test($("#password").val())){
			 flag=tips("passwordmtips",'密码须8-20个字符，包含字母和数字', "",null);
		}else if($("#repassword").length&&!respasswd){
			 flag = tips("reppasswordmtips","确认密码不能为空", "",null);
		}else if(respasswd.length&&respasswd!==$pwd){
			 flag = tips("reppasswordmtips",'两次密码输入不一致,请重新输入', "",null);
		}else if($("#accord").length&&!$("#accord").is(":checked")){
			flag = tips("tips",'需同意《华南城网服务条款》和《华南城网在线交易平台服务协议》才能注册会员',null,null);
		}else{
			if($("#password").length){
				ped= _uniq($pwd);
			}
		}
		if(!flag){
			return false;
		}else if(!ped)
		{
			return false;
		}else{
			$("#phonesbmit").prop("disabled", true).val("注册中...");
			
			if($('#newPhoBid')[0]){
				 $.post('//'+hostname+'/mobileVerificationLogin',{"phoneNumber":$val,"code":$('#verifycode').val()}, function(data) {
					 if(data.status){
						location.href=location.href;
						 }else{
						alert(data.msg);
						  $("#phonesbmit").prop("disabled", false).val("提交");
						  return false;
						 };
					 },'jsonp');
					 return false;
				}
		}
	};
	//邮箱注册验证(submit提交)
	sign.prototype.submitemail=function() {
		var $email=$.trim($("#email").val())||$.trim($("#mem-email").val()),$verify = $.trim($("#verifycode").val()),respasswd=$.trim($("#repassword").val()),$pwd=$.trim($("#password").length&&$("#password").val());
		var flag=true,ped=true;
		if($("#password").length){$pwd=$.trim($("#password").val()),l=$pwd.length};
		if (!$email || $email == '请输入邮箱') {
			flag = tips("emailmtips",'请输入邮箱地址', "",null);
		}else if(option.regxemail.test($email)==false){
			flag = tips("emailmtips",'请输入正确邮箱地址,如：XXX@XXX.com',"", null);
	    }
		if (!$verify){
			flag = tips("verifytips",'请输入邮箱验证码', "",null);
		} else if ($verify&&$verify.length!=6) {
			flag = tips("verifytips",'验证码输入有误,请重输入', "",null);
		}
		if($("#password").length&&!$pwd){
			flag = tips("passwordmtips",'请输入密码', "",null);
		//}else if($("#password").length&&l<6){
		}else if(!pwdreg.test($("#password").val())){
		  	flag = tips("passwordmtips",'密码须8-20个字符，包含字母和数字', "",null);
		}else if(respasswd.length&&!respasswd){
			 flag = tips("reppasswordmtips","确认密码不能为空", "",null);
		}else if($("#repassword").length&&respasswd!==$pwd){
			 flag=tips("reppasswordmtips",'两次密码输入不一致,请重新输入', "",null);
		}else if($("#accord").length&&!$("#accord").is(":checked")){
			flag= tips("tips",'需同意《华南城网服务条款》和《华南城网在线交易平台服务协议》才能注册会员',null,null);
		}else{
			if($("#password").length){
				ped= _uniq($pwd);
			}
		}
		if(!flag){
			return false;
		}else if(!ped){
			return false;
		}else{
			$("#emailsbmit").prop("disabled", true).val("注册中...");
		}

	};
	//找回密码成功（修改密码验证）
	sign.prototype.modifypwd=function() {
		var $valpass=$.trim($("#firpassword").val());
		var $valreppass=$.trim($("#repassword").val());
		var $oldppass=$.trim($("#oldpassword").val());
		var msg=$.trim($("#oldmsg").val());
		if($("#oldpassword").length>0&&!$oldppass){
		// if(!pwdreg.test($oldppass)){
			return tips("oldpasswordmtips","请输入旧的密码", "",null);
		}else if(!$valpass&&!$valreppass){
			return tips("passwordmtips","请输入密码", "",null);
		//}else if($valpass&&$valpass.length<6){
		}else if(!pwdreg.test($valreppass)){
			 return tips("passwordmtips","密码须8-20个字符，包含字母和数字", "",null);
		}else if(!$valpass&&$valreppass){
			return tips("reppasswordmtips","请先输入正确的密码", "",null);
		}else if($valpass&&!$valreppass){
			return tips("reppasswordmtips","确认密码不能为空", "",null);
		}else if($valpass!=$valreppass){
			return tips("reppasswordmtips","两次密码输入不一致,请重新输入", "",null);
		}else{
			return _uniq($valpass);
		}
	};
	if(!win["csc"]["sign"]){
		win["csc"]["sign"]=new sign();
	}
	csc.sign.hidepwd=function(){
			//csc.sign.hide();
			var $valpass=$.trim($("#password").val())||$.trim($("#firpassword").val()),$valreppass=$.trim($("#repassword").val());
		if($valpass===$valreppass){
			$("#reppasswordmtips").addClass("right").html("");
		}else{
			$("#reppasswordmtips").html("请重复输入密码").removeClass("right").addClass("cd-tips").show();
		}
	}

//	win["count"]=count;

	var msg=$.trim($("#oldmsg").val()),newmsg=$.trim($("#newmsg").val());
	if(msg){
		return tips("oldpasswordmtips",msg, "#oldpassword",null);
	}else if(newmsg){
		return tips("passwordmtips",newmsg, "#oldpassword",null);
	}
})(window);



function reCaptcha(id,w,h){
	var
		id = id || "#J_captcha",
		$id = $(id),
		w = w || $id.width(),
		h = h || $id.height(),
		src = $id.attr('src'),
		t = (new Date).getTime();
	src = /\?/.test(src) ? /t=.+?/.test(src) ? src.replace(/t=\d+/, 't=' + t) : src + '&t=' + t : (src + '?w=' + w + '&h=' + h + '&t=' + t);
	$(id).attr("src", src);
}

$(function(){
	//密码验证（失去焦点触发验证）
	$("#password,#firpassword").on({"keyup":csc.sign.level,"blur":csc.sign.pwdvaliate,"focus":csc.sign.focuspwdtips});
	//密码验证（失去焦点触发验证）
	$("#firpassword").on({"keyup":csc.sign.hide,"focus":csc.sign.focuspwdtips});
	$("#oldpassword").on({"keyup":csc.sign.hide,"focus":csc.sign.oldfocuspwdtips});
	$("#repassword").on({"focus":csc.sign.focusrepwdtips,"blur":csc.sign.repwdvaliate});
	$("#repassword").on({"keyup":csc.sign.hidepwd});
	//手机格式验证（失去焦点触发验证）
	$("#phone").on({"blur":csc.sign.phonevaliate,"keyup":csc.sign.keyphone,"focus":csc.sign.focusphonetips});
	//手机格式验证（失去焦点触发验证）
	$("#memphone").on({"blur":csc.sign.memphonevaliate,"keyup":csc.sign.keyphone});
	//邮箱格式验证（失去焦点触发验证）
	$("#email").on({"blur":csc.sign.emailvaliate,"keyup":csc.sign.keyemail,"focus":csc.sign.focusemailtips});
	//邮箱格式验证（失去焦点触发验证）
	$("#mem-email").on({"blur":csc.sign.mememailvaliate,"keyup":csc.sign.keyemail,"focus":csc.sign.focusmememailtips});
	$("#verifycode").on({"focus":csc.sign.focusvailtips,"blur":csc.sign.vailphonevaliate});
	//发送post请求获取手机验证码
	$("#getPhoneCode").on("click",csc.sign.getpluginPhoneCode);
	$("#getCode").on("click",csc.sign.getPhoneregCode);
	$("#getpwdCode").on("click",csc.sign.getPhonepwdCode);
	$("#getpwdEmailCode").on("click",csc.sign.getEmailpwdCode);
	//发送post请求获取邮箱验证码
	$("#getEmailCode").on("click",csc.sign.getEmailCode);
	//发送post请求获取会员中心手机验证码
	$("#getMemberPhoneCode").on("click",csc.sign.getMemberPhoneCode);
	//发送post请求获取会员中心邮箱验证码
	$("#getMemberEmailCode").on("click",csc.sign.getMemberEmailCode);
	$("#passwordlog,#code,#loginName").on({"keyup":csc.sign.loginhide});

	//用户名
	$("#username").bind({"focus":csc.sign.usernametips,"blur":csc.sign.repeatName});

	//注册验证码
	$("#rcode").bind("blur",csc.sign.rcodevaliate);

	if (location.pathname === '/poplogin') {
		$('#into').attr('action', 'dopoplogin' + location.search);
	}
});