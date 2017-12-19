define(function(require, exports, module) {
	function ImgScroll() {
		this.init.apply(this, arguments);
	};
	ImgScroll.prototype = {
		init: function(data, $this) { //构造器

			this.AutoScroll.apply(this, arguments);

		},
		SetFirst: function(dom) { //第一个LI元素中插入span
			var $me = dom;
			var $li = $me.find("li:first");
			var $span = $("<span></span>");
			$span.addClass("first");
			if ($li.find(".first").length > 0) {
				return
			}
			$li.append($span).siblings("li").find("span").remove();
			$(".cur").find(".list img").css({
				width: "585px",
				height: "435px"
			})

		},
		ScrollCtr: function($this) { //设置点击事件
			var $me = $this,
				me = this;
			$me.delegate("li", "click mouseover mouseout", function(e) {
				if (e.type == "click") {
					$(this).addClass("cur").siblings("li").removeClass("cur");
					$me.find('ul').prepend($(this));
					me.SetFirst($this);
					me.SetLi($me);
				} else if (e.type == "mouseover") {
					if ($(this).hasClass("cur")) {
						$(this).find("b").css({
							width: ($(this).width() - 10) + "px",
							"display": "block"
						})
					}
				} else if (e.type == "mouseout") {
					if ($(this).hasClass("cur")) {
						$(this).find("b").hide();
					}
				}
			});
			$(".ctr-l").click(function() {
				$me.find('ul').append($me.find("li:first"));
				me.SetFirst($this);
				me.SetLi($this);
				$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
				$(this).find("b").hide();
			});
			$(".ctr-r").click(function() {
				$me.find('ul').prepend($me.find("li:last"));
				me.SetFirst($this);
				me.SetLi($this);
				$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
				$(this).find("b").hide();
			});
			this.SetLi.apply(this, [$this]);
		},
		SetLi: function($this) { //设置初始样式
			var len = 5,
				Alen = 3,
				WH = 585,
				HT = 435,
				$me = $this,
				me = this,
				$img = $me.find('img'),
				LF = 190;
			var allLen = $this.find("li").length;
			var Nums = allLen - 6;
			var $li = $me.find("li");
			for (var i = 0; i < Alen; i++) {
				$img.eq(i).css({
					width: Number(WH - 89 * i) + "px",
					height: Number(HT - 68 * i) + "px"
				});
				$li.eq(i).attr("style", "left:" + (190 - 60 * i) + "px;z-index:" + (999 - i) + ";top:" + (32 * i) + "px");
			};
			for (var i = Alen; i < len; i++) {
				$img.eq(i).css({
					width: Number(407 + 89 * (i - Alen)) + "px",
					height: Number(299 + 68 * (i - Alen)) + "px"
				});
				$li.eq(i).attr("style", "right:" + (80 + 60 * (i - Alen)) + "px;z-index:" + (0 + (i - Alen)) + ";top:" + (64 / (i - Alen + 1)) + "px")
			};
			for (var i = len; i < allLen; i++) {
				$li.eq(i).css('left', '-9999px');
			}
		},
		AutoScroll: function(data, $this) { //列队滚动
			var $me = $this,
				me = this;
			$me.hover(function() {
				clearInterval(data.Time);
			}, function() {
				data.Time = setInterval(function() {
					$me.find("li:first").stop().animate({
						left: "300px",
						width: "400px",
						height: "400px",
						top: "30px",
						opacity: 0.2
					}, 'fast', function() {
						$me.find('ul').append($me.find("li:first"));
						me.SetFirst($this);
						me.SetLi($this);
						$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
						$(this).find("b").hide();
					})

				}, data.Inerval);
			}).trigger("mouseleave");
			this.ScrollCtr.apply(this, [$this]);
		}
	};
	$.fn.PicWall = function(data) { //实例化接口
		var $this = $(this);
		return new ImgScroll(data, $this);
	}
})