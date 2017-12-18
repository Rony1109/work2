/*statistics.js为全站通用统计代码，statistics2.js为部分子站统计代码其中www.1668dmg.com已用到statistics2.js*/

(function() {
	
	//设置cookie
	var setCookie = (function (cookieName,value,expiretimes){
		var exdate = new Date();
		exdate.setTime(exdate.getTime()+expiretimes);
		document.cookie=cookieName+ "=" +escape(value)+";path=/;domain=.csc86.com;"+
		((expiretimes==null) ? "" : ";expires="+exdate.toGMTString());//需要设置domain要不然到了每个子域名下cookie值又不一样
	});
	
	//获取cookie
	var getCookie = (function (cookieName){
		if (document.cookie.length>0){
			  c_start=document.cookie.indexOf(cookieName + "=");
			  if (c_start!=-1){
				    c_start=c_start + cookieName.length+1; 
				    c_end=document.cookie.indexOf(";",c_start);
				    if (c_end==-1) c_end=document.cookie.length
				    return unescape(document.cookie.substring(c_start,c_end))
			  } 
			  return "";
		}
		return "";
	});
	
	//生成uuid
	var createUUID = (function (uuidRegEx, uuidReplacer) {
	     return function () {
	         return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
	     };
	 })(/[xy]/g, function (c) {
	     var r = Math.random() * 16 | 0,
	         v = c == "x" ? r : (r & 3 | 8);
	     return v.toString(16);
	 });
	
	//生成sessionid
	var createSessionId = (function () {
		var reg=new RegExp("-","g");
		return createUUID().replace(reg,"").toLowerCase();
	});
	
    var getParam=function(){  
        var sc = document.getElementsByTagName("script"); 
        var src = sc[sc.length-1].src;
        if(src.indexOf("?") > 0){
        	var params = src.split("?")[1].split("&");  
            var args={};  
            for(var i=0;i<params.length;i++){  
                var param = params[i].split("=");  
                var key = param[0];  
                var val = param[1];  
                if(typeof args[key] == "undefined"){  
                    args[key] = val;  
                }else if(typeof args[key]=="string"){  
                    args[key]=[args[key]];  
                    args[key].push(val);  
                }else{  
                    args[key].push(val);  
                }  
            }  
            return args;      
        }
        return {};
    }  
	
	var now = new Date();
	var _gtra = "";
	var _gtrb = "";
	var _gtrc = "";
	_gtra = getCookie("_gtra");
	_gtrb = getCookie("_gtrb");
	_gtrc = getCookie("_gtrc");
	if(_gtra != "") {
		//同一次会话中
		if(_gtrb != "" && _gtrc != ""){
			var pageNumStr = _gtrb.substring(_gtrb.lastIndexOf('.')+1,_gtrb.length);
			var pagetNum = Number(pageNumStr)+1;
			_gtrb = _gtrb.substring(0,_gtrb.indexOf('.')+1)+now.getTime()+'.'+pagetNum;
			setCookie("_gtrb",_gtrb,1000*60*30);

		//新会话	
		}else {
			var sessionId = createSessionId();
			var visitNumStr = _gtra.substring(_gtra.lastIndexOf('.')+1,_gtra.length);
			var visitNum = Number(visitNumStr)+1;
			_gtra = _gtra.substring(0,_gtra.lastIndexOf('.')+1)+visitNum;
			_gtrb = sessionId+"."+now.getTime()+"."+"1";
			_gtrc = sessionId;
			setCookie("_gtra",_gtra,1000*60*60*24*365*2);
			setCookie("_gtrb",_gtrb,1000*60*30);
			setCookie("_gtrc",_gtrc,null);
			
		}
	//第一次访问	
	}else{
		var sessionId = createSessionId();
		var uuid = createUUID();
		_gtra = uuid+'.'+now.getTime()+'.1';
		_gtrb = sessionId+"."+now.getTime()+"."+"1";
		_gtrc = sessionId;
		setCookie("_gtra",_gtra,1000*60*60*24*365*2);
		setCookie("_gtrb",_gtrb,1000*60*30);
		setCookie("_gtrc",_gtrc,null);
	}
	
	var uuid = getCookie("log_uuid");
	if(uuid == ""){
		uuid = createUUID();
		setCookie("log_uuid",uuid,1000*60*60*24*365*2);
	}
	//开始收集数据
	var params = {}; 
	params.gtra = _gtra;
	params.gtrb = _gtrb;
	params.gtrc = _gtrc;
	params.uuid = uuid;
	var memberId = getParam().memberId;
	var evip = getParam().evip;
	var category = getParam().category;
	var tradeIds=getParam().tradeIds;
	var shopAddTime=getParam().shopAddTime;
	var productAddTime=getParam().productAddTime
	if(memberId != null && memberId != ''){
		params.memberId = memberId;
	}
	if(evip!=null && evip!=''){
		params.evip=evip;
	}
	if(category!=null && category!=''){
		params.category=category;
	}
	if(tradeIds!=null && tradeIds!=''){
		params.tradeIds=tradeIds;
	}
	if(shopAddTime!=null && shopAddTime!=''){
		params.shopAddTime=shopAddTime;
	}
	if(productAddTime!=null && productAddTime!=''){
		params.productAddTime=productAddTime;
	}
	if (document) {
		params.domain = document.domain || '';
		params.url = document.URL || '';
		params.referrer = document.referrer || '';
	}
	//拼接参数
	var args = '';
	for ( var i in params) {
		if (args != '') {
			args += '&';
		}
		args += i + '=' + encodeURIComponent(params[i]);
	}
	//通过Image对象请求后端脚本 
	var img = new Image(1, 1);
	img.src = '//log.csc86.com/1.gif?' + args;	
})();
/*document.write('<script charset="utf-8" type="text/javascript" src="//wpa.b.qq.com/cgi/wpa.php?key=XzkzODE5NDc1N18zNDY1MzhfNDAwMTg0ODY2Nl8"></script>');*/
document.write('<script>var _hmt = _hmt||[];(function() {var hm = document.createElement("script");hm.src = "//hm.baidu.com/hm.js?7f42eae2066b2d4eed927d36bd188dbc";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();</script>');
document.write('<span id="cnzz_stat_icon_1256783863"><a title="站长统计" target="_blank" href="//www.cnzz.com/stat/website.php?web_id=1256783863">站长统计</a></span>');
document.write('<script type="text/javascript" src="//s11.cnzz.com/z_stat.php?id=1256783863"></script>');