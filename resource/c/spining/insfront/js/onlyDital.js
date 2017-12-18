define(function(require, exports, module){
	module.exports = function(){
		$('.pageBar').find('input[type=text]').on('keyup', function(){
			if(/^[\d]+$/g.test($(this).val()) && $(this).val() != "") {
				$(this).siblings('input').fadeIn();
			}
			else{
				$(this).val('');
				$(this).siblings('input').fadeOut();
			}
		});
	};
});