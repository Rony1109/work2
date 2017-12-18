/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'foot': 'c/spining/common/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js',
		'focusPlay': 'm/sea-modules/focusPlay.js',
		//'slide': 'm/sea-modules/slide.js',
		'tabs': 'm/sea-modules/tabs.js'
	}
});

define(function(require, exports, module) {
	require('top');
	require('header');
	require('foot');
	var tabs = require('tabs');
	var slide = require('slide');
	var pic = require('./picHover');

	tabs('.tabs-nav', '.tabs-ctn', 'mouseover');
	require('./onlyDital')();

	// 行情前线
	if($('body').attr('initFlag') == 'market-front') {
		//兼容css3选择器处理效果
		require('./initLoad')();

	new slide(".Jslide>ul",".Jslide>ul>li",{
			slideWidth: 290,
			slideHeight:200, 
			slideDirection: 0,
			slides_xssm:1,
			/*slides_controller: '.Jslide>ol',//控制切换的按钮容器,
			slides_title:'.Jslide span.info a'//切换当前显示的标题控件*/
			slideSeries:1,
			zantin: true,
			slideButs : '.Jslide>ol', //切换按钮容器，样式自定义
			slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj : "mouseover",
			slideButs_selectclass : "cur",
			slides_controller: '.Jslide>ol',
			slides_fun:function(i){
				slide.definedfun.call(this,i);
				var o = $(this.slides.eq(i))
				var text = o.find("img").attr("alt"),
					url = o.find("a").attr("href")
				$(".Jslide .info a").attr({"href":url}).text(text);
			}
		});
		pic.picHover('.J_Pic a.pic');
	}
	
	// 展会活动
	if($('body').attr('initFlag') == "exhibition"){
		require('./ex-initLoad')();
		var ph = require('placeholder');
		ph.placeholder('.col-aside .ext-search input.text');
		var calendar = require('./getDay');


		// 展会排期去掉月份前的字符0
		$('div.J_Date').find('span').each(function(){
			if($(this).html().charAt(0) == "0") {
				$(this).html($(this).html().slice(1));
			}
		});


		$('div.J_Date').delegate('span','click',function(){
			/*console.log(;*/
			if($(this).text().length == 3) {
				$(this).addClass('dwCur').siblings('span').removeClass('cur dwCur');
			}
			else {
				$(this).addClass('cur').siblings('span').removeClass('cur dwCur');
			}
			var date = $(this).attr('date').split('-');
			calendar.init({year:date[0],month:date[1]});
		}).find('span:first').trigger('click');


		new slide(".J_Slide>ul",".J_Slide>ul>li",{
			slideWidth: 730,
			slideHeight:200, 
			slideDirection: 1,
			slides_xssm:1,
			slideSeries:1,
			zantin: true,
			slideButs : '.J_Slide>ol', //切换按钮容器，样式自定义
			slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj : "mouseover",
			slideButs_selectclass : "cur",
			slides_controller: '.J_Slide>ol',
			slides_fun:slide.definedfun
		});

		//鼠标划过的时候
		$('.col-aside .ext-search input.submit').on({
			mouseover: function(){
				$(this).addClass('hover');
			},
			mouseout: function(){
				$(this).removeClass('hover');
			}
		});

	}

	// 访谈导购
	if($('body').attr('initFlag') == "interview") {
		$('.col-inter .firm-inter .list ul li:last-child').css('margin-right','0');
		$('.col-mer .cont li:last-child').css('margin-bottom','0');
		$('.pro-mod .col-list .list-img li:last-child').css('margin-right','0');
		$('.pro-mod .col-list .mar-guide ul li:nth-child(2n)').css('margin-left','0');

		new slide(".J_Slide>ul",".J_Slide>ul>li",{
			slideWidth: 290,
			slideHeight:260, 
			slideDirection: 0,
			slides_xssm:1,
			slideSeries:1,
			zantin: true,
			slideButs : '.J_Slide>ol', //切换按钮容器，样式自定义
			slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj : "mouseover",
			slideButs_selectclass : "cur",
			slides_controller: '.J_Slide>ol',
			slides_fun:function(i){
				slide.definedfun.call(this,i);
				var o = $(this.slides.eq(i))
				var text = o.find("img").attr("alt"),
					url = o.find("a").attr("href")
				$(".J_Slide span.info>a").attr({"href":url}).text(text);
			}
		});

		$('.J_toggle>div.cont-r a').each(function(index){
			$(this).on('mouseover', function(){
				$(this).addClass('cur').siblings().removeClass('cur');
				$('.J_toggle>a').eq(index).show().siblings('a').hide();
			});
		});

		
		require('./c-marquee')({
			container: '.J_Marquee', //容器
			li_width: 80, //一个li的宽度
			li_space: 15,	//li之间的间隙
			controller: 'span a', //控制器对象
			c_prev: 'span.prev>a',	//前一个控制器的对象
			c_next: 'span.next>a',	//后一个控制器的对象
			show_nums: 4,  //显示多少条记录
			dis_style: 'disable'	//失效后的样式
		});

	}

	if($('body').attr('initFlag') == "detail") {
		$('.list-wrapper .details .guess-u-like .like-list li:last-child').css('margin-right','0');
	}

	if($('body').attr('initFlag') == "detail" || $('body').attr('initFlag') == "ex-det"){
		var $channelNavUl = $('div.nav-items').find('ul');
		$channelNavUl.find('li').height($channelNavUl.height()-15);
	}
	
	var cssHtml = $('<link href="//res.csc86.com/v2/c/spining/insfront/css/print.css" rel="stylesheet" media="print">');
	$("head").append(cssHtml);

	//document.getElementsByTagName('head')[0].;

require('l/My97DatePicker/4.8/buyoffer_WdatePicker');

	if($('body').attr('initFlag') == 'baike') {
		new slide(".baike-focus ul",".baike-focus ul>li",{
			slideWidth: 450,
			slideHeight:260, 
			slideDirection: 0,
			slides_xssm:1,
			slideSeries:1,
			zantin: true,
			slides_auto_span : 3000,
			slideButs : '.baike-focus>ol', //切换按钮容器，样式自定义
			slideButs_html : function(i){return "<li>"+(i+1)+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj : "mouseover",
			slideButs_selectclass : "cur",
			slides_controller: '.baike-focus>ol',
			slides_fun:slide.definedfun
		});
	}
});