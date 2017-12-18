$(function(){
	$("input.noime").each(function(index, element) {
		$ime_disabled(this);
	});

	$("input[name='minscore']").on("keydown",function(e){
		var keynum,
			keychar,
			numcheck;
		if(window.event){
			keynum = event.keyCode;
		}else if(e.which){
			keynum = e.which;
		};
		if (keynum == 13) { return true }; //回车事件
		if((keynum >= 96 && keynum <= 105) || keynum==9 || keynum==37 || keynum==38 || keynum==39 || keynum==40 || keynum==46 || keynum == 189 || keynum == 109) return true;//小键盘数字,tabe键,方向键,负符号;
		keychar = String.fromCharCode(keynum);
		numcheck = /[\d\ch]/; //匹配数字,退格;
		return numcheck.test(keychar);
	}).on("keyup",function(e){
		var o = $(this),
			str = $.trim(o.val());
			str = str.replace(/[^\d\-]/g,"");
		if(!/^\-?\d+$/.test(str)){
			str = str.substr(0,1) + str.substr(1).replace(/\-/g,"");
			o.val(str);
		}
		o.parents("tr").prev("[reg]").find("input[name='maxscore']").val(str);
	})

	//积分规则页保存按钮可用状态
	if(location.pathname == "/bops-app/bops/gradeManager.findAllGrowRule"){
		var oldstr = getjfgzArgument();
		$(".e-inquiry :button").attr("disabled",true);
		$(".e-inquiry :text").on("keyup",function(){
			$(".e-inquiry :button").attr("disabled",oldstr == getjfgzArgument());
		})
	}
})

/***列表页***/
//编辑
function vip_edit(obj){
	var o = obj || this,
		o_td = $(o).parents("td");
	o_td.find(".table_unedit").hide();
	o_td.find(".table_edit").show();
}

//取消编辑
function vip_unedit(obj){
	var o = obj || this,
		o_td = $(o).parents("td");
	o_td.find(".table_unedit").show();
	o_td.find(".table_edit").hide();
}

//全选开关
function selectAll(name,o){
	var s = $(o).attr("checked");
		cs = $(o).parents("table").eq(0).find("input[name='"+name+"']");
	if(s){
		cs.attr("checked",true);
	}else{
		cs.removeAttr("checked");
	}
}

//修改所在管理组
function save_glz(id,obj){
	var mid = $(obj).parent().find("select[name='groupIds']");
	$.post("gradeManager.modifyMemberGroup",{"groupIds":mid.val(),"memberIds":id},function(data){
		switch(parseInt(data)){
			case 1:
				alert_aReturn(1,"修改成功!","",function(){})
				$(obj).parents("td").prev().text(mid.find(":selected").text());
				vip_unedit.call(obj);
				break;
			case -1:
				alert_aReturn(0,"","修改失败,名称重复!");
				break;
			default:
				alert_aReturn(0,"","修改失败!");
		}
	})
}

//修改所选记录所在管理组
function save_glz_all(obj){
	//是否选择项
	var tablebox = $(".e-inquiry table"),
		ids="",
		cks = tablebox.find(":checkbox[name='memberId']:checked"),
		groupIds = $(obj).prevAll("select").val();

	if(groupIds == "" || groupIds == undefined){
		alert("请选择组");
		return false;
	}
	cks.each(function(index, element) {
		ids += ids=="" ? this.value : ","+this.value;
	});
	if(ids.length<=0){
		alert("请选择要操作的记录");
		return false;
	}
	art.dialog.confirm("此操作将覆盖当前编辑内容,确定继续吗?",function(){
		$.post("gradeManager.modifyMemberGroup",{"groupIds":groupIds,"memberIds":ids},function(data){
		switch(parseInt(data)){
				case 1:
					alert_aReturn(1,"操作成功!","",function(){location.href = location.href;})
					break;
				default:
					alert_aReturn(0,"","操作失败!");
			}
		})
	})
}

/***普通会员组页***/
var $$temp_bug = false;
//修改会员组名称
function save_zmc(id,obj){
	//if($$temp_bug){return false;}else{$$temp_bug = true;}
	var newname = $(obj).parent().find("input[type='text']").val();
	if(jc_zmc(newname)){
		$.post("gradeManager.modifyGradeName",{"gradeId":id,"gradeName":newname},function(data){
			switch(parseInt(data)){
				case 1:
					alert_aReturn(1,"修改成功!","",function(){})
					$(obj).parents("tr").find("td:eq(0)").text(newname);
					vip_unedit.call(obj);
					break;
				case -1:
					alert_aReturn(0,"","修改失败,名称重复!");
					break;
				default:
					alert_aReturn(0,"","修改失败!");
			}
		})
	}else{
		alert("名称不符合规范!");
	}
	return false;
}

