define(function(require, exports, module) {
	require('./init');

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	}
	var index =getQueryString('type')!=null?getQueryString('type'):0;
		$("#j-tab li").mouseover(function() {
			var index = $("#j-tab li").index(this);
			$(this).addClass("cur").siblings('li').removeClass('cur');
			$(".server-list")
				.eq(index)
				.removeClass('g-dn')
				.siblings('.server-list')
				.addClass('g-dn');
		}).eq(index).trigger('mouseover')
})