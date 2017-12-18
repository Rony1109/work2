/**
 * 电子频道_首页
 */
 
define(function(require, exports, module) {
	var slide = require("slide");
	window.lh = new slide("#lh_box .li_lh", "#lh_box .li_lh>li", {
		slideWidth : 540,
		slideHeight : 220,
		slideDirection : 0,
		slideSeries:1,				//新加的持续滚动标记，默认为0；
		slides_auto_span : 5000,
		slideButs_bindsj : "mouseover",
		slideButs : "#lh_box .but",
		slides_to_l:"#last",
		slides_to_r:"#next",
		slides_fun : slide.definedfun //当前幻灯对应按钮事件，
	});
	window.lh1 = new slide("#lh_box1 .li_lh", "#lh_box1 .li_lh>li", {
		slideWidth : 540,
		slideHeight : 220,
		slideDirection : 1,
		slideSeries:1,
		slides_auto_span : 5000,
		slideButs_bindsj : "mouseover",
		slideButs : "#lh_box1 .but",
		slides_to_l:"#last1",
		slides_to_r:"#next1",
		slides_fun : slide.definedfun
	});
	window.lh2 = new slide("#lh_box2 .li_lh", "#lh_box2 .li_lh>li", {
		slideWidth : 540,
		slideHeight : 220,
		slideDirection : 2,
		slideSeries:1,
		slides_auto_span : 5000,
		slideButs_bindsj : "mouseover",
		slideButs : "#lh_box2 .but",
		slides_to_l:"#last2",
		slides_to_r:"#next2",
		slides_fun : slide.definedfun 
	});
});