/**
 * js公用资源配置文件
 * 每添加一个公共资源，请加入到此配置当中
 * create date: 2015-10-20
 */

seajs.config({
	// Sea.js 的基础路径
	base: '//res.csc86.com/f=v2/',
	// 别名配置
	alias: {
		'config'         : 'c2/config',
		'jquery'         : 'l/jquery/1.10.2/jquery.min.js',
		'jqfileupload'   : 'l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js',
		'json2'          : '//res.csc86.com/js/m/json2',
		'dialog'         : 'm/dialog/js/init',     // 有全局污染 art
		'isLogin'        : 'm/newtopnav/js/init',
		'productComment' : 'm/productComment/productComment',
		'showLogistics'  : 'm/sea-modules/showLogistics'       
	},
	vars: {
	},
	// 路径配置
	paths: {
	},
	// c2 不映射
	map: [
		// ['f=','../f=']
	],
	// 预加载项
	preload: [
		window.jQuery ? '' : 'jquery', 'config'
	],
	// 调试模式
	debug: false
});
// 域名管理配置表
seajs.hostmap = {
	member        : 'member.csc86.com',
	i             : 'i.csc86.com',
	statistics    : 'statistics.csc86.com',
	approve       : 'approve.csc86.com',
	inquiry       : 'inquiry.csc86.com',
	payment        :'payment.csc86.com'
}
