define(function(require, exports, module) {

	//导航位置判断
	var winWh = $(window).width(),
		domMr = (winWh - 1000) / 2 - $(".fixed").width() - 14;
	domMr = domMr > 0 ? domMr : 0
	$(".fixed").css('right', domMr + "px");

	//ie6 hover 效果
	var ie6 = !-[1, ] && !window.XMLHttpRequest;
	if (ie6) {
		$(".fixed li").hover(function() {
			var $me = $(this);

			if ($me.hasClass('icon-dot')) {
				$me.addClass('hover_a');
			} else {
				$me.addClass('hover');
			}
		}, function() {
			$(this).removeClass('hover_a');
			$(this).removeClass('hover');
		})
	}
	var Ary = [];
	$('.J_top').each(function() {
		var TP = $(this).offset().top;
		Ary.push(TP);
	});
	Ary.push($('.foot').offset().top);
	//滚动条总高度
	var arrivedAtBottom = function() {
		return $(document).scrollTop() + $(window).height() == $(document).height();
	};
	//显示右侧导航
	var isIndex = $('.main-nav li:eq(0) a').hasClass('active');
	$(window).scroll(function() {
		var $me = $(this)
		var topscr = $me.scrollTop();
		if (topscr > 130) {
			$(".fixed").removeClass('g-dn');
		} else {
			$(".fixed").addClass('g-dn');
		};
		for (var i = 0; i < Ary.length; i++) {
			if (topscr < Ary[i + 1]) {
				if ($(".fixed li").eq(i).hasClass('icon-dot')) {
					$(".fixed li").eq(i)
						.addClass('active_a')
						.siblings('li')
						.removeClass('active_a')
						.removeClass('active');
				} else {
					$(".fixed li").eq(i)
						.addClass('active')
						.siblings('li')
						.removeClass('active_a')
						.removeClass('active');
				}
				return true;
			}

		}
		if (arrivedAtBottom()) {
			if ($(".fixed li").eq(i).hasClass('icon-dot')) {
				$(".fixed li:last").addClass('active_a')
					.siblings('li')
					.removeClass('active_a')
					.removeClass('active');
			} else {
				$(".fixed li:last").addClass('active')
					.siblings('li')
					.removeClass('active_a')
					.removeClass('active');
			}
			return;
		}
	});
	//返回顶部
	$(".fixed").on('click', '.back-top', function() {
		$(".fixed").addClass('g-dn');
		$(window).scrollTop(0)
	});
	//伸缩
	$(".telescopic,.telescopic-1").click(function() {
		$(".fixed ul").toggle();
	});
})