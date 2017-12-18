csc.ie8 = (function(){
	return $.browser.msie&&$.browser.version==8.0;
})();
$(function(){
	csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){
		csc.hover("#m-back>li");
	});
	$("#adv-upload li em").on("click",function(){
		var $t=$(this);
			imgid=$t.attr("id"),
			id=$t.parents("div").attr("id"),
			id=parseInt(/\d/.exec(id));
		$.post("/shop/decoration",{"imgNumber":id,"status":"del"},function(data){
			if(data.status){
				$t.parent("span").hide().prev().show().parent().prev(".ibox").find("img").attr("src",csc.url("res","/image/c/shopmember/bann-bg.jpg")).attr({"width":175,"height":80});
				$("#srcimg"+id).attr("src",csc.url("res","/image/c/shopmember/bann-bg.jpg")).attr({"width":175,"height":80});;
				csc.success(data.msg);
			}else{
				csc.alert(data.msg);
			}
		},"jsonp");
	});
	$("#m-back li a.prev").on("click",function(){
		var img = $(this).parent().prev().find("img");
		if(img){
			var img =img.clone();
			img.attr({"width":500,"height":500})
		}
		artDialog({
			id:"prev",
			content:img[0],
			fixed: true,
			title:"预览",
			lock:true
		});
	});	
});
