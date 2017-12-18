define(function(require, exports, module) {
	if($(".category").hasClass("cur")==true){

    	$(".category").mouseenter(function(){
    		$(this).find(".category-box").addClass("cur");
    	}).mouseleave(function(){
    		$(this).find(".category-box").removeClass("cur");
    	});
		}
		else{
			$(".category").mouseenter(function(){
				return;
			})
		}
	$(".category-list").delegate('li','mouseenter',function(){
			$(this).addClass("hover");
			//控制slider伸出方向
			var HT=$(window).height()/2,TP=$(this).offset().top>$(window).height()/2?$(this).offset().top-136-$(this).find(".category-sub").outerHeight():$(this).offset().top-172
			$(this).find(".category-sub").removeClass("g-dn").css("top",TP+"px");

	}).delegate('li','mouseleave',function(){
		$(this).removeClass("hover");
		$(this).find(".category-sub").addClass("g-dn");
	});
})