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
	require('http://res.csc86.com/js/c/sns/public/pmodel.js');
	require('http://res.csc86.com/js/c/sns/tradering.js');

	//友情链接更多
	var dz_f_links = $(".dz_f_links");
	if (dz_f_links.height() > 26) {
		dz_f_links.addClass("dz_hide").find(".more span").bind("click", function() {
			var $t = $(this),
				$div = $(".dz_f_links");
			if ($t.hasClass("s1")) {
				$t.removeClass("s1");
				$div.addClass("dz_hide");
			} else {
				$t.addClass("s1");
				$div.removeClass("dz_hide");
			}
		});
	}

	$(window).on({
		scroll: function() {
			var _top = $(document).scrollTop();
			//alert(navigator.userAgent.toLowerCase());
			if (_top > 220) {
				$('.back-top').show();
			} else if (_top == 0) {
				$('.back-top').hide();
			}
		},
		resize: function() {
			//浏览器的宽度
			var win_w = $(this).width();
			//页面的宽度
			var d_w = 1000,
				el_w = $('.back-top').width();
			var el_right = (win_w - d_w) / 2;

			if (el_right < el_w / 2) {
				$('.back-top').css({
					right: -el_w * 2
				});
			} else if (el_right <= el_w * 2) {
				$('.back-top').css({
					right: 0
				});
			} else if (el_right <= el_w * 3 && el_right > el_w * 2) {
				$('.back-top').css({
					right: el_w
				});
			} else {
				$('.back-top').css({
					right: el_right * 2 / 3
				});
			}
		}
	}).trigger('resize');
	$('.back-top').delegate('a','click',function() {
		setTimeout(function(){$(document).scrollTop(0);},100)
	});

	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<650){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
});