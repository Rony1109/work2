$(function (){
	seajs.use(csc.url("res","/f=js/m/focusPlay"),function (){
		csc.foucsPlay("#src-img",null,3000);
		var $li = $("#src-img ol>li");
		$("#adv-upload").find("li").on("mouseover",function (){
			$li.eq($(this).index()).trigger("mouseover");
		}).on("mouseout",function (){
			$li.eq($(this).index()).trigger("mouseout");
		});
	});
});