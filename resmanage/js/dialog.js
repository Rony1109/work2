csc.dialog = {};

csc.dialog.icoBg = function (){
	$("div.aui_iconBg").css({
		"background-position":"center",
		"background-repeat":"no-repeat"
	});
};

csc.dialog.msg = function (msg,type,width){
	var 
		width = width || 240,
		type = type || "";
	return '<div class="g-fs-14 g-t-l ' + type + '" style="width:' + (width-20) + 'px">'+msg+'</div>'
};

csc.tip = function (msg,closeTime){
	var	
		othis = this,
		closeTime = closeTime || 1.5;
	artDialog({
		id:"cscTip",
		content:othis.dialog.msg(msg,"tip"),
		fixed: true,
		title:"提示",
		width:240,
		height:90,
		padding:"0 19px 0 15px",
		icon: 'csc-tip',
		init:othis.dialog.icoBg,
		time:closeTime
	});
};

csc.alert = function (msg,fun){
	var	
		othis = this,
		fun = fun || function (){};
	artDialog({
		id:"cscAlert",
		content:othis.dialog.msg(msg,"alert",340),
		fixed: true,
		title:"警告",
		width:340,
		height:90,
		padding:"0 19px 0 15px",
		icon: 'csc-warn',
		init:othis.dialog.icoBg,
		ok:fun,
		lock:true
	});
};

csc.confirm = function (msg,okFun,cancelFun,title){
	var	
		othis = this,
		title = title||"警告",
		okFun = okFun || function (){},
		cancelFun = cancelFun || function (){};
	artDialog({
		id:"cscConfirm",
		content:othis.dialog.msg(msg,"confirm",340),
		fixed: true,
		title:title,
		width:340,
		height:90,
		padding:"0 19px 0 15px",
		icon: 'csc-warn',
		init:othis.dialog.icoBg,
		ok:okFun,
		cancel:cancelFun,
		lock:true
	});
};

csc.error = function (msg){
	var	othis = this;
	artDialog({
		id:"cscError",
		content:othis.dialog.msg(msg,"error",340),
		fixed: true,
		title:"对不起，出错啦！",
		width:340,
		height:90,
		padding:"0 19px 0 15px",
		icon: 'csc-error',
		init:othis.dialog.icoBg,
		ok:true,
		lock:true
	});
};

csc.success = function (msg,closeTime){
	var 
		othis = this,
		closeTime = closeTime || 1.5;
	artDialog({
		id:"cscSuccess",
		content:othis.dialog.msg(msg,"success"),
		fixed: true,
		title:"成功",
		width:240,
		height:90,
		padding:"0 19px 0 15px",
		icon:'csc-success',
		init:othis.dialog.icoBg,
		time:closeTime,
		lock:true
	});
};