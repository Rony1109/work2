define(function(require, exports, module) {
	var photoWall = function(o, obj) {
		this.i = 0;
		this.init.apply(this, arguments);
	}
	photoWall.prototype = {
		init: function() {
			this.smallImgClick.apply(this, arguments);
			this.ctr.apply(this, arguments);
		},
		//滚动动画
		scrollLeft: function($dom, scrollWidth) {
			$dom.stop().animate({
				marginLeft: -scrollWidth + 'px'
			}, 400);
		},
		//小图滚动设置
		Animate: function(oUl, obj, $this, $dom, num) {
			var me = this;
			this.scrollLeft(oUl, obj['ScrollWidth'] * num);
			$this.addClass('cur').siblings().removeClass('cur');
			$dom.find('ul:first li').eq(me.i).show().siblings().hide();
		},
		//小图点击事件设置
		smallImgClick: function() {
			$dom = arguments[0], obj = arguments[1]
			var num = 0,
				me = this;
			var flag = 0;
			var Visual = obj.Visual;
			$dom.find('ul:last li').on('click', function() {
				var oUl = $dom.find('ul:last');
				var oLi = oUl.children('li')
				me.i = oLi.index(this);
				var len = oLi.length;
				var $this = $(this);
				var isLess = oUl.css('margin-left').replace(/[a-z]/g, '') < 0;

				/*小图滑动方向控制*/
				if (me.i >= Visual - 1 && me.i < len - 1) {
					if (me.i < flag) {
						num -= 1;
						if (num <= 0) {
							num = 0
						}
						me.Animate(oUl, obj, $this, $dom, num);
					} else if (me.i == flag) {
						return
					} else {
						num += 1;
						me.Animate(oUl, obj, $this, $dom, num);
					}

				} else if (isLess && me.i < len - 1) {
					if (me.i < flag) {
						num -= 1;
						if (num <= 0) {
							num = 0
						}
						me.Animate(oUl, obj, $this, $dom, num);
					}
				} else {
					$(this).addClass('cur').siblings().removeClass('cur');
					$dom.find('ul:first li').eq(me.i).show().siblings().hide();
				}
				flag = me.i;
			});
		},
		//左右方向控制键
		ctr: function() {
			var me = this;
			var $dom = arguments[0];
			var $ctrL = $dom.find('.ctr-l');
			var $ctrR = $dom.find('.ctr-r');
			var len = $dom.find('ul:last li').length;
			$ctrL.click(function() {
				me.i -= 1;
				if (me.i < 0) {
					me.i = 0;
					return
				}
				$dom.find('ul:last li').eq(me.i).trigger('click');
				return false;
			});
			$ctrR.click(function() {
				me.i += 1;
				if (me.i == len) {
					me.i = len - 1;
					return
				}
				$dom.find('ul:last li').eq(me.i).trigger('click');
				return false;
			})
		}
	}
	//实例化
	$.fn.photoWall = function(obj) {
		var $me = $(this);
		return new photoWall($me, obj)
	}

})