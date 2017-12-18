//artDialog常用配置调用
	
/*
* 自动关闭提示
* msg 提示内容
* closeTime 停留时间 默认1.5(1.5秒)
*/
csc.tip = function (msg,closeTime){
	var	closeTime = closeTime || 1.5;
	artDialog({
		id:"cscTip",
		content:msg,
		fixed: true,
		title:"提示",
		//padding:"0 19px 0 15px",
		icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
		init:function (){
			$("div.aui_content").addClass("g-f-l g-fs-14");
		},
		time:closeTime
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
		//title:"警告",
		//padding:"0 19px 0 15px",
		icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
		init:function (){
			$("div.aui_content").addClass("g-f-l g-fs-14");
		},
		ok:fun
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
		title:title,
		//padding:"0 19px 0 15px",
		icon: _ARTDIALOG_SKINS_ICOS_[3] || 'mem-q',
		init:function (){
			$("div.aui_content").addClass("g-f-l g-fs-14");
		},
		ok:okFun,
		cancel:cancelFun
	});
};

/*
* 出错提示
* msg 提示内容
*/
csc.error = function (msg){
	artDialog({
		id:"cscError",
		content:msg,
		fixed: true,
		title: false,
		//padding:"0 19px 0 15px",
		icon:_ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',
		init:function (){
			$("div.aui_content").addClass("g-f-l g-fs-14");
		},
		ok:true
	});
};

/*
* 操作成功提示
* msg 提示内容
* closeTime 停留时间 默认1.5(1.5秒)
*/
csc.success = function (msg,closeTime){
	var	closeTime = closeTime || 1.5;
	artDialog({
		id:"cscSuccess",
		content:msg,
		fixed: true,
		title:"成功",
		//padding:"0 19px 0 15px",
		icon:_ARTDIALOG_SKINS_ICOS_[1] || 'mem-c',
		init:function (){
			$("div.aui_content").addClass("g-f-l g-fs-14");
		},
		time:closeTime
	});
};