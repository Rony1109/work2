define(function(require, exports, module) {
	require('./init');
	$(".tour-tab").on('mouseover', 'li', function() {
		var index=$(".tour-tab li").index(this);
		$(".tour-box").eq(index).show().siblings('.tour-box').hide();
		$(this).addClass('cur').siblings('li').removeClass('cur');
	})
})