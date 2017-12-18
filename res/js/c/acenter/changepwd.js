// 账户中心 修改密码JS by lg 2013.07.12
$(function(){
	$("#submitChangedPwd").bind("click",function(){$("#setpwd_form").trigger("submit");});
	$("#oldPwd").bind("blur",function(){verifyChangePwd.oldPwd(this);});
	$("#newPwd").bind("blur",function(){verifyChangePwd.newPwd(this);});
	$("#reNewPwd").bind("blur",function(){
		verifyChangePwd.samePwd(this);
		verifyChangePwd.comparePwd($("#newPwd").val(),$("#reNewPwd").val(),this);
		
	});
});
var verifyChangePwd = {
	verifyTips :function(){//自定义错误信息
		var html = {
			"html":"<span class='ver-tips'></span>",
			"erroIcon":"<b class='erro_icon'></b>",
			"oldPwdBlank":"登录密码不能为空",
			"newPwdBlank":"支付密码不能为空",
			"notSame":"两次输入密码不一致",
			"oldFormatPwd":"登录密码格式不正确，在6-20位之间",
			"newFormatPwd":"支付密码格式不正确，在8-20位之间",
			"longtxt":"只能是数字加字母，不能与登录密码相同"
		};
		return html;
	},
	oldPwd : function(id){//旧密码验证
		var id = id , oldVal = $.trim($(id).val()) , tips = verifyChangePwd.verifyTips();
			tipsClass = $(tips["html"]).attr("class");
			$(id).next().remove("."+tipsClass);
		if( oldVal == "" || oldVal == null || oldVal == "undefined" ){
			$(id).after($(tips["html"]).append(tips["erroIcon"]).append(tips["oldPwdBlank"]));
			return false;
		}else if( oldVal.length < 6 || oldVal.length > 20 ){
			$(id).after($(tips["html"]).append(tips["erroIcon"]).append(tips["oldFormatPwd"]));
			return false;
		}else{
			return true;
		}
	},
	newPwd : function(id){//支付密码验证
		var id = id ,
			newPwdVal = $(id).val() ,
			v = verifyChangePwd.verifyNewPwd(id,newPwdVal);
		if (v){
			return newPwdVal;
		}else{
			return false;
		}
	},
	samePwd : function(id){//支付密码验证2
		var id = id , samePwd = $(id).val(), v = verifyChangePwd.verifyNewPwd(id,samePwd);
		if (v){
			return samePwd;
		}else{
			return false;
		}
	},
	verifyNewPwd : function(id,str){
		var regStr = new RegExp(/^([0-9]{8,20})$|^([a-z]{8,20})$|^([A-Z]{8,20})$/) , 
			v = str , 
			s = regStr.test(v) ,
			tips = verifyChangePwd.verifyTips() ,
			tipsClass = $(tips["html"]).attr("class");
			$(id).next().remove("."+tipsClass);
		if( v == "" || v == null || v == "undefined" ){
			$(id).after($(tips["html"]).append(tips["erroIcon"]).append(tips["newPwdBlank"]));
			return false;
		}else {
			if( !s ) {
				if( str.length >= 8 && str.length <= 20 ){
					return true;
				}else {
					$(id).after($(tips["html"]).append(tips["erroIcon"]).append(tips["newFormatPwd"]));
					return false;
				}
			}else {
				$(id).after($(tips["html"]).append(tips["erroIcon"]).append(tips["longtxt"]));
				return false;
			}
		}
	},
	comparePwd : function(a,b,c){
		var tips = verifyChangePwd.verifyTips() ,
			tipsClass = $(tips["html"]).attr("class") ,
			p1 = verifyChangePwd.verifyNewPwd(c,a) ,
			p2 = verifyChangePwd.verifyNewPwd(c,b);
			$(c).next().remove("."+tipsClass);
		if( p1 && p2 ){
			if( a == b ){
				return true;
			}else{
				$(c).after($(tips["html"]).append(tips["erroIcon"]).append(tips["notSame"]));
				return false;
			}
		}else{
			$(c).after($(tips["html"]).append(tips["erroIcon"]).append(tips["notSame"]));
			return false;
		};
	},
	submitChangedPwd : function(oldPwd,newPwd,reNewPwd){//提交表单
		var oldPwd = oldPwd , newPwd = newPwd , reNewPwd = reNewPwd ,
			oldVal = verifyChangePwd.oldPwd(oldPwd) ,
			newPwdVal = verifyChangePwd.newPwd(newPwd) ,
			samePwd = verifyChangePwd.samePwd(reNewPwd);
		if( oldVal && newPwdVal && samePwd ){
			if( !verifyChangePwd.comparePwd(newPwdVal,samePwd,reNewPwd) ){
				return false;
			}else{return true;}
		}else{return false;}
	}
}