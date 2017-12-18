/**
 * 电子频道_品牌专题
 * 
 */
define(function(require, exports, module) {
	require('m/top-bar/js/init');
	require('m/head-search/js/init');
	var slide = require("slide"),
		tab = require("tab");
	var gotop = require("./modules/gotop/dz_gotop");
	gotop.setmain({marginbottom:100,marginleft:0});
	new slide("#lh_box .li_lh", "#lh_box .li_lh>li", {
		slideWidth : 360,
		slideHeight : 220,
		slideDirection : 0,
		slideSeries:1,
		slides_auto_span : 5000,
		slideButs_bindsj : "mouseover",
		slideButs : "#lh_box .but",
		slides_fun : slide.definedfun
	});
	tab(".list_ppdt>li",".list_ppdt>li img","mouseover","s",0);
	var lhbox1 = $("#zthg_lh");
	if(lhbox1.find(".li_lh>li").length>7){
		$("#zthg_lh .to_left,#zthg_lh .to_rihgt").show();
		new slide("#zthg_lh .li_lh", "#zthg_lh .li_lh>li", {
			slideWidth : 135,
			slideHeight : 125,
			slides_xssm : 7,
			slideSeries:1,
			slideDirection : 0,
			slides_auto_span : 0,
			slides_to_l:"#zthg_lh .to_left",
			slides_to_r:"#zthg_lh .to_right"
		});
	}
});