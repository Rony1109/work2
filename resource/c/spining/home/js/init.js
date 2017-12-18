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
	require('./initLoad')();
	require('marquee');
	//require('./common/js/subnav');

	//var csc = require('focusPlay');
	var src = require('src');
	var more = require('more');
	more('b.links-down', 'links-down2');
	$('b.links-down a').on('click',function(event){
		event.stopPropagation();
	});
	/*var csc = require('focusPlay');
	csc.focusPlay('.J-slide');
	csc.focusPlay('.J_adv');*/

	//测试分类导航栏
	/*if(!-[1,]&&!window.XMLHttpRequest){
		var c = require("hover");
		c(".fl_box","hover");
		c(".dz_h_box2 .ul_img2 li","hover");
	}*/

	//$('.J_autoplay').kxbdMarquee({direction: 'up',scrollAmount:1, scrollDelay: 50});
	
	//csc.focusPlay("div.slide",null,null,null,1);


	//首页今日采购左移动
	$(".icon-img>.next").click(function(){
		src.left_right("div.text-slide","2");
	}).on({
		mouseenter: function(){
			$('.controller').addClass('switch-right');
		},
		mouseleave: function(){
			$('.controller').removeClass('switch-right');
		}
	});
	//首页今日采购右移动
	$(".icon-img>.prev").click(function(){
		src.left_right("div.text-slide","1");
	}).on({
		mouseenter: function(){
			$('.controller').addClass('switch-left');
		},
		mouseleave: function(){
			$('.controller').removeClass('switch-left');
		}
	});
	//首页今日采购轮播
	var timer;
	$('div.tf-top').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 src.left_right($th,"1");
			 },5000);
	 }).trigger("mouseleave");
	/*new slide(".J_slide ul",".J_slide ul>li",{
		slideWidth: 300,
		slideHeight:33, 
		slideDirection: 0,
		slides_xssm:1,
		slideButs_bindsj: "click",
		slides_to_l:'.controller a.prev',//前一个事件绑定对象
		slides_to_r:'.controller a.next'//后一个事件绑定对象
	});
*/
	new slide(".J-slide ul",".J-slide ul>li",{
		slideWidth: 540,
		slideHeight:220, 
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


	tabs('.tab-set', '.tab-inner', 'mouseover');

	$('.J_hover').find('li').each(function(){
		$(this).on('mouseover', function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');
		});
	});


	// 明星商铺
	var 

		$J_Cust = $('.J_Cust'),
		autoCur = function(){
			var $cur = $J_Cust.find('li.cur');
			$cur.is(':last-child') ? $J_Cust.find('li:first').addClass('cur') : $cur.next().addClass('cur');
			$cur.removeClass('cur');
		},
		timecust = setInterval(autoCur,3000);

	$J_Cust.delegate('li', 'mouseover', function(event) {
		clearInterval(timecust);
		var $t = $(this);
		if(!$t.is('.cur')){
			$t.addClass('cur').siblings('.cur').removeClass('cur');
		}
	}).delegate('li', 'mouseout', function(event) {
		timecust = setInterval(autoCur,3000);
	});


	$('.categories').delegate('dd', 'mouseenter', function(event) {
		$(this).addClass('cur');
		var d_h = $(window).height(); //窗口可见高度
		var el_h = $(this).find('.J_CatCont').outerHeight();
		var el_top = $(this).offset().top;	//当前活动页的scrollTop
		var off_h = d_h + $(window).scrollTop();
		var _top;

		if(true){
			if(el_top + el_h > off_h){ //超出
				if(el_top + $(this).outerHeight() > off_h){ //左边也超出
					_top = el_h -  $(this).innerHeight();
				}else{
					_top =el_top + el_h - off_h
				}
			}
			$(this).find('.J_CatCont').css({
				top: -_top-2
			});
		}
		return;
		
	}).delegate('dd', 'mouseleave', function(event) {
		$(this).removeClass('cur').find('.J_CatCont').attr("style","");
	});
	
	//供应求购
    var tab = require("tab");
    tab("#tab1 .tab_t a",["#tab1 .more a","#tab1 .tab_d1"],"mouseover","s",0,function(i){
        $("#tab1 .tab_d1 .text_type1").trigger("gd_stop").eq(i).trigger("gd_play");
    });
	
	$('.i-wrap').hover(function(){
		
		$(this).find('.mask').show();
		$(this).find('.info').show();
	},function(){
		$(this).find('.mask').hide();
		$(this).find('.info').hide();
	})
});