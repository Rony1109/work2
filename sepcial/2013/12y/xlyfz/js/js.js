// 信力盈专题页面
function hoverImg(t,b){
	var $t = $(t) ,
		$b = $(b) ,
		$f = $t.children().first() ,
		_link = $f.find("a").attr("link") ,
		_txt = $f.find("img").attr("alt") ,
		_src = $f.find("img").attr("bigimg");
	$b.find("a").attr("href",_link);
	$b.find("img").attr("src",_src);
	$b.find("span").html(_txt);
	$t.children("li").hover(function(){
		var $this = $(this) ; _link = $(this).find("a").attr("link") , _txt = $(this).find("img").attr("alt") , _src = $(this).find("img").attr("bigimg");
		$b.find("a").attr("href",_link);
		$b.find("img").attr("src",_src);
		$b.find("span").html(_txt);
	});
};
$(function(){hoverImg("#ful","#fimg");})