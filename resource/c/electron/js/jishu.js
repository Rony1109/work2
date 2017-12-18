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
	var p_ban = new slide("#lh_box .li_lh","#lh_box .li_lh>li",{
					slideWidth:730,
					slideHeight:250,
					slideDirection:0,
					slides_auto_span:5000,
					slideSeries:1,		
					slideButs_bindsj:"mouseover",
					slideButs:"#lh_box .but",		//切换按钮容器，样式自定义
					slideButs_html:null,
					slides_fun:slide.definedfun
					//slides_fun:q_banner_event
	});
	//$("#lh_box .ban_tex").bind("mouseenter",function(){p_ban.zantin=true;}).bind("mouseleave",function(){p_ban.zantin=false;});
	//右侧文字切换动画;
	/*	
	function q_banner_event(i){
		var tabs = this.slideButs.find("a");//$("#q_banner .ban_but>a");
		tabs.removeClass("s");
		$(tabs[i]).addClass("s");
		$("#lh_box .ban_tex").stop();
		var html = $(this.slides[i]).find(".a_text").html();
		$("#lh_box .ban_tex").animate({"right":"-250px"},200,function(){
			$("#lh_box .ban_tex_t").html(html)
			$("#lh_box .ban_tex").animate({"right":"0px"},400);
		})
	}*/
	
});