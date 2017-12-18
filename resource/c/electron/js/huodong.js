/**
 * 电子频道_活动展会
 * 
 */
define(function(require, exports, module) {
	require('m/top-bar/js/init');
	require('m/head-search/js/init');
	require('m/head-search/js/init');
	var gotop = require("./modules/gotop/dz_gotop");
	gotop.setmain({marginbottom:100,marginleft:0});
	var slide = require("slide");
	new slide("#lh_box .li_lh", "#lh_box .li_lh>li", {
		slideWidth : 360,
		slideHeight : 280,
		slideDirection : 0,
		slideSeries:1,
		slides_auto_span : 5000,
		slideButs_bindsj : "mouseover",
		slideButs : "#lh_box .but",
		slides_fun : slide.definedfun
	});
	var ph = require('m/sea-modules/placeholder.js');
	ph.placeholder('#zhtext');
	
	var calendar = require('./modules/getDay');
	// 展会排期去掉月份前的字符0
	/*$('div.J_Date').find('span').each(function(){
		if($(this).html().charAt(0) == "0") {
			$(this).html($(this).html().slice(1));
		}
	});*/
	$('div.J_Date').delegate('span','click',function(){
		$(this).addClass('cur').siblings('span').removeClass('cur');
		var date = $(this).attr('date').split('-');
		calendar.init({year:date[0],month:date[1]},'dianzi');
	}).find('span:first').trigger('click');
	
});