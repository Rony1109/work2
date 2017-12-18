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
	var searDefult = null;
	if (!document.all) {
		$('.ss-txt').on('focusin focusout', '.txt', function(e) {
			if (e.type == "focusin") {
				searDefult = $(this).attr('placeholder');
				if ($(this).attr('placeholder') == "请输入产品名称" || $(this).attr('placeholder') == "请输入公司名称或关键词") {
					$(this).attr('placeholder', '');
				}
			} else if (e.type == "focusout") {
				$(this).attr('placeholder', searDefult);
			}
		});
	}
});