define(function(require, exports, module) {
	(function($, window, document,undefined) {
	function cscplay(element, option) {
		this.element = element,
        this.defaults = {
        step: 1140,
		step2: 230,
        Time: 4000,
        linedUp: null,
        Auto: true,
        Visual: 1,
		num:0,
		num1:0,
		num2:5
        },
        this.option = $.extend({}, this.defaults, option||{}),
		this.init();
	}
	cscplay.prototype = {
		init: function() {		
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			var liwidth = _thisele.find(".ul").find(".conli").width();
			var linum = _thisele.find(".ul").find(".conli").length;
			_thisele.find(".ul").css("width",+liwidth*linum+"px");
			if (_thisele.find(".ul").find(".conli").length > _option.Visual) {
				if (_option.Auto) {
					_thisele.on({
						mouseenter:function() {
							
						clearInterval(_option.linedUp);
					}, 
					mouseleave:function() {
						_option.linedUp= setInterval(function() {
							_option.num++;
							if(_option.num>=_thisele.find(".ul").find(".conli").length){_option.num=0}
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
			
			_thisele.find(".list").find("li").click(function(e) {
				var $me=$(this);
				if (e&&e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				_option.num1 = _option.num;
				_option.num=$me.index();
				$me.addClass("active").siblings().removeClass("active");
				_this.Scroll();
				return false;
			});
			
			_thisele.find(".right").click(function(e) {
				var $me=$(this);
				if (e&&e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				_option.num1 = _option.num;
				_this.RightScroll();
				return false;
				});	
			_thisele.find(".left").click(function(e) {
				var $me=$(this);
				if (e&&e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue = false;
				}
				_option.num1 = _option.num;
				_this.LeftScroll();
				return false;
				});	
			
		},
		LeftScroll: function() {
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			var len = _thisele.find(".ul").find(".conli").length;
			var nums;
			_option.num--;
			if(_option.num<0){_option.num=_thisele.find(".ul").find(".conli").length-1}
			if(_option.num>_option.num1){
				nums=(len-_option.num2)>_option.num?_option.num:len-_option.num2;
				}
			if(_option.num<_option.num1){
				nums=_option.num+1-_option.num2>=0?_option.num+1-_option.num2:0;
				}
			_thisele.find(".ul").stop().animate({
				marginLeft: -_option.step*_option.num + "px"
			}, 500);
			_thisele.find(".ul2").stop().animate({
				marginLeft: -_option.step2*nums + "px"
			}, 1000);
			_thisele.find(".list").find("li").eq(_option.num).addClass("active").siblings().removeClass("active");
		},
		RightScroll: function() {
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			var len = _thisele.find(".ul").find(".conli").length;			
			var nums;
			_option.num++;
			if(_option.num>=_thisele.find(".ul").find(".conli").length){_option.num=0}
			if(_option.num>_option.num1){
				nums=(len-_option.num2)>_option.num?_option.num:len-_option.num2;
				}
			if(_option.num<_option.num1){
				nums=_option.num+1-_option.num2>=0?_option.num+1-_option.num2:0;
				}
			_thisele.find(".ul").stop().animate({
				marginLeft: -_option.step*_option.num + "px"
			}, 500);
			
			_thisele.find(".ul2").stop().animate({
				marginLeft: -_option.step2*nums + "px"
			}, 1000);
			_thisele.find(".list").find("li").eq(_option.num).addClass("active").siblings().removeClass("active");
		},
		Scroll: function() {
			var _this = this;
			var _thisele=_this.element;
			var _option=_this.option;
			var len = _thisele.find(".ul").find(".conli").length;
			var nums;
			if(_option.num>_option.num1){
				nums=(len-_option.num2)>_option.num?_option.num:len-_option.num2;
				}
			if(_option.num<_option.num1){
				nums=_option.num+1-_option.num2>=0?_option.num+1-_option.num2:0;
				}
			if(_option.num==_option.num1){
				return false;
				}	
			_thisele.find(".ul").stop().animate({
				marginLeft: -_option.step*_option.num + "px"
			}, 500);
			
			_thisele.find(".ul2").stop().animate({
				marginLeft: -_option.step2*nums + "px"
			}, 1000);			
			_thisele.find(".list").find("li").eq(_option.num).addClass("active").siblings().removeClass("active");
		}
	}
	$.fn.cscplay = function(option) {
		var Jqplay = new cscplay(this, option);
		return this;
	};
	
})(jQuery, window, document);
})