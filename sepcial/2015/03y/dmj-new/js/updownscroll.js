define(function(require, exports, module) {
	var ConscroolTop = function($dom, obj) {
		this.init.call(this, arguments);
	}
	ConscroolTop.prototype = {
		init: function($dom) {
			var self = this;
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
						self.Animate($this, $data, ':first');
					}, $data.times);

				}).trigger('mouseleave');
			}
			self.scrollCtrl($dom[0], $data);
		},
		scrollCtrl: function($this, $data) {
			var self = this;
			$('.ctr-b').on('click', function() {
				self.Animate($this, $data, ':first')
			});
			$('.ctr-t').on('click', function() {
				self.Animate($this, $data, ':last')
			})
		},
		Animate: function($this, $data, $childNode) {
			var $child = $this.find($data.$select + $childNode);
			var $Height = $child.find($data.childrens + $childNode).height();
			var $MoveTop =  $data.MoveTop;
			var $MoveBottom=$data.MoveBottom;
			var $set=$childNode==':first'?{marginTop: $MoveTop}:{marginTop: 0};
			$child.animate($set, 600, function() {
				if ($childNode == ':first') {
					$child.append($child.find($data.childrens + $childNode));
				} else {
					$child.prepend($child.find($data.childrens + $childNode));
					
				}
				$child.css('margin-top', '-'+$MoveBottom)

			})
		}
	}
	$.fn.ConScroolTop = function(obj) {
		var $this = $(this);
		return new ConscroolTop($this, obj)
	}
})