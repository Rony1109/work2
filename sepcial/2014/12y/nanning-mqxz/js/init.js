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
	
	  $(window).scroll(function() {
			var topscr = $(this).scrollTop();
			//alert(topscr);
			if (topscr < 500) {
			  $(".fiexd").addClass("fiexd_nav");
			} else {
			  $(".fiexd").removeClass("fiexd_nav");
			}
		  });

	  $(".tball").click(function(index) {
			var $th = $(this),
			  idx = $th.index();
			if (idx > 0) {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $th.addClass("tlcurone");
			  $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
			} else {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $th.addClass("tlcurone");
			   $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
				}
		  });

		  $(".tball").each(function(index){
				$(this).on('click',function(){
					$(".tab-sig").eq(index).show().sliblings(".tab-sig").hide();
				})	
			})

		
		  $(".tablenameto").click(function() {
			var $th = $(this),
			  idx = $th.index();
			if (idx > 0) {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $(".tball:eq(" + idx + ")").addClass("tlcurone");
			   $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
			} else {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $(".tball:eq(0)").addClass("tlcurone");
			  $(".tab-sig:eq(0)").addClass("tballcur");
			}
			document.location.href = window.location.pathname + "#tabname"
			return false;
		  });


});