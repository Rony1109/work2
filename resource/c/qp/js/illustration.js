define(function(require, exports, module) {
	//百度分享
	require('./bd-share');
	var tabs = require('tab');
	tabs($(".rank-list ul li"), $(".rank-list ol"), 'mouseover', 'cur');

	require('m/newtopnav/js/init');
	require('m/head-search/js/init');
	require('m/back-top/js/init');
	$('.g-back').goBack(true);
})