define(function (require, exports, module) {
	require("./text_psd_ex").login_psd_eActiveObj(".login_psd_e");//密码与字符串转换
	var sign= require("./loginAndRegisterRex");//引入注册公用代码
	var hostmap=seajs.hostmap;//域名配置
	var _new_sign=new sign();
	var weixins = require("./weixin"); //判断是不是微信浏览器
	$(function(){
			if(weixins.isWeiXin()){
				$(".login_wei_parent").show()
			}else{
				$(".login_wei_parent").hide()
			}
		//发送post请求submit
		$("#login_userSubmit").on("click",function(){
			_new_sign.login_submit("//" + hostmap.test + "/member/toLogin","#login_userSubmit","登录中...","登录成功!","完成")
		});
		//第三方登录
		$(".login_wei_parent").on("click",function(){
			_new_sign.login_wei_parent("//" + hostmap.test + "/member/thirdLogin?source=WX")
		});


	});
});