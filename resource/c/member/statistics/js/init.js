/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('c/member/common/js/sideNav');
	$('table.table').delegate('tbody tr', 'mouseover', function(event) {
		$(this).addClass('bg');
	}).delegate('tbody tr', 'mouseout', function(event) {
		$(this).removeClass('bg');
	});
	$('a.tips-close').bind('click', function(event) {
		event.preventDefault();
		$(this).parents('div.tips').fadeOut(400);
	});
	exports.tabs = function (tab,callback){
		callback = callback || function(){};
		$(tab).delegate('ul.tabs-hd li:not(.cur)', 'click', function(event) {
			var $t = $(this),
				$tabs = $t.parents('.tabs');
			$t.addClass('cur').siblings('.cur').removeClass('cur');
			$tabs.find('.tabs-bd').removeClass('tabs-bd-cur').eq($t.index()).addClass('tabs-bd-cur');
			callback($t);
		});
	}
});