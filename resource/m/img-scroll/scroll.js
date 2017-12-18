define(function(require, exports, module) {
	function CscScroll(parent, data) {
		var me = this;
		me.Constractor.apply(this, arguments);
	}
	CscScroll.prototype = {
		Constractor: function(parent, data) {
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
			$(dom).stop(true).animate({
				marginLeft: -data.Left + "px"
			}, 500, function() {
				$(dom).append($(dom).find("li:first"));
				$(dom).css("margin-left", (-data.Left / 2) + "px");
			});
		},
		ScrollRight: function(dom, data) {
			$(dom).stop(true).animate({
				marginLeft: 0
			}, 500, function() {
				$(dom).prepend($(dom).find("li:last"));
				$(dom).css("margin-left", -data.Right + "px");
			});
		},
		ScrollCtr: function(parent, dom, data) {
			var me = this
			parent.find(".ctr-l").on('click', function() {
				me.ScrollLeft(dom, data);
			});
			parent.find(".ctr-r").on('click', function() {
				me.ScrollRight(dom, data);
			});
		}
	}
	$.fn.CscScroll = function(data) {
		var $this = $(this)
		return new CscScroll($this, data);
	};

})