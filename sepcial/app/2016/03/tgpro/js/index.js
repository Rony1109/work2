Zepto(function(){
	$(".jsSpicLst").on("tap","li",function(){
		var $this=$(this),
			$jsBpic=$this.parent().siblings(".jsBpic"),
			bsrc=$this.find("img").data("bsrc"),
			href=$this.data("href");
		$jsBpic.find("a").attr("href",href);
		$jsBpic.find("img").attr("src",bsrc);
	});
});