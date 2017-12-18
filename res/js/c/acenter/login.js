// 账户中心登录页面 by lg 2013.07.12

$(function(){
	$("#submitLogin").bind("click",function(event){
		$("#login_form").trigger("submit");
		event.preventDefault();
	});
});

var verifyLogin = {
	verifyLoginName : function(loginName){
		var loginName = $.trim($(loginName).val());
		if( loginName != "" && loginName != null && loginName != "undefined" ){
			return true;
		}else{return false;}
	},
	verifyLoginPwd : function(loginPwd){
		var  loginPwd = $.trim($(loginPwd).val());
		if( loginPwd != "" && loginPwd != null && loginPwd != "undefined" ){
			return true;
		}else{return false;}
	},
	verifyYzm : function(Yzm,form){
		var  yzm = $.trim($(Yzm).val()) , Form = form , l = $(Form).find(Yzm).length;
		if( l > 0 ){
			if( yzm != "" && yzm != null && yzm != "undefined" ){
				return true;
			}else{return false;}
		}else{
			return true;
		}
	},
	submitLogin : function(loginName,loginPwd,Yzm,loginForm){
		var tipsName = "<span class='ver-tips'><b class='erro_icon'></b>账号不能为空</span>" ,
			tipsPwd = "<span class='ver-tips'><b class='erro_icon'></b>密码不能为空</span>" ,
			tipsYzm = "<span class='ver-tips'><b class='erro_icon'></b>验证码不能为空</span>" ,
			name = verifyLogin.verifyLoginName(loginName) ,
			pwd = verifyLogin.verifyLoginPwd(loginPwd) ,
			yzm = verifyLogin.verifyYzm(Yzm,loginForm) ,
			Name = $(loginName) , Pwd = $(loginPwd) , Yzm = $(Yzm) , Form = $(loginForm);
			Name.next().remove(".ver-tips");
			Pwd.next().remove(".ver-tips");
			Yzm.parent("li").children().remove("span.ver-tips");
		if( !name || !pwd || !yzm ){
			if(!name){
				Name.after(tipsName);
			}if(!pwd){
				Pwd.after(tipsPwd);
			}if(!yzm){
				Yzm.parent("li").append(tipsYzm);
			}
			return false;
		}else{return true;}
	}
}
function reCaptcha(id, w, h) { //刷新验证码
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