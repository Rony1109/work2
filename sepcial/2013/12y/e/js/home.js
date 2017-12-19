$(function(){

	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<405){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-sign-info .bd").html('<a id="J_signEd" rel="nofollow" target="_blank" data-memberid="'+data.data.memberId+'"  rel="nofollow" href="http://member.csc86.com/">'+data.data.userName+'</a>！消息<a rel="nofollow" target="_blank" href="http://member.csc86.com/membercenter/messageall/" class="top-msg-num">0</a><span class="v-line"></span><a rel="nofollow" href="http://member.csc86.com/login/logout">退出</a>');
		}
	},"jsonp");

	$(".arpall li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});
	$(".img6 li div").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});

	$(".kx ul li").hover(function(){
		$(this).children("span").css("display","block");							  
	},function(){
			$(this).children("span").removeAttr("style");	
	});
	
	
	var $$data;
	$("#form1").on("submit",function(){
		if($.trim($(this).find("[name='replyContent']").val()) == ""){
			alert("评论内容不能为空!");
			return false;
		}else if($("#hidId").attr("value")>140){
			alert("评论文字最多140字!");
			return false;
		}else{
			$$data = $(this).serialize();		
			csc.useDialog(function(){
				seajs.use(csc.url("res","/f=js/m/sign"),function(){
					csc.checkSign("tjpl");
				});});
			return false;
		}
		
	})
	tjpl = function(){
		var tipicid = "f6ab9587-c49f-4be3-b911-22f9cba25024";
		var url="http://quan.csc86.com/doCircle?t=replyTopic&topicId="+tipicid;
		$.get(url,$$data,function(){},"jsonp");
		alert("评论成功!");
		location.href="http://quan.csc86.com/thread/detail/"+tipicid+".html";
	};

	$("#replyContent").keyup(function(){
		$val=$(this).val().length;
		if($val>140){
			var leng=$val-140;
			$(".wirt .btn em").html("已经超出了")
			$(".wirt .btn i").html(leng).css("color","#f30");
		}else{
			var leng=140-$val;
			$(".wirt .btn em").html("还能输入");
			$(".wirt .btn i").html(leng).css("color","#999");
		}	
		$("#hidId").attr("value",$val);
	});


});