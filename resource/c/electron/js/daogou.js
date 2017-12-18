/**
 * 电子频道_商情资讯
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
	var xhgd1 = $("#xhgd1"),xhgd1_xc;
	if(xhgd1.find(">li").length>8){
		xhgd1.on("gd_play mouseleave",function(){
			var o = $(this);
			//$(this).attr("gd_scid") = setInterval(function(){
			$(this).attr("gd_scid",setInterval(function(){
				o.find(">li").eq(0).slideUp(500, function () {
					o.find(">li").first().appendTo(o).show();
				})
			},2500));
		}).on("gd_stop mouseenter",function(){
			clearInterval($(this).attr("gd_scid"));
		}).trigger("gd_play");
	}
	tab(".dz_dg_box2 ul.dg_tab_t>li",".dz_dg_box2 ul.ul_img2","mouseover","s",0);
});