seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js',
		'newtop':'c2/newcgsc/js/newtop.js',
		'valid': 'c/order/js/valid.js',
		'notice':'c/order/js/notice.js'
    },
	
	//预先加载jquery
	preload: [
		window.jQuery ? '' : 'jquery'
	],
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});