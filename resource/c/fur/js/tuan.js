define(function(require, exports, module) {
	require('./init');
	//倒计时
	var getAndDate = $('.time').attr('end').replace(/\-/g, '/');
	endTime = new Date(getAndDate);
	var startTime = new Date();
	startTime = startTime / 1000;
	endTime = endTime / 1000;
	var day = endTime - startTime
	function CountDown() {
		if (day > 0) {
			myday = Math.floor(day / (24 * 60 * 60));
			var _hours = (day / (24 * 60 * 60) - myday) * 24
			var hours = Math.floor(_hours);
			var _minutes = (_hours - hours) * 60;
			var minutes = Math.floor(_minutes);
			var minutesStyle = minutes >= 10 ? minutes : '0' + minutes;
			var _seconds = (_minutes - minutes) * 60
			var seconds = Math.round(_seconds);
			var secondsStyle = seconds >= 10 ? seconds : '0' + seconds
			$('.time').html('剩余' + myday + '天' + hours + '小时' + minutesStyle + '分' + secondsStyle + '秒' + '结束');
			--day;
		} else {
			$('.time').html('团购已经结束！')
		}
	};
	CountDown();
	var timer = setInterval(function() {
		CountDown()
	}, 1000);
})