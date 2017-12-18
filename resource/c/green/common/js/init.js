/**
 * 前端模板js文件
 * 
 */
/*config配置*/
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'foot': './footer.js',		
		'placeholder': 'm/sea-modules/placeholder.js',
		'subnav':"c/green/common/js/subnav"
	}
});

define(function(require, exports, module) {
	require('top');
	require('header');
	require('placeholder');
	require('foot');
	require('subnav');
	$(".links-down").click(function(){
		if($(this).siblings("span").height()==20){
			$(this).siblings("span").css("height","auto");
		}
		else{
			$(this).siblings("span").css("height","20px")
		}
	})
	
});