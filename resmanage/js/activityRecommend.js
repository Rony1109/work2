/*
* SNS话题推荐
* author: why
* date  : 2013年3月25日
*/

$(function(){

})

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

function getURL_argument(kdy,url_){//JS获取URL参数
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

function setURL_argument(){//字符串方法操作参数，本方法会保留"&abc&fcd"等字符串。
	var set = function(key,val,url_){
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

//推荐列表中搜索及上一页下一页内容
function findActivityRecommend(comm,a,b){
	var page=0,url=location.href.split("?")[0]+"?";
	switch (comm) {
		case "1"://搜索
			if($("#circleName").val()==""){
				//art.alert("搜索的关键字不能为空!");
				//return false;
			}else{
				url += "isdesc=DESC&orderType=activityCreateTime";
				url += "&selectOne="+$("#selectOne").val()
					+ "&circleName="+encodeURIComponent($("#circleName").val());
			}
			break;
		case "2"://下一页，上一页
			url = setURL_argument("start",a);
			break
		case "3"://跳转按钮单击
			var page = $.trim($(a).parent().find("input").val());
			var maxpage = $.trim($("#pagenews").val());
			if(page.match(/^\d+$/)){
				if(page - maxpage > 0){
					//alert_aReturn(0,"","输入的页码数大于最大页数!");
					alert("输入的页码数大于最大页数!");
					return false;
				}else{
					url = setURL_argument("start",page-1);
				}
			}else{
				return false;
			}
			break;
		case "4"://排序
			url = setURL_argument({"isdesc":a,"orderType":b});
			break;
		default :
	}
	location.href = url;
	//console.log(url);
}

//跳转回车
function QZJumper(e,o){//圈子活动 列表跳转分页加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){findActivityRecommend("3",o);}
}

//搜索回车
function vipRecKeyDown(e){
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){findActivityRecommend("1");}
}

//推荐状态修改  updateRecommentTopic('65cbcf80-267c-4c77-8e00-34221e03153c','Y','TOPICDETAIL:','5:','1000:')
function updateRecommentActivity(id,zt,wz,px,obj){
	var url = "circleAuditRec.updateCircleActivityRecommend?",
	msg = {"Y":["推荐成功!","推荐失败!"],"N":["撤销成功!","撤销失败!"]}
	url += "&activityId=" + id
		+ "&recommendState=" + zt
		+ "&recommendPage=" + wz
		+ "&recommendSort=" + px
		+ "&recommendUserId=";
	/*if($("#starLevel"+id).val() == 0){
		//alert("未选星级!");
		url += "&startLeve=" + "5:";
	}else{
		url += "&startLeve=" + $("#starLevel"+id).val() + ":";
	//}*/
	url += "&startLeve=" + $("#starLevel"+id).val() + ":";
	$.get(url,function(data){
		var msg_err = msg[zt][1];
		var err_fun = function(){}
		if($.trim(data) == "2"){
			data = 0;
			msg_err="该话题的状态发生变化，不能操作!";
			err_fun = function(){location.href = location.href;};
		}
		alert_aReturn(data,msg[zt][0],msg_err,function(){location.href = location.href;},err_fun);
	})
}

