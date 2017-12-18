/* /js/m/statistics.js 开始*/
;/* js/m/statistics.js 开始*/
;/*statistics.js为全站通用统计代码，statistics2.js为部分子站统计代码其中www.1668dmg.com已用到statistics2.js*/

var args   = '';//拼装参数
function ajaxset(){
	document.domain.indexOf("csc86.com")>=0 && typeof $==='function'&& typeof $.ajaxSetup === 'function'&&$.ajaxSetup( {
		error: function(jqXHR, textStatus, errorMsg){
			var Poweredby=jqXHR.getResponseHeader("X-Powered-By")?jqXHR.getResponseHeader("X-Powered-By"):'java';
			var dataobj={"interfaceName":decodeURIComponent(this.url),"currentPage":decodeURIComponent(location.href),"interfaceState":jqXHR.status,"errorMessage":errorMsg,"errorText":textStatus,"requestMode":this.type,"requestType":this.dataType,"browserHeader":navigator.userAgent,"operatingSystem":navigator.platform,"webServer":jqXHR.getResponseHeader("Server"),"language":Poweredby,"repairStatus":0};
			this.url.indexOf('reslog.csc86.com')<0&&jqXHR.status>400&&$.post('//reslog.csc86.com/saveResLog.html',dataobj,function(){},'jsonp');
		}
	})
};

