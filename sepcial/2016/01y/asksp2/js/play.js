define(function(require, exports, module) {
	(function($, window, document,undefined) {
	function cscplay(element, option) {
		this.element = element,
        this.defaults = {
        step: 1000,
        Time: 4000,
        linedUp: null,
        Auto: true,
        Visual: 1,
		num:1
        },
        this.option = $.extend({}, this.defaults, option||{}),
		this.init();
	}
	cscplay.prototype = {
		init: function() {		
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			if (_thisele.find(".center").find(".contxt").length > _option.Visual) {
				if (_option.Auto == true) {
					_thisele.on({
						mouseenter:function() {
						clearInterval(_option.linedUp);
					}, 
					mouseleave:function() {
						_option.linedUp= setInterval(function() {
							
							_this.Scroll();
						}, _option.Time);

					}
					}).trigger("mouseleave");
				}
				_this.Scrollmove();
			}

		},
	Scrollmove: function() {
			
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			
			_thisele.find(".head").find("li").click(function(e) {
				var $me=$(this);
				if (e&&e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				_option.num=$me.index();
				$me.addClass("active").siblings().removeClass("active");
				_this.Scroll();
				return false;
			});
			
		},
		Scroll: function() {
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			_thisele.find(".center").stop().animate({
				marginLeft: -_option.step*_option.num + "px"
			}, 500);
			_thisele.find(".head").find("li").eq(_option.num).addClass("active").siblings().removeClass("active");
			_option.num++;
			if(_option.num>=_thisele.find(".center").find(".contxt").length){_option.num=0}
		}
	}
	$.fn.cscplay = function(option) {
		var Jqplay = new cscplay(this, option);
		return this;
	};
	
})(jQuery, window, document);
})