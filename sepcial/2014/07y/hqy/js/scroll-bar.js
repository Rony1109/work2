define(function(require, exports, module) {
	require('./jquery.mousewheel');

	function ScrollBar(parent) {
		this.step = 5; //滑动距离flag=false
		this.init.apply(this, arguments); //转换指针
		this.OffsetTop = $(".scroll-bar").length==0?0:$(".scroll-bar").offset().top;
	}
	ScrollBar.prototype = {
		init: function() {
			var me = this;
			me.setScrollBtn(arguments[0]);
			me.setCtr(arguments[0]);
			me.mousewheel(arguments[0]);
		},
		setScrollBtn: function(parent) {
			var me = this;
			me.scrollBtnH = [];
			parent.each(function(i) {
				me.scrollBoxHeight = parent.eq(i).height(); //盒子高度
				var HT = $(".scroll-bar").height();
				me.scrollBtn = HT - ((me.scrollBoxHeight - HT) / me.step);
				var num = me.scrollBtn < 0 ? 20 : me.scrollBtn
				me.scrollBtnH[i] = num;
				$(".scroll-bar span").eq(i).css('height', num + "px");
			});
		},
		setCtr: function() {
			var me = this;
			var flag = false;
			var mt = 0;
			var index;
			var oDiv;
			$(".scroll-bar").on('mousedown', 'span', function(evt) {
				index = $(".scroll-bar span").index(this);
				oDiv = $(this).parent().siblings('div');
				flag = true
				$("body").attr('style', "-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;cursor:move");
				document.body.onselectstart = document.body.ondrag = function() {
					return false;
				}
			});
			$('body').on('mouseup mousemove', function(evt) {
				if (evt.type == "mouseup") {
					flag = false;
					$("body").removeAttr('style');
					document.body.onselectstart = document.body.ondrag = function() {
						return true;
					}
				} else if (evt.type == "mousemove") {
					if (flag == true) {
						var Y = evt.pageY ? evt.pageY - me.OffsetTop : evt.clientY - me.OffsetTop;
						var TP = Y > $(".scroll-bar").height() - me.scrollBtnH[index] ? $(".scroll-bar").height() - me.scrollBtnH[index] : (Y <= 0 ? 0 : Y);
						$(".scroll-bar:eq(" + index + ") span").css({
							'top': TP + "px"
						});
						//设置盒子滑动距离
						var scrTop;
						if (me.scrollBtnH[index] == 20) {
							scrTop = -TP * ((oDiv.height() - oDiv.parent().outerHeight() + 65) / ($(".scroll-bar").height() - 20));
						} else {
							scrTop = -TP * me.step
						}
						me.scrollContent(oDiv, index, scrTop)
					}
				}
			});
		},
		scrollContent: function($dom, index, num) {
			var me = this
			if (num == 0) {
				$dom.removeAttr('style');
			} else {
				$dom.css('top', num + 'px');
			}
		},
		mousewheel: function(parent) {
			var me = this;
			var index = 0
			var TP = 0,
				step = 65
			parent.on('mouseover mousewheel', function(event, delta) {
				var $me = $(this);
				index = parent.index(this);
				if (event.type == "mousewheel") {
					var HT = $me.height();
					var StepEnd = HT - 65 - $me.parent().height();
					var scrollBtnHeight = $('.scroll-bar').eq(index).children('span').height();
					var TpEnd = $(".scroll-bar").height() - scrollBtnHeight;
					console.log(step / TpEnd)
					if (delta > 0) {
						step -= 65;
						TP -= scrollBtnHeight == 20 ? step / TpEnd : step / 5;
						if (step <= 65) {
							step = -65;
							TP=0;
						}
						me.scrollContent($me, index, -step);
						$(".scroll-bar:eq(" + index + ") span").css({
							'top': TP + "px"
						});
						console.log(TP)
					} else {
						step += 65;
						TP += scrollBtnHeight == 20 ? step / TpEnd : step / 5;
						if (TP >= TpEnd) {
							TP = TpEnd;
						}
						if (step >= StepEnd) {
							step = StepEnd
						}
						me.scrollContent($me, index, -step);
						$(".scroll-bar:eq(" + index + ") span").css({
							'top': TP + "px"
						});

					}
					return false
				} else if (event.type == "mouseover") {
					var num = Number(parent.eq(index).css('top').replace(/[a-z]/g, ''));
					step = num > 0 ? num : -num;
					TP = Number($('.scroll-bar').eq(index).children('span').css('top').replace(/[a-z]/g, ''))
				}
			});
		}
	}
	$.fn.ScrollBar = function() {
		var $this = $(this);
		return new ScrollBar($this);
	}
})