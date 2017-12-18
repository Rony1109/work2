if (typeof csc=='undefined') var csc={};
var BASEURL = location.protocol+'//'+location.host+'/';
if(!window.console) window.console = {};
var BASEURL=location.protocol+"//"+location.host+"/";
csc.url = function (host ,path ,domain){
	var	domain = domain || (function (){
			var	domain = location.host;
			if(domain.indexOf("csc86.com") > 0){
				return "csc86.com";
			}
			return "csc86.com";
		})();
	if(host){
		switch(host){
			case "search":
			case "member":
			host += "1";
			break;
			default:
			;
		}
	}
	return location.protocol + "//" + (host ? host + "." : "") + domain + (path ? path : "");
};

function closeLeft(id){
	var	$id = $("#closeLeft");
	$id.parent().toggleClass("main-bg");
}
$(function(){
	$("ul.ln-2th li:has(ul.ln-3th)").addClass("has-children ln-2th-item-cur");
	$(".g-list tbody tr:odd").addClass("bg");
	//管理首页导航选项卡
	$('.m-n-tab ul li').bind('click', function() {
	 	var intise=$(this);
		$(".m-n-tab ul li.cur").removeClass("cur");
		intise.addClass("cur");
		var hv=intise.children().html();
		$(".l-h2").html(hv);
	});

	!-[1,] && $(function (){
		$(window).bind("resize",function (){
			$("div.main").height($("body").height()-75);
		}).trigger("resize");
	});
	data_text_Enter();

	$(".li-last>a").each(function(index, element) {
		if($(element).html()=="商业地图"){
			$(element).attr("target","_blank");
		}
	});
});

function data_text_Enter(){
	$(".tb-time input.g-d-text").on("keydown",function(event){
		var keynum;
		keynum = event.keyCode || event.which;
		if (keynum == 13) {
			var a= $(".tb-time>*").last();
			a.trigger("click");
		}
	})
}

function mhidden(mn,pr,obj){
	var $this=$(obj);
	if($this.next().is(":hidden")){
		$this.parent("."+pr).addClass(mn);
		$this.next().removeClass().addClass("ln-3th ln-3thshow");
	}else{
		$this.parent("."+pr).removeClass(mn);
		$this.next().removeClass().addClass("ln-3th ln-3thhid");
	}
}
function mlast(mn,pr,obj){
	var $this=$(obj);
	$("."+pr).removeClass(mn);
	$this.parent("."+pr).addClass(mn);
}
function change(val){
	if(val==true){
		$("table tbody .list-id input").attr("checked",val);
	}else{
		$("table tbody .list-id input").attr("checked",val);
	}
}
var textarea_maxlen = {
  isMax : function (id,tmp){
	var textarea =
		document.getElementById(id);
	var max_length =tmp;
	if(textarea.value.length > max_length){
	  textarea.value =
		textarea.value.substring(0, max_length);
	}
  },
  dRMouse : function (){
	document.oncontextmenu =
	  function (){ return false; }
  },
  eRMouse : function (){
	document.oncontextmenu = null;
  }
};
$.ajaxSetup({
	error:function (XMLHttpRequest, textStatus, errorThrown){
		if(XMLHttpRequest.responseText.indexOf('您还没有此页面的权限') > 0){
			//if(window.artDialog){
				if(art.dialog.list['roleTmp']){
					art.dialog.list['roleTmp'].close();
				}
				art.dialog({content:"您还没有此页面的权限!",icon: 'error',fixed: true,time: 1.5});
			//}else{
			//	alert('您还没有此页面的权限!');
			//}
		}
	}
});

//JS获取URL参数
function getURL_argument(kdy,url_){
	var url = url_ || location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf ("=")+1,j.length);
	}
	var returnValue = paraObj[kdy.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
};

//设置URL参数
function setURL_argument(){
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

function autoCompleteDefaultVal($form){//根据url自动赋值 by 章君
	var arr = location.search.slice(1).split("&"),
		tmp;
	for(var i in arr){
		tmp = arr[i].split('=');
		tmp[1] = $.trim(decodeURIComponent((tmp[1]||'').replace(/\+/g,' ')));
		if(tmp[1] != ''){
			$form.find('[name="'+tmp[0]+'"]').val(tmp[1]);
		}
	}
}

function editorContent(id){
	var id = id || "td.editor-content",
		$id = $(id),//产品详细中表格过大撑开页面处理
		maxWidth = Math.min($id.parents("div.wait-m").width() - 180,600);
	$id.find("table").each(function (){
		if($(this).width() > maxWidth) $(this).width(maxWidth)
	});
	$id.find("img").each(function(){
		$(this).show().wrap('<a href="'+$(this).attr("src")+'" class="highslide" />');
		if($.support.cssFloat == false) $(this).parent("a.highslide").after('\n\r');//ie下的换行
	});
}

//v2 sveajs配置
window.seajs && seajs.config({
	// Sea.js 的基础路径
	base: 'http://resmanage.csc86.com/',
	alias: {
		'dialog': 'v2/m/dialog/js/init',
		'WdatePicker': 'js/My97DatePicker/4.8/buyoffer_WdatePicker',
		'page': 'v2/m/page',
		'autocomplete': 'v2/m/autocomplete',
		'selectall': 'v2/m/selectall'
	},
	debug: false
});

//弹窗提示信息
function dialogTip(msg, closeTime, callback){
	art.dialog({
		id: "cscTip",
		content: msg || '提示信息',
		fixed: true,
		lock:true,
		opacity:0.2,
		title: '提示信息',
		icon: "csc-tip",
		time: closeTime || 1.5,
		close: callback || null
	});
}

//审核管理下所有页面点击通过时先判断是否包含敏感词或违禁词
function isHaveMgc(url,dataObj,okFun,cancelFun){
	$.ajax({
		url:url,
		type:"GET",
		data:dataObj,
		dataType:"jsonp",
		success:function(data){
			var html,words,type,text;
			var status=data.status;//1为包含敏感词、0为不包含敏感词、-1为出现异常
			if(status===1){
				words=data.words||"";//有敏感词时
				type=data.type;
				if(type===1){
					text="违禁词";
				}
				else if(type===2){
					text="敏感词";
				}
				else{
					text="敏感词或违禁词";
				}
				
				html='<div><p style="font-size:15px;font-weight:bold;">您审核的内容信息含有'+text+'！是否审核通过？</p><ul style="max-width:650px;max-height:300px;margin-top:5px;color:#666;line-height:20px;overflow:auto;">';
				
				$.each(words,function(i,n){
					html+='<li>☆ <strong>'+i+'</strong> 中的 “<span style="color:#f37366;">'+n+'</span>” 是'+text+'</li>';
				});
				
				html+='</ul></div>';
				
				art.dialog({
					id:"cfrm",
					content:html,
					fixed:true,
					lock:true,
					opacity:0.2,
					title:"确认提示",
					icon:"csc-question",
					okVal:"是",
					cancelVal:"否",
					ok:okFun || function(){},
					cancel:cancelFun || function() {}
				});
			}
			else if(status===0){
				okFun();
			}
			else{
				dialogTip("请求异常",2);
			}
		},
		error:function(){
			dialogTip("请求异常",2);
		}
	});
}