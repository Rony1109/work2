$(function(){
	
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");
	
	//轮播
	var ss=false;
	var rTim;
	$('.bn-list').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 $t2=$(this);
			 if(!ss){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo();
				} ,2000);
			}
	 }).trigger("mouseleave");
	
	var tieftwo=function(){
		var self=$(".bn-list"),lih =$(".bn-list a.cur").index(),ind=$("#lbtwoone li").length;
		if(lih==ind-1){
			ss=false;
			$(".bn-list a").removeClass("cur").first().addClass("cur");
			$("#lbtwoone li").removeClass("cur").first().addClass("cur");
		}else{
			ss=false;
			self.children("a.cur").removeClass("cur").next().addClass("cur");
			$("#lbtwoone li.cur").removeClass("cur").next().addClass("cur");
		}
	}
	
	$('.bn-list a').hover(function(){
		clearInterval(rTim);
		ss=false;
		var ind=$(this).index();
		$('.bn-list a').removeClass("cur");
		$(this).addClass("cur");
		$("#lbtwoone li").removeClass("cur");
		$("#lbtwoone li:eq("+ind+")").addClass("cur");
	},function(){
		if(!ss){
			 ss=true;
			 rTim = setInterval(function(){
				tieftwo(); 
			} ,2000);
		}
	}).trigger("mouseleave");

	//报名
	$(".bn-r .btn").click(function(){
		$.get("http://api.csc86.com/api/member/islogin",function(data){
			if(data.status==true){
				var cy=$("input[name=cy]").val(),
					add=$("input[name=add]").val(),
					tel=$("input[name=tel]").val(),
					name=$("input[name=name]").val();
					if(cy==""||tel==""||$("input[name=yz]:checked").length==0){
						alert("公司名称、联系电话、参与意向（至少选一项）为必填项！");return;
					}
					var yz="";
					for(var i=0;i<$("input[name=yz]:checked").length;i++){
						yz+=$("input[name=yz]:checked").eq(i).val()+";";
					}
					//alert(cy+"--"+add+"--"+tel+"--"+name+"--"+yz);return;
				$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 30,"subtype": "ajax","dosubmit":"网商网货交易会.","info[cy]":cy,"info[add]":add,"info[tel]":tel,"info[name]":name,"info[yz]":yz},function(data){
					if(data.status == true){
						alert("恭喜您！报名信息填写成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
						$("input[name=cy]").val("");
						$("input[name=add]").val("");
						$("input[name=tel]").val("");
						$("input[name=name]").val("");
						$("input[name=yz]").removeAttr("checked");
					}else{
						alert("申请失败，请刷新后重试！");
					}
				},"jsonp");
			}else{
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}
		},"jsonp");					   
	});

	//放大
	$(".bgall03").hover(function(){
		$(".bgall03 .bg03").css("display","block");						 
	},function(){
		$(".bgall03 .bg03").css("display","none");
	});
	
});
//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

