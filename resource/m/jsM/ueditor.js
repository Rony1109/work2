//kindeditor配置文件
/**
 * 调用
 * var dialog = require("m/jsM/kindeditor.js");
 */
seajs.config({
	// 别名配置
	alias: {
		'ueditor_config': "l/ueditor/1.4.3/ueditor.config.js",
		'ueditor_all': "l/ueditor/1.4.3/ueditor.all.js"
	}
});

define(function(require, exports, module) {

	require("ueditor_config");
	require("ueditor_all");

	module.exports.ueditor = UE; // 输出UE对象

})