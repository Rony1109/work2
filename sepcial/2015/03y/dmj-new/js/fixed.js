define(function(require, exports, module) {
	var sTimer = null;
	var rTimer = null;
	var $this = $('.side-nav');
	var ie6 = /MSIE.6/.test(navigator.userAgent);
	var $window = $(window);
	var $document = $(document);
	var num = parseInt($this.css('top'), 10);
	var maxTop = $document.height() - $this.height() - num;
	$window.on({
		scroll: function() {
			var Ht = $window.height() - $this.height() - num;
			var Tpr = $document.scrollTop();
			if (sTimer) {
				clearTimeout(sTimer);
			}
			sTimer = setTimeout(function() {
				if (Tpr > 600) {
					$this.show()
				} else {
					$this.hide();
				}
				if (ie6) {
					$this.stop(true).animate({
						'top': Math.min(maxTop, Tpr)
					}, 'fast');
				}
			}, 100);

		},
		resize: function() {
			var winWh = $window.width();
			var $domWidth = $this.parent().width();
			var domMr = (winWh - $domWidth) / 2 - $this.width() - 12;
			if (rTimer) {
				clearTimeout(rTimer);
			}
			rTimer = setTimeout(function() {
				$this.css({
					'right': domMr > -1 ? 'auto' : 0,
					'marginLeft': domMr > -1 ? $domWidth + 12 : 'auto'
				}).show();
				$window.trigger('scroll');
			}, 100);
		}
	}).trigger('resize');
	$this.on('click', '.go-back', function() {
		$(window).scrollTop(0);
	});

	function Animate(num) {
		$this.find('ul').stop(true).animate({
			marginTop: num + 'px'
		}, 400)
	}
	var $num = 0;
	$('.scroll-t').on('click', function() {
		var $mainH = $('.nav-main').find('ul').height() - $('.nav-main').height();
		if (-$num + 1 >= $mainH) return;
		$num += -39;
		Animate($num);
	});
	$('.scroll-b').on('click', function() {
		if ($num >= 0) return;
		var $mainH = $('.nav-main').find('ul').height() - $('.nav-main').height();
		$num += 39;
		Animate($num);
	});
})