/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': './jquery.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'scrollLoading':'./jquery.scrollLoading.js',
		'csctouch':'./csctouch.js'
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	require('scrollLoading');
	require('csctouch');
	

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 (function(){
	
	
	})();
	

  $(".play").csctouch({speed:500,callback:function(){console.log(1)}});
	
	$(".imgloading").scrollLoading();
	

});
