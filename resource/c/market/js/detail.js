/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('./init');
	var play = require('m/sea-modules/focusPlay');
	if($('.banner').find('li').length > 1){
		play.focusPlay('.banner',null,5000);
	}
	if($('.venuesimage').find('li').length > 1){
		play.focusPlay('.venuesimage',null,5000);
	}

	var $info = $('div.body-detail'),
		$showBtn = $('div.J_closeMap'),
		$closeBtn = $('div.close-arr');

	$(document).delegate('.J_showMap', 'click', function(event) {
		$closeBtn.hide();
		$info.animate({width:0}, 400,function(){
			$showBtn.fadeIn('fast');
		});
		return false;
	}).delegate('.J_closeMap', 'click', function(event) {
		$showBtn.fadeOut('fast');
		$info.animate({width:850}, 400,function(){
			$closeBtn.fadeIn('fast');
		});
		return false;
	});
});