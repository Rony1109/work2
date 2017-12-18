/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	require('http://resmanage.csc86.com/js/artDialog/4.1.5/jquery.artDialog');
	require('http://resmanage.csc86.com/js/artDialog/4.1.5/skins/blue.css');
	(function(config) {
		config['path'] = 'http://resmanage.csc86.com/js/artDialog/4.1.5';
	}(art.dialog.defaults));

	module.exports = artDialog;

	artDialog.tip = function(obj) {
		//,msg, closeTime, title, callback
		this({
			id: "cscTip",
			content: obj.msg || '提示信息',
			fixed: true,
			title: obj.title || '提示信息',
			icon: "csc-tip",
			time: obj.closeTime || 1.5,
			close: obj.callback || null,
			lock: obj.lock || false,
			padding:'20px 25px 20px 10px'
		});
	};

	artDialog.alert = function(msg, fun) {
		this({
			id: "cscAlert",
			content: obj.msg || '警告信息',
			fixed: false,
			title: obj.title || '警告信息',
			icon: "csc-warn",
			ok: objfun || null,
			lock: obj.lock || false,
			padding:'20px 25px 20px 10px'
		});
	};

	artDialog.confirm = function(obj) {
		//msg, okFun, cancelFun
		this({
			id: "cscConfirm",
			content: obj.msg || '请确认操作？',
			fixed: true,
			title: obj.title || '确认提示',
			icon: 'csc-question',
			ok: obj.okFun || function() {},
			cancel: obj.cancelFun || function() {},
			lock: obj.lock || false,
			padding:'20px 25px 20px 10px'
		});
	};

	artDialog.error = function(obj) {
		//msg, okfun
		this({
			id: "cscError",
			content: obj.msg || '错误提示',
			fixed: true,
			title: obj.title || '错误提示',
			icon:'csc-error',
			ok: obj.okfun || true,
			lock: obj.lock || false,
			padding:'20px 25px 20px 10px'
		});
	};

	artDialog.success = function(obj) {
		//msg, closeTime, callback
		this({
			id: "cscSuccess",
			content: obj.msg || '成功提示',
			fixed: true,
			title: obj.title || '成功提示',
			icon: 'csc-success',
			time: obj.closeTime || 1.5,
			close: obj.callback || null,
			lock: obj.lock || false,
			padding:'20px 25px 20px 10px'
		});
	};

});