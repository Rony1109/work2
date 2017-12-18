/**
 * 前端模板js文件
 *
 */
seajs.config({
	alias: {
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js'
	}
});

define(function(require, exports, module) {
	require('top');
	require('header');
	require('placeholder');
	require('./scroll');
	var times;
	$(".tf-top").CscScroll({
		Left: 600,
		Right: 300,
		Time: 2000,
		linedUp: times,
		Auto: true,
		Visual: 1
	});

	var tab = require("tab");
		tab($(".tab-set li"),$(".tab-inner ul"),"mouseover","cur");
	//IE hover
    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    if (ie6) {
        $(".products-box li").hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
        $(".famous li").hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
        $(".floor-product li").hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
    }
   //友情链接更多
    var dz_f_links = $(".dz_f_links");
    if(dz_f_links.height() > 26){
        dz_f_links.addClass("dz_hide").find(".more span").bind("click",function(){
            var $t = $(this),$div = $(".dz_f_links");
            if($t.hasClass("s1")){
                $t.removeClass("s1");
                $div.addClass("dz_hide");
            }else{
                $t.addClass("s1");
                $div.removeClass("dz_hide");
            }
        });
    }
});