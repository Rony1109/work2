/* 纺织名企业专题 2013.12.06 by lg */

function tabHover(li,div,css,e){
	var e = e || "mouseover"
	$(li).children().each(function(i) {
		var _this = $(this);
		_this.bind(e,function(){
			$(div).children().hide();
			$(div).children().eq(i).show();
			$(li).children().removeClass(css);
			_this.addClass(css);
		});
	});
};
$(function(){
	tabHover(".tablist",".tabcont","hover")
})