define(function(require, exports, module) {
	(function($, window, document,undefined) {
	function cscJqscroll(element, option) {
		this.element = element,
        this.defaults = {
        Left: 500,
        Right: 250,
        Time: 40000,
        linedUp: null,
        Auto: true,
        Visual: 3
        },
        this.option = $.extend({}, this.defaults, option||{}),
		this.init();
	}
	cscJqscroll.prototype = {
		init: function() {		
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			_thisele.data({stop:1});
			if (_thisele.find("ul").find("li").length > _option.Visual) {
				_thisele.find("ul").append(_thisele.find("ul").find("li:last"));
				_thisele.find("ul").css({"margin-left": -(this.option.Left / 2) + "px"}).prepend(_thisele.find("ul").find("li:last")).append(_thisele.find("ul").clone().find("li"));
				if (_option.Auto == true) {
					_thisele.on({
						mouseenter:function() {
						clearInterval(_option.linedUp);
					}, 
					mouseleave:function() {
						if(_thisele.data("stop")==1){
						_option.linedUp= setInterval(function() {
							_this.ScrollLeft()
						}, _option.Time);
				}
					},
					click:function(){
						_thisele.data({stop:1});
						}
					}).trigger("mouseleave");
				

				}
				_this.ScrollCtr();
			}

		},
		ScrollLeft: function() {
			
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			
			_thisele.find("ul").stop().animate({
				marginLeft: -_option.Left + "px"
			}, 500, function() {
				_thisele.find("ul").append(_thisele.find("ul").find("li:first"));
				_thisele.find("ul").css("margin-left", (-_option.Left / 2) + "px");
			});
			
		},
		ScrollRight: function() {
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			_thisele.find("ul").stop().animate({
				marginLeft: 0
			}, 500, function() {
				_thisele.find("ul").prepend(_thisele.find("ul").find("li:last"));
				_thisele.find("ul").css("margin-left", -_option.Right + "px");
			});
		},
		ScrollCtr: function() {
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			_thisele.parent().find(".left").click(function(e) {
				if (e&&e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				_this.ScrollLeft();
				return false;
			});
			_thisele.parent().find(".right").click(function(e) {
				if (e) {
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				_this.ScrollRight();
				return false;
			});
		}
	}
	$.fn.cscjqscroll = function(option) {
		var Jqscoll = new cscJqscroll(this, option);
		return this;
	};
	
})(jQuery, window, document);
})