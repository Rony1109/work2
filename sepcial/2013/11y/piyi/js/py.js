/*2012.11.25 by lg*/

function hoverHeight(id,e,t){
	var id = id , e = e || "hover" , t = t || 100;
	$(id).find("li").each(function(i){
        var _this = this ,
			divh = $(this).height() ,
			imgh = $(this).find("img").height();
		$(this).hover(function(){
			$(_this).children("div").stop();
			$(this).siblings().children("div").animate({height:divh},t);
			$(_this).children("div").animate({height:imgh},t*2);
		});
    });
}
$(function(){hoverHeight("#list01");hoverHeight("#list02");hoverHeight("#list03");hoverHeight("#list04");hoverHeight("#list05");})