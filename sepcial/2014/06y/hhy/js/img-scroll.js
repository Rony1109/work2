define(function(require, exports, module) {
	function ImgScroll() {
		this.init.apply(this, arguments);
	};
	ImgScroll.prototype = {
		init: function(data, $this) { //构造器
			this.data = data
			var me=this;
			if (this.data.Auto === true) {
				this.AutoScroll.apply(this, arguments);
			} else if (this.data.Auto === false) {
				me.SetFirst($this);
				me.SetLi($this);
				$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
				me.ScrollCtr.apply(this, [$this]);
			}

		},
		SetFirst: function(dom) { //第一个LI元素中插入span
			var $me = dom;
			var $li = $me.find("li:first");
			$(".cur").find("img").css({
				width: "540px",
				height: "200px"
			});
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
						$(this).find("a").css({
							"display": "block"
						});
					}
				} else if (e.type == "mouseout") {
					if ($(this).hasClass("cur")) {
						$(this).find("a").css({
							"display": "none"
						})
					}
				}
			});
			$(".scrll-r").click(function() {
				$me.find("li:first").stop().animate({
						left: "800px",
						width: "400px",
						height: "100",
						top: "30px",
						opacity: 0.2
					}, 'fast', function() {
						$me.find('ul').append($me.find("li:first"));
						me.SetFirst($this);
						me.SetLi($this);
						$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
					})
				$(this).find("a").hide();
			});
			$(".scrll-l").click(function() {
				$me.find("li:first").stop().animate({
						left: "-400px",
						width: "400px",
						height: "100",
						top: "30px",
						opacity: 0.2
					}, 'fast', function() {
						$me.find('ul').prepend($me.find("li:last"));
						me.SetFirst($this);
						me.SetLi($this);
						$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
					})
				$(this).find("a").hide();
			});
			this.SetLi.apply(this, [$this]);
		},
		SetLi: function($this) { //设置初始样式
			var len = $this.find("li").length,
				Alen = Math.round(len / 2)
			WH = this.data.MaxWidth,
			HT = this.data.MaxHeight,
			MinWH = this.data.MinWidth,
			MinHT = this.data.MinHeight,
			$me = $this,
			me = this,
			$img = $me.find('img');
			//根据实际情况计算位置;
			for (var i = 0; i < Alen; i++) {
				$img.eq(i).css({
					width: Number(WH - this.data.Zoom.x * i) + "px",
					height: Number(HT - this.data.Zoom.y * i) + "px"
				});
				$me.find("li").eq(i).attr("style", "left:" + (230 - 100 * i) + "px;z-index:" + (999 - i) + ";top:" + (20 * i) + "px");
			};
			for (var i = Alen; i < len; i++) {
				$img.eq(i).css({
					width: Number(MinWH + this.data.Zoom.x * (i - Alen)) + "px",
					height: Number(MinHT + this.data.Zoom.y * (i - Alen)) + "px"
				});
				$me.find("li").eq(i).attr("style", "right:" + (37 + 70 * (i - Alen)) + "px;z-index:" + (0 + (i - Alen)) + ";top:" + (40 / (i - Alen + 1)) + "px")
			};
		},
		AutoScroll: function(data, $this) { //列队滚动
			var $me = $this,
				me = this;
			$me.hover(function() {
				clearInterval(data.Time);
			}, function() {
				data.Time = setInterval(function() {
					$me.find("li:first").stop().animate({
						left: "800px",
						width: "400px",
						height: "100",
						top: "30px",
						opacity: 0.2
					}, 'fast', function() {
						$me.find('ul').append($me.find("li:first"));
						me.SetFirst($this);
						me.SetLi($this);
						$me.find("li:first").addClass("cur").siblings("li").removeClass("cur");
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