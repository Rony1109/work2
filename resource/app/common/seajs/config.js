/**
 * js公用资源配置文件
 * 每添加一个公共资源，请加入到此配置当中
 * create date: 2015-10-20
 */

seajs.config({
	// Sea.js 的基础路径
	base: '//res.csc86.com/v2/app',
	// 别名配置
	alias: {
		'zepto': 'common/js/l/zepto/zepto.min.js',
		'swiper': 'common/js/l/swiper/js/swiper.min.js',
		'picLazyLoad':'common/js/l/picLazyLoad/zepto.picLazyLoad.min.js',
		'dropload':'common/js/l/dropload/js/dropload.js',
		'debug':'common/js/l/debug/debug.min.js',
		'fastclick':'common/js/l/fastclick/fastclick.js'
	},
	// 路径配置
	paths: {
	},
	// 映射
	map: [
		['f=','../f='],
		[ /^(.*(\/js\/tpl|\/js\/src|\/market\/css)\/.*\.(?:css|js))(?:.*)$/i, '$1?2016022504' ]
	],
	// 调试模式
	debug: false
});

//域名配置
seajs.hostmap={
	'www':'www.csc86.com',//主页
	'dmg':'www.1668dm.com',//东盟购
	'lssp':'ls.csc86.com',//绿色食品
	'pcc':'pcc.csc86.com',//皮草城
	'img':'img.csc86.com',//图片服务器
	'gsc':'gsc.csc86.com',//接口地址
	'info':'info.csc86.com'//接口地址
};