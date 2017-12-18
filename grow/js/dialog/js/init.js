/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	require('//grow.csc86.com/f=v5/js/dialog/css/style.css');
	require('//grow.csc86.com/f=v5/js/artDialog/4.1.7/jquery.artDialog.js,v5/js/artDialog/4.1.7/plugins/iframeTools.js');
	(function(config) {
		config['path'] = '//grow.csc86.com/v5/js/artDialog/4.1.7';
	}(art.dialog.defaults));

	module.exports = artDialog;

	artDialog.tip = function(msg, closeTime, callback) {
		this({
			id: 'cscTip',
			content: msg || '提示信息',
			fixed: true,
			lock: true,
			opacity: .3,
			title: false,
			icon: 'mem-w',
			dbClickHide:false,
			time: closeTime || 1.5,
			close: callback || null,
			init: function() {
				$(this.DOM.close).show();
			}
		});
	};

	artDialog.alert = function(msg, fun) {
		this({
			id: 'cscAlert',
			content: msg || '警告信息',
			fixed: true,
			title: false,
			icon: 'mem-w',
			ok: fun || null
		});
	};

	artDialog.confirm = function(msg, okFun, cancelFun) {
		this({
			id: 'cscConfirm',
			content: msg || '请确认操作？',
			fixed: true,
			title: false,
			icon: 'mem-w',
			ok: okFun || function() {},
			cancel: cancelFun || function() {}
		});
	};

	artDialog.error = function(msg, okfun, closeTime) {
		this({
			id: 'cscError',
			content: msg || '错误提示',
			fixed: true,
			title: false,
			icon: 'mem-e',
			ok: okfun || true,
			time: closeTime || 86400
		});
	};

	artDialog.success = function(msg, closeTime, callback) {
		this({
			id: 'cscSuccess',
			content: msg || '成功提示',
			fixed: true,
			title: false,
			icon: 'mem-c',
			time: closeTime || 1.5,
			close: callback || null
		});
	};

	artDialog.loading = function(msg) {
		this({
			id: 'cscLoading',
			content: msg || '处理中……',
			fixed: true,
			lock: true,
			opacity: .3,
			title: false,
			dbClickHide:false,
			icon: 'csc-loading',
			init: function() {
				$(this.DOM.close).hide();
				$(this.DOM.iconBg).css('background-image', 'url(' + this.config.path + '/skins/icons/csc-loading.gif)');
			}
		});
		return this({
			id: 'cscLoading'
		});
	};

});