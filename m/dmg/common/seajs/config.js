seajs.config({
	// Sea.js 的基础路径
	base: '//res.csc86.com/v3/shopping_center',
	// 别名配置
	alias: {
		'zepto': 'common/js/l/zepto/zepto.min.js',
		'jq': 'common/js/l/jq/jquery-3.0.0.min.js',
		'swiper': 'common/js/l/swiper/js/swiper.min.js',
		'picLazyLoad':'common/js/l/picLazyLoad/zepto.picLazyLoad.min.js',
		'dropload':'common/js/l/dropload/js/dropload.min.js',
		'debug':'common/js/l/debug/debug.min.js',
		'fastclick':'common/js/l/fastclick/fastclick.js',
		'layer':'common/js/l/layer/layer.js'
	},
	// 路径配置
	paths: {
	},
	// 映射
	map: [
		['f=','../f='],
		[ /^(.*(\/js\/tpl|\/js\/src|\/market\/css)\/.*\.(?:css|js))(?:.*)$/i, '$1?2016113001']
	],
	// 调试模式
	debug: true
});

//域名配置
seajs.hostmap={
	//'test':'m.develop.csc86.com'/*,*///开发接口
	//'test':'m.test.csc86.com'/*,*///测试接口
	'test':'m.csc86.com'//线上接口
};