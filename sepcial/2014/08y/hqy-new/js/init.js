/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});
	
	$(".pho .poh-all").delegate("li","click",function(){
		var $th=$(this),ind=$th.index();
		if(!$th.hasClass("cur")){
			$(".pho .poh-all li").removeClass("cur").eq(ind).addClass("cur");
			$(".pho .box").removeClass("boxcur").eq(ind).addClass("boxcur");
		}	
	});
	$(".bx-r .l").bind("click",function(){
			var $tli=$(".boxcur .bx-r .ul-img ul li:eq(0)");
			if($tli.hasClass("cur")){
				$tli.removeClass("cur").next().addClass("cur");
				$(".boxcur .bx-l img").removeClass("cur").eq(1).addClass("cur");
			}
			$(".boxcur .ul-img ul").append($(".boxcur .ul-img ul li:eq(0)"));
			$(".boxcur .bx-l").append($(".boxcur .bx-l img:eq(0)"));
	});
	
	$(".bx-r .r").bind("click",function(){
			var thds=$(".boxcur .bx-r .ul-img ul li").length-1;
			var $tli=$(".boxcur .bx-r .ul-img ul li:eq(0)");
			if(!$tli.hasClass("cur")){
				$(".boxcur .bx-r .ul-img ul li.cur").removeClass("cur").prev().addClass("cur");
				$(".boxcur .bx-l img.cur").removeClass("cur").prev().addClass("cur");
			}
			$(".boxcur .bx-r .ul-img ul").prepend($(".boxcur .bx-r .ul-img ul li:eq("+thds+")"));
			$(".boxcur .bx-l").prepend($(".boxcur .bx-l img:eq("+thds+")"));
			
	});
	
	$(".bx-r .ul-img ul").delegate("li","click",function(){
		var $th=$(this),ind=$th.index();
		if(!$th.hasClass("cur")){
			$(".tab-sig .boxcur .bx-r .ul-img ul li").removeClass("cur").eq(ind).addClass("cur");
			$(".tab-sig .boxcur .bx-l img").removeClass("cur").eq(ind).addClass("cur");
		}	
	});
	
	$(".tball").click(function(){
		var $th=$(this),idx=$th.index();
		if(idx>0){
			$(".tball").removeClass("tlcur");
			$(".tball").removeClass("tlcurone");
			$(".tab-sig").removeClass("tballcur");
			$th.addClass("tlcur");
			$(".tab-sig:eq("+idx+")").addClass("tballcur");
		}else{
			$(".tball").removeClass("tlcur");
			$(".tab-sig").removeClass("tballcur");
			$th.addClass("tlcurone");
			$(".tab-sig:eq("+idx+")").addClass("tballcur");
		}
	});
	
	$(".tablenameto").click(function(){
		var $th=$(this),idx=$th.index()-1;
		if(idx>0){
			$(".tball").removeClass("tlcur");
			$(".tball").removeClass("tlcurone");
			$(".tab-sig").removeClass("tballcur");
			$(".tball:eq("+idx+")").addClass("tlcur");
			$(".tab-sig:eq("+idx+")").addClass("tballcur");
		}else{
			$(".tball").removeClass("tlcur");
			$(".tab-sig").removeClass("tballcur");
			$(".tball:eq(0)").addClass("tlcurone");
			$(".tab-sig:eq(0)").addClass("tballcur");
		}
		document.location.href=window.location.pathname+"#tabname"
		return false;
	});
	
    
})