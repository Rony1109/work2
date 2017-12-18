define(function(require, exports, module) {
	require('./init');
	require('./banner-scroll');
	//轮播
	var tms;
	$('.J-slide').Slide({
		onlineUp: tms,
		timer: 6000
	});

	/*卖场行情&精彩专题*/
	var $newsTabs = $('.news-tabs');
	$newsTabs.on('mouseover', 'li', function(event) {
		event.preventDefault();
		var $index = $newsTabs.find('li').index(this);
		var $more = $newsTabs.find('a');
		$(this).addClass('cur').siblings('li').removeClass('cur');
		$more.eq($index).show().siblings('a').hide();
		$('.news-tab-content').eq($index).show().siblings('.news-tab-content').hide();
	});
	//热词
	var Ary = ['#fef9f9-14px-400-#444', '#fdf5f5-14px-400-#444', '#f5f8ff-16px-700-#444', '#fffff7-14px-400-#444', '#fdf2f2-14px-400-#444', '#fef9f9-15px-400-#444', '#f5f8ff-12px-400-#666', '#fffff7-15px-700-#444', '#fef9f9-15px-700-#444', '#fdf5f5-15px-400-#7b7b7b']
	$(".hot-word a").each(function() {
		var random = Math.round(Math.random() * 9),
			ArySplit = Ary[random].split('-');
		$(this).css({
			"background": ArySplit[0],
			"font-size": ArySplit[1],
			"font-weight": ArySplit[2],
			'color': ArySplit[3]
		})
	});
})