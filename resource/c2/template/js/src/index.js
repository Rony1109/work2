/**
 * 前端模板js文件
 */
define('c2/template/js/src/index', ['jqfileupload'], function(require, exports, module) {
	// require 统一写在开头
	require('jqfileupload');

	// 定义模块 命名和文件名相同
	var Index = {
		// 所有模块的入口函数都是init
		init: function () {
			// start
			// document.write("js start...");
		}
	}

	// 公开模块
	module.exports = Index;
	// 直接运行本模块
	Index.init();
});

define('c2/template/js/src/index2', ['jqfileupload'], function(require, exports, module) {
	// require 统一写在开头
	require('jqfileupload');

	// 定义模块 命名和文件名相同
	var Index = {
		// 所有模块的入口函数都是init
		init: function () {
			// start
			// document.write("js start...");
		}
	}

	// 公开模块
	module.exports = Index;
	// 直接运行本模块
	Index.init();
});