define(function(require, exports, module){
	exports.picHover = function(elem){
		$(elem).each(function(){
			var
                _this = $(this),
                tit=_this.find("img").attr("alt");
                _this.append('<span class="c-mask"></span><span class="c-info">' + tit + '</span> ');
			_this.on({
				mouseenter: function(){
					$(this).addClass('hover');
				},
				mouseleave: function(){
					$(this).removeClass('hover');
				}
			});
		});
	};
});
