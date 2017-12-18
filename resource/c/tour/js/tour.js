define(function(require, exports, module) {
	require('./init');
	$(".items-2 li").hover(function() {
		$(this).find('p').stop().animate({
			height: '170px'
		});
		$(this).find('span.bg').stop().animate({
			height: '170px'
		});
	}, function() {
		$(this).find('p').stop().removeAttr('style');
		$(this).find('span.bg').stop().removeAttr('style');
	});
})