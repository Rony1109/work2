define(function(require, exports, module){
	module.exports = function(options){
		/*	
			options: {
				container: '.J_Marquee', //容器
				li_width: 80, //一个li的宽度
				li_space: 15,	//li之间的间隙
				controller: 'span a', //控制器对象
				c_prev: 'span.prev>a',	//前一个控制器的对象
				c_next: 'span.next>a',	//后一个控制器的对象
				show_nums: 4,  //显示多少条记录
				dis_style: 'disable',	//失效后的样式
				event_type: 'click', //事件名称,默认为点击事件
				callback: function(){}	//回调函数
			}
		*/
		var defaults = {
			container: null, //容器
			li_width: null, //一个li的宽度
			li_space: null,	//li之间的间隙
			controller: null, //控制器对象
			c_prev: null,	//前一个控制器的对象
			c_next: null,	//后一个控制器的对象
			show_nums: null,  //显示多少条记录
			dis_style: null,	//失效后的样式
			event_type: 'click', //事件名称,默认为点击事件
			callback: function(){}	//回调函数
		};

		options = $.extend(defaults, options);

		var $J_Marquee = $(options.container),
			$ul = $J_Marquee.find('ul'),	// ul
			unit_w = (options.li_width + options.li_space)*options.show_nums;
			n = parseInt($ul.find('li').length/options.show_nums) - 1;	//还有多少组

		$J_Marquee.find(options.c_prev).removeClass(options.dis_style).on(options.event_type,function(){
			$ul.stop(true,true);
			if(unit_w*n + parseInt($ul.css('left')) == 0){
				$(this).addClass(options.dis_style);
				return false;
			}
			else if(parseInt($ul.css('left')) == unit_w*n){
				$(this).removeClass(options.dis_style);
				$J_Marquee.find(options.c_next).addClass(options.dis_style);
			}
			else {
				$J_Marquee.find(options.controller).removeClass(options.dis_style);
			}

			if(unit_w*n + parseInt($ul.css('left')) == unit_w) {$(this).addClass(options.dis_style);}
			$ul.animate({
				left:'-=' +unit_w+ 'px'
			});

			return false;

		}).end().find(options.c_next).addClass(options.dis_style).on(options.event_type,function(){
			$ul.stop(true,true);
			if(parseInt($ul.css('left')) == 0){
				$(this).addClass(options.dis_style);
				return false;
			}
			else if(parseInt($ul.css('left')) == unit_w*n){
				$(this).removeClass(options.dis_style);
				$J_Marquee.find(options.c_prev).addClass(options.dis_style);
			}
			else {
				$J_Marquee.find(options.controller).removeClass(options.dis_style);
			}

			if(parseInt($ul.css('left')) == -unit_w) {$(this).addClass(options.dis_style);}
			$ul.animate({
				left:'+=' +unit_w+ 'px'
			});

			return false;
		});
		
	};
});