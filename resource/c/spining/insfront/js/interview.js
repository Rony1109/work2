/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'foot': 'c/spining/common/js/init.js',
		//'slide': 'm/sea-modules/slide.js',
		'tabs': 'm/sea-modules/tabs.js'
	}
});

define(function(require, exports, module) {
	require('top');
	require('header');
	require('foot');
	var slide = require('slide');
	var tabs = require('tabs');

	tabs('.tabs-nav', '.tabs-ctn', 'mouseover');

	new slide(".J_slide>ul",".J_slide>ul>li",{
		slideWidth: 360,
		slideHeight:250, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slideButs : '.J_slide>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J_slide>ol',
		slides_fun:function(i){
			slide.definedfun.call(this,i);
			var o = $(this.slides.eq(i))
			var text = o.find("img").attr("alt"),
				url = o.find("a").attr("href")
			$(".J_slide span.info>a").attr({"href":url}).text(text);
		}
	});

	new slide(".J_floor_1>ul",".J_floor_1>ul>li",{
		slideWidth: 200,
		slideHeight:350, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slideButs : '.J_floor_1>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J_floor_1>ol',
		slides_fun:function(i){
			slide.definedfun.call(this,i);
		}
	});

	new slide(".J_floor_2>ul",".J_floor_2>ul>li",{
		slideWidth: 200,
		slideHeight:350, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slideButs : '.J_floor_2>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J_floor_2>ol',
		slides_fun:function(i){
			slide.definedfun.call(this,i);
		}
	});

	new slide(".J_floor_3>ul",".J_floor_3>ul>li",{
		slideWidth: 200,
		slideHeight:350, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slideButs : '.J_floor_3>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J_floor_3>ol',
		slides_fun:function(i){
			slide.definedfun.call(this,i);
		}
	});

	new slide(".J_floor_4>ul",".J_floor_4>ul>li",{
		slideWidth: 200,
		slideHeight:350, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slideButs : '.J_floor_4>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J_floor_4>ol',
		slides_fun:function(i){
			slide.definedfun.call(this,i);
		}
	});

	new slide(".J_floor_5>ul",".J_floor_5>ul>li",{
		slideWidth: 200,
		slideHeight:350, 
		slideDirection: 0,
		slides_xssm:1,
		slideSeries:1,
		zantin: true,
		slideButs : '.J_floor_5>ol', //切换按钮容器，样式自定义
		slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj : "mouseover",
		slideButs_selectclass : "cur",
		slides_controller: '.J_floor_5>ol',
		slides_fun:function(i){
			slide.definedfun.call(this,i);
		}
	});
	$('.last-activity').on('mouseenter','li',function(){
		$(this).addClass('cur').siblings('li').removeClass('cur');
	})
});