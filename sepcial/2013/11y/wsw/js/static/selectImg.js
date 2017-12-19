function selectImg(img,imglist,txtlist,evt){
	var imgli	= $(imglist).children(),
		rel		= imgli.find("img").attr("rel"),
		_link	= imgli.attr("link"),
		evt = evt || "click";
	$(img).find("a").attr("href",_link);
	$(img).find("img").attr("src",rel);
	imgli.each(function(i) {
        var _this = $(this) ;
		_this.bind(evt,function(){
			var alt = _this.find("img").attr("alt");
			rel = _this.find("img").attr("rel");
			_link = _this.attr("link");
			$(img).find("img").attr("src",rel);
			$(img).find("a").attr("href",_link);
			$(txtlist).children().html(alt);
			$(txtlist).children().attr("href",_link);
		})
    });
}