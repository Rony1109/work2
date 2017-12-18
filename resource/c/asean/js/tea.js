define(function(require, exports, module) {
	require('./init');
	//banenr
	var ie6 = !-[1, ] && !window.XMLHttpRequest;
	if (ie6) {
		$(".side-nav li").hover(function() {
			$(this).addClass("hover");
		}, function() {
			$(this).removeClass("hover");
		})
	}
	require('./banner-scroll');
	var ts;
	$('.J-slide').BannerScroll({
		OnLine: ts,
		Time: 5000,
		NavNumber: true,
		ChangeColor: $(".banner")
	});
	var tabs = require('tab');
	tabs($(".tab-nav li"), $(".product"), 'mouseover', 'active');

	require('./scroll');
	var times;
	$(".bp-product").CscScroll({
		Left: 538,
		Right: 269,
		Time: 2000,
		linedUp: times,
		Auto: false,
		Visual: 1
	});
	$(".bp-product").hover(function() {
		$(".J-ctr").show();
	}, function() {
		$(".J-ctr").hide();
	})

})