$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<505){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}
	},"jsonp");
	
	
	//左移动
	$(".t-til .g-f-r .l").click(function(){
		left_right(".ly-c","1");
	});
	//右移动
	$(".t-til .g-f-r .r").click(function(){
		left_right(".ly-c","2");
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

//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find(".ly-po"),
		$w=$ul.find("ul:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("ul:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("ul:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}


//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

