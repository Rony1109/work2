define(function(require, exports, module) {
	function Slide($dom, obj) {
		this.Ctr($dom);
		this.AutoAnamate.call(this, arguments);	
	}
	Slide.prototype = {
		AutoAnamate: function() {
			var $dom = arguments[0][0];
			var $ul = $dom.find('ul')
			var options = $.extend({
				timer: 5000
			}, arguments[0][1]);
			var len = $ul.find('li').length;
			var me = this;
			me.index = 0;
			$dom.hover(function() {
				clearInterval(options.onlineUp);
				if (len > 1) {
					$('.ctr-l,.ctr-r').css('display', 'block');
				}
			}, function() {
				$('.ctr-l,.ctr-r').css('display', 'none');
				options.onlineUp = setInterval(function() {
					me.index++;
					if (me.index == len) {
						me.index = 0
					};
					me.Anamate($dom, me.index);
				}, options.timer);
			}).trigger('mouseleave');
		},
		Anamate: function($dom, i) {
			var $ol = $dom.find('ol');
			var $ul = $dom.find('ul');
			$ol.find('li:eq(' + i + ')').addClass('cur').siblings('li').removeClass('cur');
			$ul.find('li:eq(' + i + ')').fadeIn().siblings('li').hide();
		},
		Ctr: function($dom) {
			var me = this;
			var $ul = $dom.find('ul');
			var $ol = $dom.find('ol');
			var $li = '';
			var len = $ul.find('li').length;
			for (var j = 0; j < len; j++) { //按钮
				$li += '<li></li>'
			}
			if ($dom.get(0)) {
				$dom.get(0).onselectstart = function() {
					return false;
				}
			}
			$ol.append($li);
			$ol.on('mouseover', 'li', function() { //鼠标经过按钮切换
				me.index = $ol.find('li').index(this);
				me.Anamate($dom, me.index);
			}).find('li:first').addClass('cur');
			$dom.on('click', '.ctr-l', function(e) { //向左切换
				e.stopPropagation();
				me.index--;
				if (me.index == -1) {
					me.index = len - 1;
				};
				me.Anamate($dom, me.index);
			}).on('click', '.ctr-r', function(e) { // 向右切换
				e.stopPropagation();
				me.index++;
				if (me.index == len) {
					me.index = 0;
				};
				me.Anamate($dom, me.index);
			})
		}
	}
	$.fn.Slide = function(obj) {
		var $dom = $(this);
		return new Slide($dom, obj);
	}

})