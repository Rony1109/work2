/**
 * APP 关于我们（单页面）
 * 2014.05.29 by lg
 */

$(function(){

	var tabli = $("#cont").children() ,
		fcs = $("#focus"),
		$tab = $("#tab"),
		$section = $tab.parent('.menu'),
		wli = $tab.width()-8,
		hli = $tab.children().height(),
		initp = hli / 2 - 7 ,p = initp;
	fcs.css('transform','translate3d('+wli+'px, '+initp+'px, 0px)');	
	$(window).resize(function(){
		wli = $tab.width()-8;
		fcs.css('transform','translate3d('+wli+'px, '+initp+'px, 0px)');
	});
	$tab.delegate("li","click",function() {
		var $this = $(this), h = $this.height() , n = $this.index();
		p = h * n + h / 2 - 7 - $section.scrollTop();
		$(this).addClass("cur").siblings().removeClass("cur");
		tabli.eq($(this).index()).show().siblings().hide();
		fcs.css('transform','translate3d('+wli+'px, '+p+'px, 0px)');
	});	
	$section.scroll(function(){
		var sh = p - $(this).scrollTop();
		fcs.css('transform','translate3d('+wli+'px, '+ sh +'px, 0px)');
	})

})