//检查会员组名称
function jc_zmc(text){
	if($.trim(text) == "" || text.length>10){
		return false;
	}
	return true;
}

//添加普通会员组
function add_hyz(obj){
	//if($$temp_bug){return false;}else{$$temp_bug = true;}
	var o = $(obj),
		name = o.find("input[name='gradeName']").val(),
		val = o.find("input[name='minscore']").val();
	if($.trim(name) == "" || name.length>10){
		alert("名称不符合规范!");
		return false;
	}
	if(!/^-?\d+$/.test(val)){
		alert("成长值下限不符合规范!")
		return false;
	}
	$.post(o.attr("action"),o.serialize(),function(data){
		switch(parseInt(data)){
			case 1:
				alert_aReturn(1,"添加成功","",function(){location.href = location.href})
				break;
			case -1:
				alert_aReturn(0,"","添加失败,名称重复!");
				break;
			default:
				alert_aReturn(0,"","添加失败!");
		}
	});
	return false;
}

//保存等组配置
function save_syshyz(){
	var trs = $(".e-inquiry table tr[reg]"),res="";
	trs.each(function(index, element){
		var o = $(this);
		res += res==""?"":"|";
		res += o.attr("reg")+","+o.find("[name='minscore']").val()+","+o.find("[name='maxscore']").val();
	});
	$.post("gradeManager.modifyGrade",{"reg":res},function(data){
		switch(parseInt(data)){
			case 1:
				alert_aReturn(1,"操作成功","",function(){location.href = location.href})
				break;
			default:
				alert_aReturn(0,"","操作失败,请检查您的设置!");
		}
	})
}

/***会员系统分组页***/
//修改会员组名称
function save_syszmc(id,obj){
	var newname = $(obj).parent().find("input[name='groupName']").val();
	if(jc_zmc(newname)){
		$.post("gradeManager.modifyGroup",{"groupId":id,"groupName":newname},function(data){
			switch(parseInt(data)){
				case 1:
					alert_aReturn(1,"修改成功!","",function(){location.href = location.href})
					$(obj).parents("tr").find("td:eq(1)").text(newname);
					vip_unedit.call(obj);
					break;
				case -1:
					alert_aReturn(0,"","修改失败,名称重复!");
					break;
				default:
					alert_aReturn(0,"","修改失败!");
			}
		})
	}else{
		alert("名称不符合规范!");
	}
	return false;
}

//添加系统分组名称
function add_syshyz(obj){
	var o = $(obj),
		groupName = o.find("input[name='groupName']").val();
	if($.trim(groupName) == "" || groupName.length>10){
		alert("名称不符合规范!");
		return false;
	}
	$.post(o.attr("action"),o.serialize(),function(data){
		switch(parseInt(data)){
			case 1:
				alert_aReturn(1,"添加成功","",function(){location.href = location.href})
				break;
			case -1:
				alert_aReturn(0,"","添加失败,分组名称重复!");
				break;
			default:
				alert_aReturn(0,"","添加失败!");
		}
	});
	return false;
}

/***成长值管理页***/
function save_jfgz(){
	art.dialog({
		title : '提示',
		content : '确定要保存么？',
		fixed : true,
		okVal : '确定',
		background : "#000",
		opacity : "0.3",
		ok : function () {
			//alert(arr.join(","));
			$.post("gradeManager.modifyGrowRule",{"sql_text":getjfgzArgument()},function(data){
				var lose = $.trim(data) == "-1" ? "参数不正确！":"保存失败！";
				alert_aReturn($.trim(data),"保存成功！",lose,function(){location.href = location.href;});
			});
		},
		cancel : true,
		lock : true
	});
}

function getjfgzArgument(){
	var item = $(".g-list table tr"),
		arr = [];
	for(var i = 0; i<item.length ; i++){
		var tr = $(item[i]);
		if(tr.find("[name='growRuleId']").length){
			var str = tr.find("[name='growRuleId']").val() + "|" +
					(tr.find("[name='growValue']").val() || "0") + "|" +
					(tr.find("[name='dayLimit']").val() || "0");
			arr.push(str);
		}
	};
	return arr.join(",");
}



//以下是公用东西
function form_gopage(obj){
	var o = obj || this,
		text = $(o).find("input[type='text']"),
		pagenb = $.trim(text.val());
	if(/\d+/.test(pagenb)){
		location.herf = setURL_argument(text.attr("name"),pagenb);
	}else{
		return false;
	}
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
	var keynum,
		keychar,
		numcheck;
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

//翻页表单
function pageSubmit(obj){
	var o = $(obj),text = o.find(".ime_disabled");
	if($.trim(text.val()) == ""){
		alert("请入页码");
	}else{
		var re = setURL_argument(text.attr("name"),$.trim(text.val())-1).replace(/^[^?]*/ig,"");
		location.href = re;
	}
	return false;
}

