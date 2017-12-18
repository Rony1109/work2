/**
 * 前端模板js文件
 * 
 */

define(function(require, exports, module) {

	$(window).on({
		scroll: function(){
			var _top = $(document).scrollTop();
			//alert(navigator.userAgent.toLowerCase());
			if(_top > 220) {
				$('.toolbar-up').show();
			}
			else if(_top == 0) {
				$('.toolbar-up').hide();
			}
		},
		resize: function(){
			//浏览器的宽度
			var win_w = $(this).width();
			//页面的宽度
			var d_w = 1000, el_w = $('.toolbar-up').width();
			var el_right = (win_w - d_w)/2;

			if(el_right < el_w/2) {
				$('.toolbar-up').css({right: -el_w*2});
			}
			else if(el_right <= el_w*2) {
				$('.toolbar-up').css({right: 0});
			}
			else if(el_right <= el_w*3 && el_right > el_w*2){
				$('.toolbar-up').css({right: el_w});
			}
			else {
				$('.toolbar-up').css({right: el_right*2/3});
			}
		}
	}).trigger('resize');

	$('.toolbar-up a:eq(1)').on('click', function(){
		$('.toolbar-up').hide();
		$('html,body').animate({
			scrollTop: 0
		});
		return false;
	});

	$('.selected_channel').on({
		mouseover: function(){
			$(this).find('.sel_chnel').addClass('hover');
			$(this).find('.chnel_list').show();
		},
		mouseout: function(){
			$(this).find('.sel_chnel').removeClass('hover');
			$(this).find('.chnel_list').hide();
		}
	});

});