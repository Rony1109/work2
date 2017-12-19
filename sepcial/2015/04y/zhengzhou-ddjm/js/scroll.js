define(function(require, exports, module) {
	function cscScroll(parent, data) {
		var me = this;
		me.constractor.apply(this,arguments);
	}
	cscScroll.prototype = {
		constractor: function(parent, data) {
			var me = this;
			if (parent.find("ul").find("li").length > data.Visual) {
				parent.find("ul").css("margin-left", -(data.Left / 2) + "px").prepend(parent.find("ul").find("li:last")).append(parent.find("ul").clone().find("li"));
				if (data.Auto == true) {
					parent.hover(function() {
						clearInterval(data.linedUp);
					}, function() {


						data.linedUp = setInterval(function() {
							me.ScrollLeft(parent.find("ul"), data)
						}, data.Time);

					}).trigger("mouseleave");

				}
				me.ScrollCtr(parent, parent.find("ul"), data)
			}

		},
		ScrollLeft: function(dom, data) {
			$(dom).animate({
				marginLeft: -data.Left + "px"
			}, 500, function() {
				$(dom).append($(dom).find("li:first"));
				$(dom).css("margin-left", (-data.Left / 2) + "px");
			});
		},
		ScrollRight: function(dom, data) {
			$(dom).animate({
				marginLeft: 0
			}, 500, function() {
				$(dom).prepend($(dom).find("li:first"));
				$(dom).css("margin-left", -data.Right + "px");
			});
		},
		ScrollCtr: function(parent, dom, data) {
			var me = this
			parent.find("span.ctr-l").click(function() {
				me.ScrollLeft(dom, data);
			});
			parent.find("span.ctr-r").click(function() {
				me.ScrollRight(dom, data);
			});
		}
	}
	$.fn.CscScroll=function(data) {
		var $this = $(this)
		return new cscScroll($this, data);
	};

})