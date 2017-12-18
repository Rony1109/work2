	define(function(require, exports, module) {
		require('./init');
		var tabs = require("tab");
		tabs($(".rank-list ul li"), $(".rank-list ol"), 'mouseover', 'cur');
		//时间
		require('l/My97DatePicker/4.8/buyoffer_WdatePicker');
	})