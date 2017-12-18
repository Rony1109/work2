define(function(require, exports, module) {
	require('./init');
	//滚动
	require('./scroll');
	 var tm;
    $(".scrolling").CscScroll({
        Left: 630,
        Right: 315,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 3
    });
})