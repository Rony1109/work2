/**
 * 前端模板js文件
 *
 */
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js',
		'newtopnav': 'm/newtopnav/js/init.js',
		'newsearch': 'm/newsearch/js/init.js',
		'backTop': 'm/back-top/js/init.js'
	}
});
define(function(require, exports, module) {
	require('newtopnav');
	require('newsearch');
	require('backTop');
	$('.g-back').goBack(); //返回头部
	$('.selected_channel').hover(function() { //频道选择
		$('.chnel_list').show();
	}, function() {
		$('.chnel_list').hide();
	});
	/*侧导航*/
	var $jHover = $('.jHover');
	$jHover.hover(function() {
		var index = $jHover.index(this);
		$(this)
			.addClass('cur')
			.find('.second-lnk')
			.css('top', -125 * index + 'px')
			.end()
			.prev()
			.find('.first-lnk')
			.css('border-color', '#fff')

	}, function() {
		$(this)
			.removeClass('cur')
			.prev()
			.find('.first-lnk')
			.removeAttr('style');
	});
	$('.jNav').hover(function() {
		$(this).find('ul').show();
	}, function() {
		$(this).find('ul').hide();
	});

})