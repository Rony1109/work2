	define(function(require, exports, module) {
		var tabs = require("tab");
		tabs($(".rank-list ul li"), $(".rank-list ol"), 'mouseover', 'cur');
		//titme
		require('l/My97DatePicker/4.8/buyoffer_WdatePicker');
		require('m/newtopnav/js/init');
		require('m/head-search/js/init');
		require('m/back-top/js/init');
		$('.g-back').goBack(true);
	})