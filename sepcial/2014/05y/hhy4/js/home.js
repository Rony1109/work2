$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-sign-info").find("span.bd").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");

	/*商品列表*/
	$(".pro_lst li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	
	/*右侧导航*/
	(function(){
		var _fixed=$(".fixed");
		var _topFlr1=$("#topic_flr1").offset().top;
		$(window).scroll(function(){
			var _top = $(this).scrollTop();
			if(_top<=_topFlr1){
				_fixed.removeClass("fixed_scr");
			}else{
				_fixed.addClass("fixed_scr");
			}
		});	
	})();
});
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
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
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

// 意向订单
$(function(){
	$(".list li").find("a:eq(3)").click(function(){
		var $me=$(this);
		$.get("http://api.csc86.com/api/member/islogin",function(data){
			var products=$me.parent().siblings().find("p:eq(1)").html().split("<br>")[0];
			if(data.status==true){
				csc.useDialog(function(){
					art.Dialog({
						padding:'0',
						title:'',
						content:'<div class="tablewidth"><h1 class="lay-h1">红娘配单</h1><div class="g-h-30"></div>'+
				'<ul><li class="l">联系电话</li><li class="r"><input type="text" class="lay-input02" name="lxdh"/><span></span></li></ul>'+
				'<ul><li class="l">采购数量</li><li class="r"><input type="text" class="lay-input02" name="cgsl"/></li></ul>'+
				'<ul><li class="l">产品名</li><li class="r"><input type="text" class="lay-input02" name="cgcpmc" value="'+products+'"/></li></ul>'+
				'<div class="g-h-10"></div></div>',
						fixed:true,
						lock:'false',
						ok: function(){
							$(".tablewidth span").removeClass("cur");
							var cy=$("input[name=lxdh]").val(),
							name=$("input[name=cgsl]").val(),
							tel=$("input[name=cgcpmc]").val();
							if(cy==''||name==''){
								if(cy==""){$("input[name=lxdh]").siblings("span").addClass("cur");}
								if(name==""){$("input[name=cgsl]").siblings("span").addClass("cur");}
								return false;
							}
							$.post("http://cncms.csc86.com/formguide/index.php",{"formid":51,"subtype": "ajax","dosubmit":"意向订单",
							
									 "info[lxdh]":cy,"info[cgsl]":name,"info[cgcpmc]":tel},
								function(data){
									if(data.status == true){
										alert("亲，您填写的信息提交成功！");
									}else{
										alert("信息提交失败！");
									}
								},"jsonp");	
						},
						okVal: '确认'
					});
				});
			}else{
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}
		},"jsonp");
	});
});

function Gproducts(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			csc.useDialog(function(){
				art.dialog({
					padding:'0',
					title:'',
					content:'<div class="tablewidth"><h1 class="lay-h1">发布求购信息</h1><div class="g-h-30"></div>'+
					'<ul><li class="l">发布标题</li><li class="r"><input type="text" class="lay-input02" name="bt"/></li></ul>'+
					'<ul><li class="l">产品名称</li><li class="r"><input type="text" class="lay-input02" name="cpmc"/></li></ul>'+
					'<ul><li class="l">商家名称</li><li class="r"><input type="text" class="lay-input02" name="sjmc"/><span></span></li></ul>'+
					'<ul><li class="l">产品数量</li><li class="r"><input type="text" class="lay-input02" name="cpsl"/><span></span></li></ul>'+
					'<ul><li class="l">单价范围</li><li class="r"><input type="text" class="lay-input02" name="djfw"/><span></span></li></ul>'+
					'<ul><li class="l">详细说明</li><li class="r"><input type="text" class="lay-input02" name="xxsm"/></li></ul><div class="g-h-10"></div></div>',
					fixed:true,
					lock:'false',
					ok: function(){
						$(".tablewidth span").removeClass("cur");
						var bt=$("input[name=bt]").val(),
						cpmc=$("input[name=cpmc]").val(),
						sjmc=$("input[name=sjmc]").val(),
						cpsl=$("input[name=cpsl]").val(),
						djfw=$("input[name=djfw]").val(),
						xxsm=$("input[name=xxsm]").val();
						if(sjmc==''||cpsl==''||djfw==''){
							if(sjmc==""){$("input[name=cpsl]").siblings("span").addClass("cur");}
							if(cpsl==""){$("input[name=cpsl]").siblings("span").addClass("cur");}
							if(djfw==""){$("input[name=djfw]").siblings("span").addClass("cur");}
							return false;
						}
						$.post("http://cncms.csc86.com/formguide/index.php",{"formid":52,"subtype": "ajax","dosubmit":"订单见面会",
						
								 "info[bt]":bt,"info[cpmc]":cpmc,"info[sjmc]":sjmc,"info[cpsl]":cpsl,"info[djfw]":djfw,"info[xxsm]":xxsm},
							function(data){
								if(data.status == true){
									alert("亲，您填写的信息提交成功！");
								}else{
									alert("信息提交失败！");
								}
							},"jsonp");	
					},
					okVal: '确认'
				});
			});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}
