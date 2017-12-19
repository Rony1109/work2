/**/
$(function(){
	//投票数据
	$(".main .pnu").each(function(index, element) {
		var o = $(this),id=o.attr("data-topicId") || "000";
		$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":id},function(data){
			if(o.parent().is("span")){
				o.text(data.code);
			}else{
				o.text(data.code+"票");
			}
		},"jsonp");
	});

	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<505){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});
	$(".link-lc a").click(function(){
		$(".link-lc a").removeAttr("class");
		$(this).addClass("cur");
	});
	$(".but2").hover(function(){
		$(this).addClass("but3");						  
	},function(){$(this).removeClass("but3");	});

	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");
		   
	var s=false;
	var rTi;
	$('.contwo').hover(function(){
			 clearInterval(rTi);
			 s=false;
		 },function(){
			 if(!s){
				 s=true;
				 rTi = setInterval(function(){
					tief();
				} ,2000);
			}
	 }).trigger("mouseleave");
	var tief=function(){
		var self=$(".contwo"),lih=$(".contwo ul.show").index();
		//alert(lih); return;
		if(lih==2){
			s=false;
			self.children("ul.show").removeClass("show").siblings("ul:eq(0)").addClass("show");
			$(".contwo .title-01 span").children("a.cur").removeClass("cur").siblings("a:eq(0)").addClass("cur");
		}else{
			s=false;
			self.children("ul.show").removeClass("show").next().addClass("show");
			$(".contwo .title-01 span").children("a.cur").removeClass("cur").next().addClass("cur");
		}
	}
	$('.contwo .title-01 span a').hover(function(){
		$('.contwo .dt04').removeClass("show");
		$('.contwo  .title-01 span a').removeClass("cur");	
		$(this).addClass("cur");
		$(".contwo .dt04:eq("+$(this).index()+")").addClass("show");
	});	 
	//上升达人榜
	$(".lb-l .r").click(function(){
		var leng=$(".ml-bock ul li.cur").nextAll().length;
		var left=$(".ml-bock ul").position().left;
		if(leng==4){return;}
		$(".ml-bock ul li.cur").removeClass("cur").next().addClass("cur");
		$(".ml-bock ul").animate({left:left-140},200);
	});
	$(".lb-l .l").click(function(){
		var leng=$(".ml-bock ul li.cur").prevAll().length;
		var left=$(".ml-bock ul").position().left;
		if(leng==0){return;}else{
			$(".ml-bock ul li.cur").removeClass("cur").prev().addClass("cur");
			$(".ml-bock ul").animate({left:left+140},200);
		}
	});
	
	//分页
	$(".page-r").click(function(){
		var leng=$(".all-tp ul.cur").nextAll().length;
		if(leng==0){return;}
		$(".all-tp ul.cur").removeClass("cur").next().addClass("cur");
		$(".md-page i.cur").removeClass("cur").next().addClass("cur");
	});
	$(".page-l").click(function(){
		var leng=$(".all-tp ul.cur").prevAll().length;
		if(leng==0){return;}else{
			$(".all-tp ul.cur").removeClass("cur").prev().addClass("cur");
			$(".md-page i.cur").removeClass("cur").prev().addClass("cur");
		}
	});
	$(".md-page i").click(function(){
		$(".md-page i,.all-tp ul").removeClass("cur");
		var i=$(this).index();
		$(this).addClass("cur");
		$(".all-tp ul:eq("+(i-1)+")").addClass("cur");
	});

});

//排名
function tppost(){
	var allnu=[];
	for(var i=0;i<$(".all-tp li .pnu").length;i++){
		//allnu.push(parseInt($(".all-tp li .pnu:eq("+i+")").html())+":"+$(".all-tp li .ne:eq("+i+")").html());
		allnu.push(($(".all-tp li .pnu:eq("+i+")").html()).replace(/\D/,"")+":"+($(".all-tp li .ne:eq("+i+")").html()).replace(/\s/,''));
	}
	//allnu.sort(function(a,b){return a<b?1:-1});
	allnu.sort(function(a,b){return parseInt(a)>parseInt(b) ? -1:(parseInt(a)<parseInt(b) ? 1:0)});
	for(var i=0;i<9;i++){
		var allone=allnu[i].split(":");
		if(i<3){
			$(".lb-r ul").append('<li><em class="g-f-l top">'+(i+1)+'</em><span class="g-f-l">'+allone[1]+'</span><span class="g-f-r"><i>'+allone[0]+'</i>票</span></li>');
		}else{
			$(".lb-r ul").append('<li><em class="g-f-l">'+(i+1)+'</em><span class="g-f-l">'+allone[1]+'</span><span class="g-f-r"><i>'+allone[0]+'</i>票</span></li>');	
		}
	}
}

