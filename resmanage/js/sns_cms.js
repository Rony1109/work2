//碎片操作

var $why_cms_option = {}

$(function(){
	Msg_text_Editor();
	ajaxToPageInfo();
	addpage();
});

var upfileHTML = '<div style="text-algin:center;"><input id="cms_upimg" type="button" style="height:40px; width:120px;" value="选择图片..." /></div>';
function Msg_text_Editor() {
	if(typeof(KindEditor) != "undefined"){
		KindEditor.lang({
			multiimage : '插入图片'
		});
		KindEditor.plugin('multiimage', function(K) {
			var self = this, name = 'multiimage';
			self.clickToolbar(name, function() {
				$why_cms_option.dialog = art.dialog({
					id : "cms_upfile",
					title: "插入图片",
					content: upfileHTML,
					fixed: true,
					opacity:"0.3",
					ok: false,
					zIndex:811313,
					init:function(){
						picUpload = new SWFUpload(uploadSettings({
							upload_url: csc.url("img","/upload?type=texteditor"),//snsShred
							button_placeholder_id : "cms_upimg",
							file_size_limit :"2MB",
							button_text:"选择文件...",
							button_text_left_padding: 12
						}));
						$why_cms_option.dialogbox = $(this.DOM.wrap[0]);
					},
					cancel: null,
					lock:true
				});
			});
		});
		$why_cms_option.Kmsg_text = KindEditor.create('#content_cms', {
			themeType : 'simple',
			designMode: false, //默认代码模式
			allowImageUpload : false, //关闭编辑器自带上传图片
			filterMode:false, //取消代码过滤
			newlineTag:"br",
			items : ['source','|','fontsize','forecolor','hilitecolor','|','link','unlink','|','multiimage','fullscreen'],
			afterChange : function(){
				this.sync();
			}
		});
	}
}

function newcmslocation(obj){
	/*var cmslocation = $('<input style="text" name="cmslocation" value="">');
	var oldcmslocation = $("select[name='cmslocation']");
	oldcmslocation.attr("name","").hide();
	$(this).parents("td").prepend(cmslocation);
	$(this).hide();*/

	var oldcmslocation = $("select[name='cmslocation']");
	art.dialog({
		title:"添加",
		content:'页面名称： <input style="text" name="cmslocation" value="">',
		okVal:"保存",
		ok:function(){
				var newname = $(this.DOM.wrap[0]).find("input[name='cmslocation']").val();
				if(!jianca_name(newname)){return false;}
				if(oldcmslocation.find("option[value='"+newname+"']").length>0){
					art.dialog.alert("名称已存在!");
					return false;
				}else{
					oldcmslocation.append('<option value="'+newname+'">'+newname+'</option>').val(newname);
				}
			},
		cancel:true,
		lock: true
	});

	//$("select[name='cmslocation']").replaceWith(cmslocation);
}

function jianca_name(str,maxlength){
	maxlength = maxlength || 99999;
	if($.trim(str) == ""){
		art.dialog.alert("名称不能为空!")
		return false;
	}
	if(str.length>maxlength){
		art.dialog.alert("名称长度不能超过"+maxlength+"个字符！");
		return false;
	}
	if(!/^[A-Za-z\d\u4E00-\u9FA5]+$/.test(str)){
		art.dialog.alert("名称只能是字母，数字和汉字!")
		return false;
	}
	return true;
}

function addpage(){
	$("#addCMSForm").on("submit",function(){
		var o = $(this);
		try{
			if(!jianca_name(o.find("input[name='name']").val(),20)){
				return false;
			}
			if(!/^[A-Z]+$/.test(o.find("input[name='nameCode']").val())){
				art.dialog.alert("碎片代码格式不正确!")
				return false;
			}
			if($.trim(o.find("[name='cmslocation']").val()) == ""){
				art.dialog.alert("碎片位置不能为空!")
				return false;
			}
		//if(this.find("input[name='nameCode']"))
		}catch(e){return false;}
		$.post(o.attr("action"),o.serialize(),function(data){
			switch(parseInt(data)){
				case -2:
					alert_aReturn(0,"","操作失败！碎片名称己存在.");
					break;
				case -3:
					alert_aReturn(0,"","操作失败！碎片代码己存在.");
					break;
				case 1:
					alert_aReturn(1,"保存成功！","",function(){location.href = location.href;});
					break;
				default:
					alert_aReturn(0,"","操作失败！");
			}
		})
		return false;
	})
	$("#editCMSForm").on("submit",function(){
		var o = $(this);
		if(!jianca_name(o.find("input[name='name']").val(),20)){
			return false;
		}
		if($.trim(o.find("[name='cmslocation']").val()) == ""){
			art.dialog.alert("碎片位置不能为空!");
			return false;
		}
		$.post(o.attr("action"),o.serialize(),function(data){
			switch(parseInt(data)){
				case -2:
					alert_aReturn(0,"","操作失败！碎片名称己存在.");
					break;
				case 1:
					alert_aReturn(1,"保存成功！","",function(){location.href = location.href;});
					break;
				default:
					alert_aReturn(0,"","操作失败！");
			}
		})
		return false;
	})
}



