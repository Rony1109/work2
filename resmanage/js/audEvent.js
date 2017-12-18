/*
* 后台审核管理
* author: LG
* date  : 2013.2.19
* dec	: 市场审核 圈子审核 搜索和分布跳转加键盘事件
*/
function secKeyDown(e){//圈子活动管理 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='circleActivity.showCircleActivity';
		$("#form1").submit();
	}
}
function activeKeyDown(e){//市场动态审核 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='marketAudit.findDynamicWait';
		$("#form1").submit();
	}
}
function comKeyDown(e){//市场评论审核 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='marketCheckManage.showCommentCheckManage';
		$("#form1").submit();
	}
}
function cretKeyDown(e){//市场创建审核 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='marketCheckManageNews.showNewMarketCheckManage';
		$("#form1").submit();
	}
}
function addKeyDown(e){//市场入驻审核 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='marketCheckManageSettled.showMarketCheckManage';
		$("#form1").submit();
	}
}
function circleAuditKeyDown(e){//圈子审核管理 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='circleAudit.showCircleCheckManage';
		$("#form1").submit();
	}
}
function contAuditKeyDown(e){//圈子内容审核 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		$("#form1").action='circleAuditTopic.showTopicCheckManage';
		$("#form1").submit();
	}
}
function vipRecKeyDown(e,str1,str2,str3){//会员推荐审核 搜索按钮加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){
		checkaction(str1,str2,str3);
	}
}
function QZJumper(e,str){//圈子活动 列表跳转分页加键盘事件
	var e=e||event;
	var currKey=e.keyCode||e.which||e.charCode;
	if((currKey==13)){checkPage(str);}
}