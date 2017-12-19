define(function(require, exports, module) {
	exports.fixed = function(self,hide) {
		var sTimer = null;
		var rTimer = null;
		var $this = $(self);
		var ie6 = /MSIE.6/.test(navigator.userAgent);
		var $window = $(window);
		var $document = $(document);
		var num = parseInt($this.css('bottom'), 10);
		var maxTop = $document.height() - $this.height() - num;
		$window.on({
			scroll: function() {
				var Ht = $window.height() - $this.height() - num;
				var Tpr = $document.scrollTop();
				if (hide) {
					$this[Tpr > 700 ? 'show' : 'hide']();
				}
				if (sTimer) {
					clearTimeout(sTimer);
				}
				if (ie6) {
					sTimer = setTimeout(function() {
						$this.stop(true).animate({
							'top': Math.min(maxTop, Tpr + Ht)
						}, 'fast');
					}, 100);
				}
			},
			resize: function() {
				var winWh = $window.width();
				var $domWidth = $this.parent().width();
				var domMr = (winWh - $domWidth) / 2 - $this.width() - 12;
				console.log(domMr)
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
	}
})