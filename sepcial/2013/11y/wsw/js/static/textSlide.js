define(function(require, exports, module){
	/*
		slider({
			elem: '.aside-right .marquee ul',
			during: 2000,
			nums: 3
		});
	*/
	var slider = function(options){
		var height = $(options.elem).find('li:eq(0)').outerHeight();
		var ul_height = $(options.elem).height();
		var ul_top = $(options.elem).offset().top;
		var fn, timer;

		timer = setInterval(fn = function(){
			if(Math.abs($(options.elem).offset().top) <= 452) {
				$(options.elem).animate({
					top: 0
				});
			}
			else {
				$(options.elem).animate({
					top:'-='+ height*options.nums
				});
			}
		}, options.during);

		$(options.elem).hover(function(){
			clearInterval(timer);
		}, function(){
			timer = setInterval(fn, options.during);
		});
	};

	var marquee = function(){
		
	};
	module.exports = slider;
});