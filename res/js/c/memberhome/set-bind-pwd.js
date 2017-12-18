/*第三方账号绑定 JS by lg 2013.09.14*/
var pwdreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,20}$/;//数字字母组合，必须包含数字、小写字母或者大写字母
function bindPwdTips(n,t){
	var name = $(n);
	name.next("span").remove();
	name.after(t);
}

function setBindPwd(pwd){//设置新密码
	var pwdInput = $("input:password[name="+pwd+"]"),
		pwdVal = pwdInput.val();
	if( pwdVal == "" || pwdVal == null ){
		bindPwdTips(pwdInput,"<span><b class='b-erro'>错误</b>不能为空</span>");
		return false;
	//}else if( pwdVal.length < 6 || pwdVal.length > 20 ){
	}else if(!pwdreg.test(pwdVal)){
		bindPwdTips(pwdInput,"<span><b class='b-erro'>错误</b>密码须8-20个字符，包含字母和数字</span>");
		return false;
	}else {
		bindPwdTips(pwdInput,"<span><b class='b-succs'>正确</b></span>");
		return pwdVal;
	}
}
function reBindPwd(pwd,repwd){//确认新密码
	var pwdVal = $("input:password[name="+pwd+"]").val(),
		repwdInput = $("input:password[name="+repwd+"]"),
		repwdVal = repwdInput.val();
	if( repwdVal == "" || repwdVal == null ){
		bindPwdTips(repwdInput,"<span><b class='b-erro'>错误</b>不能为空</span>");
		return false;
	}else if( repwdVal !=pwdVal ){
		bindPwdTips(repwdInput,"<span><b class='b-erro'>错误</b>两次密码输入不一致,请重新输入</span>");
		return false;
	}else {
		bindPwdTips(repwdInput,"<span><b class='b-succs'>正确</b></span>");
		return repwdVal
	}
}
function submitBindPwd(pwd,repwd){
	var pwdv = setBindPwd(pwd),
		repwdv = reBindPwd(pwd,repwd);
	if( pwdv && repwdv ){
		$.post(
			csc.url("member","/membercenter/account/bindThird.html"),
			{"password":pwdv,"confirm":repwdv},
			function(data){
				if(!data.status)
					art.dialog({content:data.msg,icon: 'mem-e',time: 1.5,title:false});
				else
					art.dialog({content:"密码设置成功，您的登录账号为："+data.nameAccount,icon: 'mem-c',time: 3,title:false,close: function(){location.reload()}});
			},"jsonp");
	}
}
function tipsPwdFocus(){bindPwdTips("input:password[name=password]","<span><b class='b-tips'>提示</b>密码须8-20个字符，包含字母和数字</span>")}
function tipsPwdBlur(){setBindPwd("password")};
function tipsRepwdFocus(){bindPwdTips("input:password[name=confirm]","<span><b class='b-tips'>提示</b>请重复输入密码</span>")}
function tipsRepwdBlur(){reBindPwd("password","confirm")};