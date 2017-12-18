//artDialog常用配置调用

/*
* 自动关闭提示
* msg 提示内容
* closeTime 停留时间 默认1.5(1.5秒)
*/
if (typeof _ARTDIALOG_SKINS_ICOS_=="undefined") var _ARTDIALOG_SKINS_ICOS_ = [];

csc.tip = function (msg,closeTime,callback){
	var	closeTime = closeTime || 1.5;
	artDialog({
		id:"cscTip",
		content:msg,
		fixed: true,
		title: false,
		lock:true,
		opacity:0,
		icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
		init:function (){
			$(this.DOM.wrap[0]).find("div.aui_content").addClass("g-f-l g-fs-12");
		},
		time:closeTime,
		close:callback || null,
		path: '//res.csc86.com/js/p/artDialog/4.1.5'
	});
};

/*
* 带确认按钮提示
* msg 提示内容
* fun 确认后的回调函数
*/
csc.alert = function (msg,fun){
	var fun = fun || function (){};
	artDialog({
		id:"cscAlert",
		content:msg,
		fixed: true,
		title: false,
		lock:true,
		opacity:0,
		icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
		ok:fun,
		path: '//res.csc86.com/js/p/artDialog/4.1.5'
	});
};

/*
* 带确认按和取消按钮提示
* msg 提示内容
* okFun 确认的回调函数
* cancelFun  取消的回调函数
* title 标题
*/
csc.confirm = function (msg,okFun,cancelFun,title){
	var title = title||"警告",
		okFun = okFun || function (){},
		cancelFun = cancelFun || function (){};
	artDialog({
		id:"cscConfirm",
		content:msg,
		fixed: true,
		title: false,
		lock:true,
		opacity:0,
		icon: _ARTDIALOG_SKINS_ICOS_[3] || 'mem-w',
		ok:okFun,
		cancel:cancelFun,
		path: '//res.csc86.com/js/p/artDialog/4.1.5'
	});
};

/*
* 出错提示
* msg 提示内容
*/
csc.error = function (msg,okfun){
	artDialog({
		id:"cscError",
		content:msg,
		fixed: true,
		title: false,
		lock:true,
		opacity:0,
		icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',
		ok:okfun || true,
		path: '//res.csc86.com/js/p/artDialog/4.1.5'
	});
};

/*
* 操作成功提示
* msg 提示内容
* closeTime 停留时间 默认1.5(1.5秒)
*/
csc.success = function (msg,closeTime,callback){
	var	closeTime = closeTime || 1.5;
	artDialog({
		id:"cscSuccess",
		content:msg,
		fixed: true,
		title: false,
		lock:true,
		opacity:0,
		icon:_ARTDIALOG_SKINS_ICOS_[1] || 'mem-c',
		time:closeTime,
		close:callback || null,
		path: '//res.csc86.com/js/p/artDialog/4.1.5'
	});
};