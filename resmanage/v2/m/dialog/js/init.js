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

	artDialog.tip = function(msg, closeTime, callback) {
		this({
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
	};

	artDialog.alert = function(msg, fun) {
		this({
			id: "cscAlert",
			content: msg || '警告信息',
			fixed: false,
			lock:true,
			opacity:0.2,
			title: '警告信息',
			icon: "csc-warn",
			ok: fun || null
		});
	};

	artDialog.confirm = function(msg, okFun, cancelFun) {
		this({
			id: "cscConfirm",
			content: msg || '请确认操作？',
			fixed: true,
			lock:true,
			opacity:0.2,
			title: '确认提示',
			icon: 'csc-question',
			ok: okFun || function() {},
			cancel: cancelFun || function() {}
		});
	};

	artDialog.error = function(msg, okfun) {
		this({
			id: "cscError",
			content: msg || '错误提示',
			fixed: true,
			lock:true,
			opacity:0.2,
			title: '错误提示',
			icon: 'csc-error',
			ok: okfun || true
		});
	};

	artDialog.success = function(msg, closeTime, callback) {
		this({
			id: "cscSuccess",
			content: msg || '成功提示',
			fixed: true,
			title: '成功提示',
			lock:true,
			opacity:0.2,
			icon: 'csc-success',
			time: closeTime || 1.5,
			close: callback || null
		});
	};

});