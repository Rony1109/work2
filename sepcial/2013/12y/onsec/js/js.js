$(function(){
	$("#out_view").append('<span class="l"></span><span class="r"></span>');
	
	var barandtime,$obj= $("#src_view"),ln=$obj.find("ul").children("li").length;	
    $("#out_view").delegate("span.l","click",function(){
       scrollRight($obj);
    }).delegate("span.r","click",function() {
       scrollLeft($obj);
     });
	 
	 //点击向左
		function scrollLeft(obj){
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0}).find("li:first").appendTo($self);
			})
		}
	}
	
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	$('#out_view').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$("#src_view");
			textTimer = setInterval(function(){
				 scrollLeft($t);
			} ,2000);
	 }).trigger("mouseleave");
	
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		if(topscr<105){
			$(".fiexd").removeClass("fiexd_nav");	
		}else{
			$(".fiexd").addClass("fiexd_nav");	
		}
	});		 
	 
})




var zhname="";
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


function layer(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">我要报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
		  '<tr><th><em>*</em>企业名称:</th><td><input name="company" type="text" /><span>请输入企业名称</span></td></tr>'+
		  '<tr><th><em>*</em>主营产品:</th><td><input name="hy" type="text" /><span>请输入主营产品</span></td></tr>'+
		  '<tr><th><em>*</em>联 系 人:</th><td><input name="na" type="text" /><span>请输入联系信息</span></td></tr>'+
		  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
		  '<tr><th><em>*</em>QQ:</th><td><input name="qq" type="text" /><span>请输入QQ</span></td></tr></table></div>',
		ok: function() {
			var cp=$("input[name='company']").val(),
				hy=$("input[name=hy]").val(),
				na=$("input[name=na]").val(),
				
				tel=$("input[name=tel]").val(),
				qq=$("input[name=qq]").val();
				$(".tablewidth td span").removeAttr("style");
				if(cp==""||hy==""||qq==""||tel==""||na==""){
					if(cp==""){$("input[name='company']").siblings("span").css("display","inline-block")}
					if(hy==""){$("input[name='hy']").siblings("span").css("display","inline-block")}
					if(na==""){$("input[name='na']").siblings("span").css("display","inline-block")}
					if(tel==""){$("input[name='tel']").siblings("span").css("display","inline-block")}
					if(qq==""){$("input[name='qq']").siblings("span").css("display","inline-block")}
					return false;
				}
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 44,"subtype": "ajax","dosubmit":"马到攻城","info[com]":cp,"info[hy]":hy,"info[na]":na,"info[tel]":tel,"info[qq]":qq},function(data){
	
				if(data.status == true){
					alert("恭喜您！报名成功！");
					$("input[name=company]").val("");
					$("input[name=hy]").val("");
					$("input[name=na]").val("");
					$("input[name=tel]").val("");
					$("input[name=qq]").val("");
				}else{
					alert("报名失败，请刷新后重试！");
				}
			},"jsonp");
		},cancel:false,
		fixed: true,
		id: 'Fm7',
		icon: 'question',
		okVal: '提交报名'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

function closet(){
	art.dialog({id:'Fm7'}).close();	
}