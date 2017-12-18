	define(function(require, exports, module) {
		require('./init');
		var tabs = require("tab");
		tabs($(".rank-list ul li"), $(".rank-list ol"), 'mouseover', 'cur');
		//titme
		require('l/My97DatePicker/4.8/buyoffer_WdatePicker');
		$('.list-search').on('submit', 'form', function(e) {
			e.stopPropagation
			var starTime = $('#startTime').val(),
				endTime = $('#endTime').val();
			if (starTime == '' || endTime == '') {
				alert('时间不能为空！');
				return false;
			}
		})
	})