//上传完成后的事件
function uploadSuccess(file, serverData) {
	var response =  eval('(' + serverData + ')');
	if(response.result != "success"){
		var msg = response.msg || "上传失败!";
		art.dialog.alert(msg);
		return;
	} else {
		$why_cms_option.dialog.close();
		//artDialog.list['$upfile'].close()
		var url=csc.url("img",response.key);
		var html = '<img src="'+url+'" />'
		$why_cms_option.Kmsg_text.insertHtml(html);
	}
}

//保存表单
function formCmsEditor(obj,callback){
	$why_cms_option.Kmsg_text.sync();
	var o = $(obj);
	$.post(o.attr("action"),o.serialize(),function(data){
		if(data == "1"){
			alert_aReturn(1,"保存成功！","",function(){location.href = location.href;});
		}else{
			alert_aReturn(0,"","操作失败！");
		}
	})
	return false;
}

$why_cms_option.getlogincms = function(id,callback){
	$.post("cms.findHistoryById",{"historyId":id},function(data){
			callback(data.content);
	},"jsonp");
}

//查看
function cmsPreview(id){
	$why_cms_option.getlogincms(id,function(data){
		art.dialog({
					id:"showcms",
					title: "查看历史碎片",
					content: data,
					opacity:"0.3",
					fixed: true,
					padding:0,
					ok: false,
					zIndex:811313,
					cancel: null,
					lock:true,
					resize:false,
					init:function(){
						$(this.DOM.wrap[0]).find("div.aui_content").css({"height":"300px","width":"750px","overflow":"auto"});
						this.position("50%", "50%");
					},
					close:function(){$(this.DOM.wrap[0]).find("div.aui_content").css({"height":"auto","width":"auto","overflow":""});}
				});
	})
}

function toppage(){
	location.href = document.referrer;
}


//恢复
function cmsReset(id){
	art.dialog.confirm("此操作将覆盖当前编辑内容,确定继续吗?",function(){
		$why_cms_option.getlogincms(id,function(data){
			$why_cms_option.Kmsg_text.html(data);
			$("div.main").animate({scrollTop:0},100);
		})
	})
}

//绑定上一页,下一页按钮AJAX刷新;
function ajaxToPageInfo(){
	$("#ajax_list").on("click",".operation a",function(){
		var o = $(this);
		$.post(this.href,function(data){
			$("#ajax_list").html(data);
		});
		return false;
	})
}

//ajax翻页表单
function ajaxPageSubmit(obj){
	var o = $(obj),text = o.find(".ime_disabled");
	if($.trim(text.val()) == ""){
		art.dialog.alert("请入页码");
	}else{
		var re = setURL_argument(text.attr("name"),$.trim(text.val())-1).replace(/^[^?]*/ig,"");
		$.post(o.attr("action"),re,function(data){
			$("#ajax_list").html(data);
		});
	}
	return false;
}

//非ajax翻页
function pageSubmit(obj){
	var o = $(obj),text = o.find(".ime_disabled");
	if($.trim(text.val()) == ""){
		art.dialog.alert("请入页码");
	}else{
		var re = setURL_argument(text.attr("name"),$.trim(text.val())-1).replace(/^[^?]*/ig,"");
		location.href = re;
	}
	return false;
}

function $ime_disabled(obj){//文本框只能输入数字
	obj.style.imeMode = 'disabled';
	obj.onkeydown = function(e){
	    var keynum;
        var keychar;
        var numcheck;
        if(window.event){
            keynum = event.keyCode;
        }else if(e.which){
            keynum = e.which;
        };
        if (keynum == 13) { return true }; //回车事件
		if((keynum >= 96 && keynum <= 105) || keynum==9 || keynum==37 || keynum==38 || keynum==39 || keynum==40 || keynum==46) return true;//小键盘数字,tabe键,方向键;
		keychar = String.fromCharCode(keynum);
		numcheck = /[\d\ch]/; //匹配数字,退格;
		return numcheck.test(keychar);
	}
	obj.onkeyup = function(e){
		this.value = this.value.replace(/[^\d]/ig,"");
	}
	obj.onmousedown = function(event){
		event =window.event||event;
		if(event.button ==2){
			this.blur();
			return false;
		}
	};
};


function offUnNumber(e){
	var keynum;
	var keychar;
	var numcheck;
	if(window.event){
		keynum = event.keyCode;
	}else if(e.which){
		keynum = e.which;
	};
	if (keynum == 13) { return true }; //回车事件
	if((keynum >= 96 && keynum <= 105) || keynum==9 || keynum==37 || keynum==38 || keynum==39 || keynum==40 || keynum==46) return true;//小键盘数字,tabe键,方向键;
	keychar = String.fromCharCode(keynum);
	numcheck = /[\d\ch]/; //匹配数字,退格;
	return numcheck.test(keychar);
}
function offPaste(obj,event){
	event = window.event||event;
	if(event.button ==2){
		obj.blur();
		return false;
	}
};

//分析
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

//成功,失败提示框
function alert_aReturn(data,success,lose,fun_s,fun_l){
	if($.trim(data) == "1"){
		art.dialog({
			content:success,
			ok:false,
			icon:'succeed',
			time:1.5,
			title:"成功",
			close: fun_s || function(){}
		});
	}else{
		art.dialog({
			content:lose,
			icon:'error',
			fixed:true,
			title:"出错",
			time: 1.5,
			close: fun_l || function(){}
		});
	}
}
