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
	tab("#tab1 .tab_t a",["#tab1 .more a","#tab1 .tab_d1"],"mouseover","s");
	new slide("#lh_box1 .li_lh", "#lh_box1 .li_lh>li", {
		slideWidth : 350,
		slideHeight : 146,
		slideDirection : 2,
		slides_auto_span : 5000,
		slideButs_bindsj : "mouseover",
		slideButs : "#lh_box1 .but",
		slides_fun : function(i){
			slide.definedfun.call(this,i);
			var url = $(this.slides[i]).find("a").attr("href"),
				txt = $(this.slides[i]).find("a").attr("title");
			$("#lh_box1 .text span").html('<a href="' + url + '" title="' + txt + '" target="_blank">' + txt + '</a>');
		}
	});
	tab(".zxph_box .tab_type1 a",".zxph_box ol.ol_text_type2","mouseover","s");
	
});