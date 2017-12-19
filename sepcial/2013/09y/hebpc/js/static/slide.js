define(function(require , exports , module){
	var slide = function(options){
		var defaults = {
			elem : '.content .nav-src ul li',
			thumb : '.content .nav-src ol li',
			curStyle : 'cur',
			parentEl : '.nav-src',
			during : 500,
			speed : 3000,
			type : 'mouseover'
		};

		var options = $.extend(defaults , options || {});

		var curNum, timer;
		//事件控制播放
		$(options.elem).eq(0).show().siblings('li').hide();
		$(options.thumb).each(function(index){
			$(this).bind(options.type , function(){
				curNum = index;
				$(this).addClass(options.curStyle).siblings('li').removeClass(options.curStyle);
				$(options.elem).eq(index).fadeIn(options.during).siblings('li').fadeOut(options.during);
			});
		});

		var nums = $(options.thumb).length;
		//自动播放
		function autoPlay(){
			if(!curNum) curNum = 0;
			if(!timer) clearInterval(timer);
			timer = setInterval(function(){
				if(curNum == (nums-1)) curNum = 0;
				else {
					curNum++;
				}

				$(options.thumb).eq(curNum).addClass(options.curStyle).siblings('li').removeClass(options.curStyle);
				$(options.elem).eq(curNum).fadeIn(options.during).siblings('li').fadeOut(options.during);
				

			}, options.speed);
		}
		
		autoPlay();
		$(options.parentEl).hover(function(){
			clearInterval(timer);
		} , function(){
			autoPlay();
		});
		
		
	};

	module.exports = slide;
});