/*
*自定义类csc (一般自行添加的公用方法，函数，类，都应放入下此类中)
*explain 依赖 jQuery 1.7 ; seajs 1.2
*/

if (typeof csc=="undefined") var csc={};
/*
* 获取当前域名下功能性2级域名
* host 二级域名
* path 路径
* domain 一级域名（一般为csc86.com）可留空
*/
csc.url = function (host ,path ,domain){
	var	domain = domain || 'csc86.com';
	if(host){
		switch(host){
			default:
			;
		}
	}
	return location.protocol + "//" + (host ? host + "." : "") + domain + (path ? path : "");
};

//csc.ie6 布尔型 判断是为IE6 如: if(csc.ie6){alert("IE6")}
csc.ie6 = (function (){
	//return $.browser.msie&&$.browser.version==6.0;
	return navigator.userAgent.indexOf("MSIE 6.0") > 0;
})();


/*
* 加载artDialog插件及皮肤样式文件
* fun 加载完成后调用的函数
* skin 皮肤名称，具体参看/js/p/artDialog/4.1.5/skins下的样式文件名,默认皮肤为mem.
* icos 默认提示的图标组名称默认为"ico_24",图标组定义在/js/p/artDialog/4.1.5/plugins/iframeTools.source.js 文件中	
	ico_36:["warning","succeed","error","question"],
	ico_24:["mem-w","mem-c","mem-e","mem-q"],
	ico_40:["csc-warn","csc-success","csc-error","csc-tip"]
* explain
   切换皮肤及图标方法:将不需要的参数传入null即可 
   csc.useDialog(null,"皮肤名"); //换皮肤
   csc.useDialog(null,null,"ico_40"); //换图标
*/
csc.useDialog = function (fun,skin,icos){
	var	othis = this,
		type = skin || "mem",
		fun = fun || function (){},
		cssurl=othis.url("res","/f=js/p/artDialog/4.1.5/skins/"+type+".css");
		
	if(!$("#Dialog_type_css")[0]){
		var dilogCSS = $('<link>').attr({"id":"Dialog_type_css",rel:"stylesheet"});
		$("head").append(dilogCSS);
	};
	if(skin || typeof(csc.useDialog.type)=="undefined"){
		if(csc.useDialog.type !== type){
			$("#Dialog_type_css").attr("href",cssurl);
			csc.useDialog.type = type;
		};
	};
	if(icos && _ICOS_ARRAY_[icos]){_ARTDIALOG_SKINS_ICOS_=_ICOS_ARRAY_[icos]};
	if(window.art){
		if(othis.alert){
			fun();
		}else{
			seajs.use(csc.url("res","/js/m/dialog"),fun);
		}
	}else{
		seajs.use(csc.url("res","/dialog/"),function (){
			(function (config) {
				config['opacity'] = .3;
				config['path'] = othis.url("res","/js/p/artDialog/4.1.5");
			})(art.dialog.defaults);
			fun();
		});
	}
};
/*
* 强化类型判断
* author: 汪航洋
* Date: 2012年11月2日13时58分13秒
* explain: 
  与JS的typeof函数类似,判断传入的参数类型;
  与typeof区别如下
	csc.typeOf([1,2,3]) 	//返回 "array"
	csc.typeOf(new Date())	//返回 "date"
	csc.typeOf(new Error())	//返回 "error"
	csc.typeOf(/^\d$/)		//返回 "regexp"
	csc.typeOf(null)		//返回 "null"
  另外加入了非JS原生,但前端常用类型判断:HTMLElement,jQuery.
	csc.typeOf($("body"))	//返回 "jquery"
	csc.typeOf(document.body) //返回 "element"
*/
csc.typeOf = function(obj){
	var test = typeof(obj);
	var types = {"array" : Array , "date" : Date , "error" : Error , "regexp" : RegExp}
	try{if(HTMLElement != null &&  typeof(HTMLElement) == "function"){types["element"]=HTMLElement;}}catch(err){}
	try{if(jQuery != null && typeof(jQuery) == "function"){types["jquery"]=jQuery;}}catch(err){}
	if(test=="object"){
		if(obj==null){return "null";}
		for(a in types){
			if (obj instanceof types[a]) return a;
		}
		return "object";
	}else{
		return test;
	}
};

/*
* 调试命令在不支持的浏览器下不报错
* author: 章君
* Date: 2013年03月18日 12:58:46
* explain: 
  js控制台调试命令
  console.info()
  console.error()
  console.log()
  console.……
*/
if(!window.console) window.console = {};

/*
* 加载flash(使用swfobject);
* author: why
* Date: 2013年11月9日
* epplain:  csc.swfobject("//www.csc86.com/swf.swf","flashBox","300","200","9.0.0","expressInstall.swf",{"flashvars1":1,"flashvars":2},{"params1":1,"params2":2});
* api: http://code.google.com/p/swfobject/wiki/api
*/
csc.swfobject = function(){
	var arg = arguments;
	seajs.use(csc.url("res","/js/p/swfobject_2_2/swfobject/swfobject.js"),function (){
		swfobject.embedSWF.apply(swfobject,arg);
	});
}

//扩展Math,模拟生成一个GUID
Math.guid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
        var r = Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
}