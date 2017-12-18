define(function(require, exports, module) {
	require('m/top-bar/js/init.js');
    require('m/head-search/js/init.js');
    require('m/sea-modules/placeholder.js');
	var slide = require('slide');
	
	/*热门活动*/
	$(".jsHotActvList li").hover(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
	});
	
	/*广告轮播*/
	new slide(".actv-slide ul",".actv-slide ul>li",{
		slideWidth:520,
		slideHeight:220, 
		slideDirection:0,
		slides_xssm:1,
		slideSeries:1,
		zantin:true,
		slides_auto_span:6000,
		slideButs:'.actv-slide>ol', 
		slideButs_html:function(i){return "<li>"+i+"</li>";}, 
		slideButs_bindsj:"mouseover",
		slideButs_selectclass:"curr",
		slides_controller:'.actv-slide>ol',
		slides_fun:slide.definedfun
	});
});