//跳转到新版采购商城
define(function(require, exports, module) {
	var cookie = require("m/jsM/cookie");
	var jumpCgsc={
		/*获取url参数*/
		getUrlParam:function(_url,key){
			if(_url.lastIndexOf("?") != -1){  
				var queryStr = _url.substring(_url.lastIndexOf("?") + 1, _url.length);  
				if(!key)  
				return queryStr;//返回所有参数  
				else{  
					var params  = queryStr.split("&");  
					for(var j = 0 ;j < params.length;j++){  
						var tmp = params[j].split("=");  
						if(tmp[0]==key){  
							return tmp[1];  
							break;  
						}  
					}  
				}  
			}  
		},
		init:function(){
			var url=location.href,
				isnew=jumpCgsc.getUrlParam(url,'isnew'),
				lastVisitPlace;
			if(isnew=='1'){
				lastVisitPlace=cookie.get("lastVisitPlace");
				if(lastVisitPlace=="new"){
					window.location.href="http://www.csc86.com?isnew=1";
				}
			}else{
				
			}
			cookie.set("lastVisitPlace","old",3650000 * 24 * 60,".csc86.com");
		}
	};
	
	jumpCgsc.init();
});