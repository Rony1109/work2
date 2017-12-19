define(function(require, exports, module) {
	function PhotoWall() {
		var option = {};
		var optopns = $.extend(option, arguments[1]);
		this._init.apply(this, [arguments[0], optopns]);
	}
	PhotoWall.prototype = {
		_init: function() {
			var self = this;
			self.index = 0;
			self.parents = arguments[0];
			/*self.constractor(arguments[0])*/
			self._AnimateCtrl(arguments[0]);
			return self;
		},
		_Animate: function(parent, index) {
			$(parent).find('li').eq(index).fadeIn().siblings('li').hide();
		},
		_AnimateCtrl: function(parent) {
			var self = this,
				$parent = $(parent),
				len = $parent.find('li').length;
			$(parent).on('click', '.lscr', function() {
				self.index--;
				if (self.index < 0) self.index = len - 1;
				self._Animate(parent, self.index);
			});
			$(parent).on('click', '.rscr', function() {
				self.index += 1;
				if (self.index == len) self.index = 0;
				self._Animate(parent, self.index);
			});
		},
		tabs: function(tabNav, tabContent) {
			var self = this,
				i = 0,
				$tabContent = $(tabContent),
				len = $tabContent.length;
			$(tabNav).on('click', function() {
				var index = $(tabNav).index(this);
				if (index == 1) {
					i--;
					if (i < 0) i = len - 1;
					$tabContent.eq(i).show().siblings('ul').hide();
				} else {
					i++;
					if (i == len) i = 0;
					$tabContent.eq(i).show().siblings('ul').hide();
				}
			});
			$tabContent.on('click', 'li', function() {
				self.index = $tabContent.find('li').index(this);
				self._Animate(self.parents, self.index);
			});
		}
	}
	exports.PhotoWall = function(parent, obj) {
		return new PhotoWall(parent, obj);
	}
})