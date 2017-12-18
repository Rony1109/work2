/*
* 登陆后动态刷新页面内容
* author why
* Date: 2012.11.28 10:34 
*/

csc.usermsg = csc.usermsg || {};

/**未读消息个数刷新
selector 要替换HTML的对像选择器 默认为".web-top>.g-o-a>span>a:eq(1)" 即顶部横条未读消息; 
str_mod 替换HTML的模版 默认为 "消息({0})"
callback 回调函数function(data){} data为json对像,格式为 {"status":true,"data":{"count":7}}
**/
csc.usermsg.unreadmsg = function(selector,str_mod,callback){
	$.get("//api.csc86.com/member/messagecount.html?type=json","",function(data){
		var nub = data.data.count;
		var select_str = selector || ".web-top>.g-o-a>span>a:eq(1)";
		var	htm_mod = str_mod || "消息({0})"
		if(nub != nub ){return;};
		var s_html;
		s_html = htm_mod.replace("{0}",nub);
		$(select_str).html(s_html);
		if(typeof(callback)=="function"){callback(data);}
	},"jsonp");
};

/**未读收到的报价个数刷新
selector 要替换HTML的对像选择器 默认为".log-mess>li:eq(0)>a:eq(0) em" 即首页登录块的 收到报价;
str_mod	替换HTML的模版 默认为 "({0})"
callback 回调函数function(data){} data为json对像,格式为 {"status":true,"data":{"count":7}}
**/
csc.usermsg.offermsg = function(selector,str_mod,callback){
	var select_str = selector || ".log-mess>li:eq(0)>a:eq(0) em";
	$.get("//api.csc86.com/member/purchasecount.html?type=json",function(data){
		var nub = data.data.count;
		if(nub != nub ){return;}
		var s_html;
		if(typeof(str_mod) != "" && str_mod){
			s_html = str_mod.replace("{0}",nub);
		}else{
			s_html = nub;
		}
		$(select_str).html(s_html);
		if(typeof(callback)=="function"){callback(data);}
	},"jsonp");
};

