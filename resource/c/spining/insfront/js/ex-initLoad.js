define(function(require, exports, module){
	module.exports = function(){
		$('.hot-guide .list ul li:nth-child(2n)').css({
			'border-right': 'none',
			'padding-right': '0',
			'padding-left': '15px'
		});

		$('.hot-guide .list ul li:nth-child(3n)').css({
			'padding-top': '15px',
			'padding-bottom': '0', 
			'border-bottom': 'none'
		});

		$('.hot-guide .list ul li:last-child').css({
			'padding-top': '15px', 
			'padding-bottom': '0', 
			'border-bottom': 'none'
		});

		$('.ext-recom .list li:nth-child(3n)').css('margin-right','0');

		$('.col-aside .ac-pro dd:last-child').css('margin-bottom','0');

		$('.hot-special .list ul.fot-ul li:nth-child(3n)').css('margin-right','0');

		$('.hot-special .list li:last-child').css('margin-right','0');
	};
});