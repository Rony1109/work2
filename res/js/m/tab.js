//tabÇÐ»»Ð§¹û
csc.tab = function (hid, bid, howdo, fun, css){
	//console.log(bid.length);
	var $hd = $(hid), $bd = $(bid), fun = fun || function() {
	}, css = css || "cur", arCss = function(id) {
		id.addClass(css).siblings("." + css).removeClass(css);
	};
	$hd.bind(howdo == "click" ? "click" : "mouseover", function() {
		arCss($(this));
		if (bid)
			arCss($bd.eq($(this).index()));
		fun($(this));
		if (howdo == "click")
			return false;
	});
	return this;
};