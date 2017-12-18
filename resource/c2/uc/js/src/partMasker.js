define(function(require, exports, module) {
	/**
	 * @param object scope 高亮范围，可以是一个dom元素，可以是一个坐标值
	 * @param object area 局部的范围
	 */
	function PartMasker (scope, area) {
		area = area || {
			l: 0,
			t: 0,
			r: $(document).width(),
			b: $(document).height()
		};
		var t_scope = null;
		// scope如果是dom元素,取元素的坐标
		if (scope && scope.length) {
			t_scope = {
				l: scope.offset().left,
				t: scope.offset().top,
				w: scope.outerWidth(),
				h: scope.outerHeight()
			}
		} else {
			t_scope = scope || {
				l: 0,
				t: 0,
				w: 0,
				h: 0
			}
		}
		// 创建4个div
		var d = $('<div>');
		d.css({
			position: 'absolute',
			opacity: 0.7,
			filter: 'alpha(opacity=0.7)',
			background: '#000',
			zIndex: 100
		});
		var d1 = d.clone(true),
			d2 = d.clone(true),
			d3 = d.clone(true),
			d4 = d.clone(true);
		d1.css({
			left: area.l,
			top: area.t,
			width: t_scope.l + t_scope.w,
			height: t_scope.t - area.t
		});
		d2.css({
			left: t_scope.l + t_scope.w,
			top: area.t,
			width: area.r - (t_scope.l + t_scope.w),
			height: t_scope.t + t_scope.h - area.t
		});
		d3.css({
			left: t_scope.l,
			top: t_scope.t + t_scope.h,
			width: area.r - t_scope.l,
			height: area.b - t_scope.t - t_scope.h
		});
		d4.css({
			left: area.l,
			top: t_scope.t,
			width: t_scope.l - area.l,
			height: area.b - t_scope.t
		});
		var wrap = $('<div>');

		wrap.append(d1);
		wrap.append(d2);
		wrap.append(d3);
		wrap.append(d4);
		$(document.body).append(wrap);

		this.dom = wrap;
	}
	PartMasker.prototype = {
		remove: function () {
			this.dom.remove();
		},
		show: function () {
			this.dom.show();
		},
		hide: function () {
			this.dom.hide();
		}
	}
	module.exports = PartMasker;
});