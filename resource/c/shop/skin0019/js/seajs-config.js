seajs.config({
    // 别名配置（常用项）
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js',
		'cscSwitch':'c/shop/js/cscSwitch.js',
		'wpCmmn':'c/shop/skin0019/js/shopinit.js'
    },
    
	//预先加载jquery
	preload: ['jquery'],
	
	// Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});