typeof seajs ==='object'?seajs.use([],function(){ajaxset()}):ajaxset();

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
		var is_m_csc86 = document.domain.indexOf("csc86.com") >= 0 && document.getElementsByTagName('meta')['apple-mobile-web-app-status-bar-style'];
		var num=is_m_csc86?0:1;
		//同一次会话中
		if(_gtrb != "" && _gtrc != ""){
			var pageNumStr = _gtrb.substring(_gtrb.lastIndexOf('.')+1,_gtrb.length);
			var pagetNum = Number(pageNumStr)+num;
			_gtrb = _gtrb.substring(0,_gtrb.indexOf('.')+1)+now.getTime()+'.'+pagetNum;
			setCookie("_gtrb",_gtrb,1000*60*30);

			//新会话
		}else {
			var sessionId = createSessionId();
			var visitNumStr = _gtra.substring(_gtra.lastIndexOf('.')+1,_gtra.length);
			var visitNum = Number(visitNumStr)+num;
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


	if(document.domain.indexOf("csc86.com")>=0){
		if(!document.getElementsByTagName('meta')['apple-mobile-web-app-status-bar-style']){
			window.cscdebug = false;
			(function(i,s,o,g,r,a,m){i['CSCAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
			})(window,document,'script','//res.csc86.com/v2/l/ga/ga.js','cscga');
			creatScrip("//res.csc86.com/v2/l/ga/plugins/ua/cscplugin.js",1);
			creatScrip("//res.csc86.com/v2/l/ga/plugins/ua/cscgaMd.js");
			window.CSCAnalyticsObject = 'cscga';
			window.cscga = window.cscga || function() {
					(cscga.q = cscga.q || []).push(arguments)
				};
			cscga.l = +new Date;
			//csc86 pc-1 csc86 h5-2   JD-3(域名未定)
			var csctrackerid =document.domain.indexOf("csc86.com")>=0?document.getElementsByTagName('meta')['apple-mobile-web-app-status-bar-style']?'SU-10001-2':'SU-10001-1':'SU-10001-3';
			cscga('create', csctrackerid, 'auto');
			cscga('require', 'ec');
		}else{
			window.csc2debug=false;(function(i,s,o,g,r,a,m){i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push([arguments[0]||{}]);i[r]["send"]=function(){i[r].q[i[r].q.length-1].push(arguments[0]||{})};return i[r]};a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//res.csc86.com/v2/l/statistics/cscstatis.js','cscStatis');cscStatis({"data":{"hitType":"pageview"},"format":{"hitType":"t"}}).send({"Tracer":"pageview"});
		}


	}
	//新版logjs
	//调试模式启动


	//开始收集数据


	var params = {};
	params.sitetile = document.title;
	params.gtra = _gtra;
	params.gtrb = _gtrb;
	params.gtrc = _gtrc;
	params.uuid = uuid;
	var memberId = getParam().memberId;
	var evip = getParam().evip;
	var category = getParam().category;
	var tradeIds=getParam().tradeIds;
	var shopAddTime=getParam().shopAddTime;
	var productAddTime=getParam().productAddTime;
	if(memberId != null && memberId != ''){
		params.memberId = memberId;
		cscga('set', 'memberId', memberId);
	}
	if(evip!=null && evip!=''){
		params.evip=evip;
		//cscga('set', 'evip', evip);
	}
	if(category!=null && category!=''){
		params.category=category;
		cscga('set', 'category', category);
	}
	if(tradeIds!=null && tradeIds!=''){
		params.tradeIds=tradeIds;
		cscga('set', 'tradeIds', tradeIds);
	}
	if(shopAddTime!=null && shopAddTime!=''){
		params.shopAddTime=shopAddTime;
		//cscga('set', 'shopAddTime', shopAddTime);
	}
	if(productAddTime!=null && productAddTime!=''){
		params.productAddTime=productAddTime;
		//cscga('set', 'productAddTime', productAddTime);
	}
	if (document) {
		params.domain = document.domain || '';
		params.url = document.URL || '';
		params.referrer = document.referrer || '';
	}
	//拼接参数

	for ( var i in params) {
		if (args != '') {
			args += '&';
		}
		args += i + '=' + encodeURIComponent(params[i]);
	}
	//url参数
	var urlparams = window.location.search;
	if(urlparams!=null && urlparams!=''){
		args += '&'+encodeURIComponent(urlparams.slice(1));
	}
	//通过Image对象请求后端脚本
	var img = new Image(1, 1);
	img.src = '//log.csc86.com/1.gif?' + args;
})();
/*document.write('<script charset="utf-8" type="text/javascript" src="http://wpa.b.qq.com/cgi/wpa.php?key=XzkzODE5NDc1N18zNDY1MzhfNDAwMTg0ODY2Nl8"></script>');
 document.write("<script type=\"text/javascript\" src=\"//w.cnzz.com/q_stat.php?id=1256830811\">"+"<\/script>");
 */

//登录判断接口回调后处理
function chackLogin(obj){
	var dataobj = obj.data;
	var userId = dataobj.id; //登录用户id
	var userName = dataobj.username;//用户名
	var userKinds = dataobj.userkinds;//用户类型
	if(userId!=null && userId!=''){
		//cscga('set', 'userId', userId);
		//cscga('set', 'userName', userName);
		//cscga('set', 'userKinds', userKinds);
	}
	//发送
    window.cscga&&window.cscga('send', 'pageview');

}
function jsonpCallback(obj){
	var dataobj = obj.data;
	var notjtl =true;
	var url =location.href.replace(location.hash,"");
	for(var i=0;i<dataobj.length;i++){
		if(url.indexOf(dataobj[i])>-1){
			notjtl =false;
			break;
		}
	}
	notjtl&&creatScrip('//res.csc86.com/js/m/bdtj.js');
};

function creatScrip(src,isAsync){
	isAsync=isAsync?1:0;
	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.src = src;
	if(isAsync){
		script.async=1;
	}
	document.getElementsByTagName("head")[0].appendChild(script);
}

creatScrip('//api.csc86.com/s/view?callback=jsonpCallback&timestamp='+new Date().getTime());
creatScrip('//api.csc86.com/notify/count/all/?callback=chackLogin&timestamp='+new Date().getTime());
document.write("<script type=\"text/javascript\" src=\"//res.csc86.com/js/m/noys.js\">"+"<\/script>");

//GA代码
(function(){
	var gurl = document.location.protocol === 'https:' ?
		'https://ssl.google-analytics.com/analytics.js' :
		'http://www.google-analytics.com/analytics.js';

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script',gurl,'ga');

	ga('create', 'UA-75480625-1', 'auto');
	ga('send', 'pageview');
})();

/* js/m/statistics.js 结束*/





