/**
 * 前端模板js文件
 *
 */
seajs.config({
	alias: {
		'placeholder': 'm/sea-modules/placeholder.js',
		'search': 'm/sea-modules/search.js'
	}
});

define(function(require, exports, module) {
	var _search = require('search');
	var ph = require('placeholder');
	ph.placeholder('#search-txt');
	_search.search().searchType("div.m-search");

	//频道选择
	$('.selected_channel').on({
		mouseover: function() {
			$(this).find('.sel_chnel').addClass('hover');
			$(this).find('.chnel_list').show();
		},
		mouseout: function() {
			$(this).find('.sel_chnel').removeClass('hover');
			$(this).find('.chnel_list').hide();
		}
	});
	require('m/head-search/js/searchComplete');
    $('.ss-txt').SearchComplete();

});