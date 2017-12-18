/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias: {
		'sethome': 'm/sea-modules/sethome.js',
		'isLogin': 'm/sea-modules/isLogin.js'
	}
});

define(function(require, exports, module) {
	//设置首页及添加收藏
	var home = require('sethome');
	var browser = navigator.userAgent.toLowerCase();
	require('isLogin')();

	$('.sethome').on('click', function(){
		if(browser.indexOf('webkit') > 0) {
			alert('您的浏览器未开启该功能');
		}
		home.setHome();
		return false;
	});
	
	$('.addfav').on('click', function(){
		home.addFav(location.href, document.title);
		return false;
	});
	
	$('.top-my-account').hover(function(){
		$(this).addClass('hover').find('.bd').show();
	}, function(){
		$(this).removeClass('hover').find('.bd').hide();
	});
});