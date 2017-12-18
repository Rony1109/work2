/**
 * 前端模板js文件
 * 
 */
/*config配置*/
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'foot': 'c/spining/common/js/init.js',
		'focusPlay': 'm/sea-modules/focusPlay.js',
		'more': 'm/sea-modules/more.js',
		//'slide': 'm/sea-modules/slide.js',
		//'slide': 'slide',
		'tabs': 'm/sea-modules/tabs.js',
		'marquee': 'm/sea-modules/marquee.js',
		'src': 'c/home/index/js/src_bdt'
	}
});

define(function(require, exports, module) {
	require('top');
	require('header');
	require('foot');
	var slide = require('slide');
	var tabs = require('tabs');
	require('marquee');

	
	new slide(".J-slide ul",".J-slide ul>li",{
		slideWidth: 540,
		slideHeight:250, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slides_auto_span : 6000,
		slideButs : '.J-slide>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J-slide>ol',
		slides_fun:slide.definedfun
	});


	$('.J_hover').find('li').each(function(){
		$(this).on('mouseover', function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');
		});
	});

});