
	//依据名字获取cookie的值
	function td_getCookieValue(cookieName)  
	 {  
	     var cookieValue = document.cookie;  
	     var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");  
	     if(cookieStartAt==-1)  
	     {  
	         cookieStartAt = cookieValue.indexOf(cookieName+"=");  
	     }  
	     if(cookieStartAt==-1)  
	     {  
	         cookieValue = null;  
	     }  
	     else  
	     {  
	         cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;  
	         cookieEndAt = cookieValue.indexOf(";",cookieStartAt);  
	         if(cookieEndAt==-1)  
	         {  
	             cookieEndAt = cookieValue.length;  
	         }  
	         cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1
	     }  
	     return cookieValue;  
	 } 
	//同盾用于获取WEB端登入设备的信息脚本,该文件在本模块不起作用,用于部署到前端JS服务器上，需要的模块直接依据JS文件服务路径直接引用进来使用，本模块该文件只做原始文件样本
	(function() {
        _fmOpt = {
            partner: 'csc86',
            appName: 'csc86_web',
            token: td_getCookieValue('sessionId')};
        var cimg = new Image(1,1);
        cimg.onload = function() {
            _fmOpt.imgLoaded = true;
        };
        cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=csc86&appName=csc86_web&tokenId=" + _fmOpt.token;
        var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
        fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
    })();
	