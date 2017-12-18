/* Cookie操作 */

document.domain = csc.url().replace(location.protocol + "//","").replace(":"+location.port,"");
/*
* 修改/添加Cookie
* name Cookie值的名称
* value 值
* minute 保存时间(分钟) 默认10分钟
* domain 有效域 默认当前域
*/
csc.setCookie = function (name, value, minute, domain) {
	var	minute = minute || 10,
			expire =";expires=" + (new Date((new Date()).getTime() + minute * 60000)).toGMTString();
			if(minute<0.1){
			document.cookie = name + "=" + escape(value || "") +";path=/;domain="+(domain || document.domain);
				}else{
			document.cookie = name + "=" + escape(value || "") + expire +";path=/;domain="+(domain || document.domain);	
	
					}
	
	return this;
};

//获取指名称的Cookie值
csc.getCookie = function (name) {
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
};

//删除指名称的Cookie
csc.delCookie = function (name){
	this.setCookie(name,null,-1);
	return this;
};