//喜欢
function topicPraise(tmp){
alert("亲，投票已结束哦！请关注创业大赛现场PK，评选最牛创业王！");
	/*var obj=$(tmp);
	var topicId=obj.attr("data-topicid");
	$.get(csc.url("quan","/likeB.html?topicId="+topicId),function(data){;
		if("sns_likeTopic_000"==data.code){
			$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":topicId},function(data){
				if(obj.is("a.like")){
					obj.siblings("div").find(".pnu").text(data.code);
				}else{
					obj.text(data.code+"票");
					obj.addClass("cur");
				}
			},"jsonp");
		}else if("login_fail"==data.code){
			login();
		}else if("sns_likeTopic_001"==data.code){
			if(obj.is(".pnu")){
				obj.addClass("cur");
			}
			alert("已喜欢过了");
		}else{
			csc.alert(data.desc);
		}
	},"jsonp");*/
}


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

var csc=csc||{};
//加入圈子
csc.addCircleCircleId = "";csc.addCircleObj = null;
csc.addCircleCommC = function(){
	$.get("http://quan.csc86.com/doCircle?t=authC&circleId="+csc.addCircleCircleId,function(data){
		var $val=data.code;
		if($val=="NO_POWER"){//无权加入
			csc.alert("你的身份不满足加入该圈子！")	
		}else if($val=="join_000"){//已加入
			csc.alert("已加入");
		}else if($val=="join_001"){//己审请
			csc.alert("您已经申请加入该圈子，请等待审核");
		}else if($val=="LOGIN_FAIL"){//未登陆
			login();
		}else if("no_auth"==$val){
			csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
		}else{//已登陆,未加入,未审请,有权审请
			csc.useDialog(function(){
				art.dialog({
				title:'申请加入商圈',
				content: data.code,
				fixed: true,
				okVal: '确定',
				background:"#000",
				opacity:"0.3",
				ok: function () {				
					//需要判断加入类型不能为空
					$.get("http://quan.csc86.com/doCircle?t=addC&circleId="+csc.addCircleCircleId+"&"+$("#addCircleForm").serialize(),function(data){
								var val=data.code;
								if("join_001"==val){
									csc.success("申请加入成功！");
								}else if("join_000"==val){
									csc.success("您已成功加入！");
								}else if("sns_fail_id"==val){
									csc.alert("ID无效！");
								}else{csc.alert("申请加入失败！,请重试");}		
							},"jsonp");																 
						
					},
					cancel: true,
					lock:true
				});	
			})
		}	
	},'jsonp')
}
//加入圈子按钮
csc.addCircleCncms=function(circleId,o){
	csc.addCircleCircleId = circleId;
	csc.addCircleObj = $(o);
	csc.useDialog(function(){
		csc.addCircleCommC();
	})
};
//搜索
function fontLeng(){
	$(".ser a").attr("href","javascript:;");
	var valt=$(".ser input").val().replace(/^\s*(.*?)\s*$/,'$1');
	for(var i=0;i<$(".all-tp li .ne").length;i++){
		var s=$(".all-tp li .ne:eq("+i+")");
		var spanv=s.html().replace(/^\s*(.*?)\s*$/,'$1');
		if(valt==spanv){
			$(".all-tp ul,.all-tp ul li,.md-page i").removeClass("cur");
			s.closest("li").addClass("cur").closest("ul").addClass("cur");
			$(".md-page i:eq("+(s.closest("ul").attr("data")-1)+")").addClass("cur");
			$(".ser a").attr("href","#"+s.closest("li").attr("id"));
			$(".ser input").attr("value","请输入选手姓名");
			return;
		}
	}
}

 







