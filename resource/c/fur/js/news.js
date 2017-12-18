define(function(require, exports, module) {
	require('./init');
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 300,
		slideHeight: 260,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + i + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '.J-slide>ol',
		slides_fun: slide.definedfun
	});
	//左侧tab
	var tabs = require('tab');
	tabs($("#J-tab-1 li"), $("#J-content-1 a"), 'mouseover', 'cur');
	tabs($("#J-tab-2 li"), $("#J-content-2 a"), 'mouseover', 'cur');
	//滚动
	require('./scroll');
	 var tm;
    $(".scrolling").CscScroll({
        Left: 452,
        Right: 226,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });
    //折扣选项卡
    tabs($(".discount-tab-nav li"), $(".discount-tab-content"), "mouseover", "cur");

    //加盟
	require('./join-alert');
})