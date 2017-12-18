define(function(require,exports,module){
	/*
	* URL处理类
	*/

	/*
	* URL参数获取/修改/删除
	* k 参数名
	* v 参数值
	* url 要处理的URL //默认当前页面的url
	* explan:
		此方法有两个重载
		1. csc.param(k) 返回当前页面的url参数名为k的参数值; 
		2. csc.param(k,v) 返回 修改/添加 当前页面的url的 k参数之后的整个参数字符(修改后?号后的字符串)
		3. csc.param(k,v,url) 同2,只是指定了URL.
	*/
	var p = {};
	p.param = function (k,v,url){
		var	url = url || location.search.substr(1),
				urls = url.split("&"),
				pars = {},
				u;
		for(var i in urls){
			var	arr = urls[i].split("=");
			arr[0] == k && v !== u && (arr[1] = v);
			arr[1] !== u && arr[1]!==null && (pars[arr[0]] = decodeURIComponent(arr[1]));
		}
		pars[k] === u && v !== u && v !== null && (pars[k] = v);
		return v !== u ? $.param(pars) : (pars[k] || "");
	};

	/*
	* 批量修改URL参数
	* date：2013.1.6 why
	* explan:
	    newurl = setURL_argument("key",val); //修改或添加单个参数
	    newurl = setURL_argument({key1:val1,key2:val2,key3:val3});//修改或添加多个参数
	    newurl = setURL_argument("key"); //删除单个参数
	    newurl = setURL_argument({"key1":"","key2":"";}); //删除多个参数
		注:setURL_argument返回的都是
	*/

	p.setURL_argument = function(){
		var set = function(key,val,url_){//字符串方法操作参数，本方法会保留"&abc&fcd"等字符串。
			var url = url_ || location.href;
			url = url.replace(/(#.*)?/,"");
			(url.indexOf("?") <= -1) && (url += "?");
			var paraString = url.substring(url.indexOf("?")+1,url.length) , key = key || "", val = val || "";
			if(key=="") {return url.replace(/\?*\s*$/,"")};
			var reg = new RegExp('\\b' + key + '=[^&]*',"");
			if(reg.test(paraString) && val !=="" ){//值不为空，则替换
				paraString = paraString.replace(reg,key + "=" + val);
			}else if(reg.test(paraString) && val ==""){//值为空，则删除
				paraString = paraString.replace(reg,"");
			}else if(val!==""){//没有则添加
				paraString += "&" + key + "=" + val;
			}
			paraString = paraString.replace(/(^&*|&*$|&*(?=&))/g,"")
			return url.split("?")[0] + (paraString == "" ? "" : "?" + paraString);
		}
		if(typeof(arguments[0]) == "string"){
	               return set.apply(this,arguments);
		}else if(typeof(arguments[0])=="object"){
			var arg = arguments[0],url = arguments[1] || location.href;
			for(aaa in arg){
				url = set(aaa,arg[aaa],url);
			};
			return url;
		}else{return location.href;}
	}

	module.exports = p;
});