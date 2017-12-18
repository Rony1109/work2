/*
* 将默认的回到顶部的图标放入页面中.
* explain: seajs引入此JS文件即可; 注: csc.backTop 值为 undefined;
*/
csc.backTop = (function (w,d){
	var	$backTop = $("#backTop");
	$backTop.length || $("body").append('<style>.back-top{width:100%;_position:relative}.back-top a{display:block;width:48px;height:48px;background:#ccc url('+csc.url("res")+'/css/m/back-top/img/bg.png) no-repeat;text-indent:-99999px;}.back-top a:hover{background-position:0 -49px;}.back-top .bt-bd{_display:inline;_float:right;width:48px;height:48px;position:fixed;_position:absolute;bottom:30px;right:20px;}.back-top .bt-hide{display:none}</style><div class="g-o-a back-top" id="backTop"><div class="bt-bd"><a href="#">返回顶部</a></div></div>');		
	var	$backTop = $('#backTop'),
	E=d.documentElement,
	$btBd = $backTop.children("div.bt-bd");
	function rePosition(){
		$backTop.css("margin-top",E.clientHeight-$backTop.position().top+E.scrollTop);
		$btBd.css("right",E.clientWidth<1040 ? 
			E.clientWidth < 1000 ? E.scrollWidth -E.clientWidth - E.scrollLeft : ( 1000 - E.clientWidth)/2
		: "20px") ;
	}
	$(w).bind("scroll",function (){
		csc.ie6 && rePosition();
		(E.scrollTop + d.body.scrollTop) > 10 ? $btBd.removeClass("bt-hide") : $btBd.addClass("bt-hide");
	}).trigger("scroll");
	$(w).bind("resize",function (){
		csc.ie6 && setTimeout(function (){
			$(w).trigger("scroll");
		},200);
	}).trigger("resize");
})(window,document);