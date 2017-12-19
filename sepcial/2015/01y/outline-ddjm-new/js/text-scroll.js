define(function(require, exports, module) {
	var ConscroolTop = function($dom, obj) {
		this.init.call(this, arguments);
	}
	ConscroolTop.prototype = {
		init: function($dom) {
			var options = {
				$select: 'ul',
				childrens: 'li',
				MoveTop: '-30px',
				times: 5000
			}
			var $data = $.extend(options, $dom[1]);
			var $height = $dom[0].find($data.$select).height();
			var $heightMain = $dom[0].height();
			if ($height > $heightMain) {
				$dom[0].hover(function() {
					var $this = $(this);
					clearInterval($data.timer)
				}, function() {
					var $this = $(this);
					$data.timer = setInterval(function() {
						var $child = $this.find($data.$select+':first');
						var $Height = $child.find($data.childrens + ':first').height();
						var setScrollH = $Height > $data.MoveTop ? $Height : $data.MoveTop;
						$child.animate({
							marginTop: setScrollH
						}, 600, function() {
							$child.append($child.find($data.childrens + ':first'));
							$child.css('margin-top', 0)
						})
					}, $data.times)
				}).trigger('mouseleave');
			}
		}
	}
	$.fn.ConScroolTop = function(obj) {
		var $this = $(this);
		return new ConscroolTop($this, obj)
	}
})