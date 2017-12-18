define(function(require, exports, module) {
	function BannerScroll(dom, data) {
		this.Myparent = dom;
		this.init.apply(this, arguments);
	}
	BannerScroll.prototype = {
		init: function() {
			this.constractor(arguments[0]);
			var navNumber = arguments[1]['NavNumber'] == undefined ? false : arguments[1]['NavNumber'];
			this.AnimateCtrl(arguments[0], navNumber);
			this.Animate(arguments[0], arguments[1]);
		},
		constractor: function(parent) {
			var $parent = parent
			var $Li = $parent.children('ul').find('li');
			$Li.each(function(){
				var $me=$(this)
				$me.css('background',"url("+$me.find('img').attr('src')+") no-repeat center 0");
			});
			var LF=$parent.width()/2-$parent.children('ol').width()/2;
			$parent.children('ol').css('left',LF+'px')
		},
		Animate: function(dom, data) {
			var me = this;
			var $parent = dom;
			var Li = $parent.children('ul').find('li')
			this.len = Li.length;
			this.index = 0;
			$parent.hover(function() {
				clearInterval(data.OnLine);
			}, function() {
				data.OnLine = setInterval(function() {
					me.index++;
					if (me.index == me.len) {
						me.index = 0
					}
					me.Scroll(Li, me.index);
				}, data.Time);
			}).trigger("mouseleave");
		},
		Scroll: function(Li, i) {
			var me = this;
			Li.eq(i).fadeIn().siblings().hide();
			if (this.Myparent.find('ol')) {
				this.Myparent.find('ol').find('li').eq(i).addClass('cur').siblings().removeClass('cur');
			}
		},
		AnimateCtrl: function(dom, NavNumber) {
			var me = this;
			var $parent = dom;
			var Li = $parent.find('li')
			if (NavNumber == true) {
				var len = dom.find('li').length;
				var Ary = '<li class="cur">1</li>';
				for (var i = 1; i < len; i++) {
					Ary += "<li>" + (i + 1) + "</li>"
				}
				dom.find("ol").append(Ary);
				dom.children("ol").delegate('li', 'mouseover', function() {
					var index = (Number($(this).text()) - 1);
					$(this).addClass('cur').siblings('li').removeClass("cur");
					me.Scroll(Li, index);
				});
			} else {
				$parent.delegate("span.ctr-r", 'click', function() {
					me.index++;
					if (me.index == me.len) {
						me.index = 0
					}
					me.Scroll(Li, me.index);
				});
				$parent.delegate("span.ctr-l", 'click', function() {
					me.index--;
					if (me.index < 0) {
						me.index = me.len - 1
					}
					me.Scroll(Li, me.index);
				});
			}
		}
	}

	$.fn.BannerScroll = function(data) {
		var $dom = $(this);
		return new BannerScroll($dom, data);
	}
})