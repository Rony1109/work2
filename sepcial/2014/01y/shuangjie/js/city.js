//赞
$("div.like[data-topic]").each(function(index, element){
	var o = $(this),id=o.attr("data-topic") || "000";
	$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":id},function(data){
		o.html('<div class="txt"><span class="g-d-ib"></span>赞<br />'+data.code+'</div><div class="arr"></div><div class="arr-bg"></div>');
	},"jsonp");
	o.on("click",function(){
		$.get(csc.url("quan","/likeB.html?topicId="+id),function(data){
			if("sns_likeTopic_000"==data.code){
				o.html('<div class="txt"><span class="g-d-ib"></span>赞<br />'+data.desc+'</div><div class="arr"></div><div class="arr-bg"></div>');
			}else if("login_fail"==data.code){
				seajs.use(csc.url("res","/f=js/m/sign"),function(){
					csc.checkSign("location.reload()");
				});
			}else if("sns_likeTopic_001"==data.code){
				csc.useDialog(function(){csc.alert("赞过了！");});
			}else{
				csc.useDialog(function(){csc.alert(data.desc);});
			}
			return false;
		},"jsonp");
	})
})