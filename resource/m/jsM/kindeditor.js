//kindeditor配置文件
/**
 * 调用
 * var dialog = require("m/jsM/kindeditor.js");
 */
seajs.config({
	// 别名配置
	alias: {
		'kindeditor': "l/kindeditor/4.1.2/kindeditor-min.js",
		'kindeditor_source': "l/kindeditor/4.1.2/kindeditor.js",
		'lang': "l/kindeditor/4.1.2/lang/zh_CN.js"
	}
})
define(function(require, exports, module) {
	require('kindeditor');
})