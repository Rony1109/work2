/**
 * js配置文件
 * 
 */

seajs.config({
	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'hover': 'm/jsM/hover.js',
		'slide': 'm/jsM/slide.js',
		'tab': 'm/jsM/tab.js'
	},
	// 路径配置
	paths: {
		
	},

	// 映射
	map: [
		['f=','../f=']
	],

	// 预加载项
	preload: [
		window.jQuery ? '' : 'jquery'
	],

	// Sea.js 的基础路径
	base: '//res.csc86.com/v2/',

	// 调试模式
	debug: false
});

// 域名管理配置表
seajs.hostmap = {
	i: 'i.csc86.com',
	login:'login.csc86.com',
	img:'img.csc86.com'
}