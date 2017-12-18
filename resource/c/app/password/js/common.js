var hastouch = "ontouchstart" in window?true:false,
	touchStart= hastouch?"touchstart":"mousedown",
	touchMove= hastouch?"touchmove":"mousemove",
	touchEnd = hastouch?"touchend":"mouseup";
	window.addEventListener('load', function(){
	   setTimeout(function(){ window.scrollTo(0, 1); }, 100);
	},false);	
	var browser={
		versions:function(){ 
			   var u = navigator.userAgent, app = navigator.appVersion; 
			   return {//移动终端浏览器版本信息 
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				};
			 }(),
			 language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	function hostPost(url,type,callback){
			var xmlhttp;
			if (window.XMLHttpRequest){
			  xmlhttp=new XMLHttpRequest();
			  }
			else{
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function(){
			  if (xmlhttp.readyState==4 && xmlhttp.status==200){	
					var data=new Function('return'+xmlhttp.responseText)();
					if(callback){
						callback(data);					
					}
				}
			  }	
			if(type.method == "get" || type.method == "GET"){
				xmlhttp.open("GET",url,true);
				xmlhttp.send();
			}else{
				xmlhttp.open("POST",url,true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
				xmlhttp.send(type.data);
			}
	}	
	
	function getCookie(c_name)
{
if (document.cookie.length>0)
{ 
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1)
{ 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}