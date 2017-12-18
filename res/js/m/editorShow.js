csc.editorShow = function (id,width){
	var self = this,
		id = id || ".un-reset",
		$id = $(id),
		width = width || $id.width();
	$id.find("table").each(function (){
		$(this).width() < width || $(this).width(width);
	});
	self.ie6 && seajs.use(self.url("res","/f=js/m/imgMax"),function(){
		$id.find("img").each(function (){
			self.imgMax(this,width);
			$(this).fadeIn("fast");
		});
	});
	return this;
};

csc.editorImg = function (id){
	var
		id = id || ".un-reset",
		$id = $(id);
	$id.find("img").each(function (){
		$(this).wrap('<a href="'+$(this).attr("src")+'" target="_blank"/>');
	});
	return this;
};