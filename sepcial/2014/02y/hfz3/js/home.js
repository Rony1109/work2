var zhname="";
$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
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

	$(".arpall li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});
	$(".m-img,.m-pr05").live("mouseenter",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").css("display","block");
	}).live("mouseleave",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").removeAttr("style"); 
	});

	$(".bgf").hover(function(){$(this).find(".thid").css("visibility","visible")},function(){$(this).find(".thid").css("visibility","hidden")});
	$(".pro-c li").hover(function(){$(this).find(".thid2").css("visibility","visible")},function(){$(this).find(".thid2").css("visibility","hidden")});
	$(".arpall ul li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});

	
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
 function addFavourite(url,title){
	function findKeys(){
		var isMSIE=/*@cc_on!@*/false;
		var ua=navigator.userAgent.toLowerCase(),isMac=(ua.indexOf("mac")!=-1),isWebkit=(ua.indexOf("webkit")!=-1),str=(isMac?"Command/Cmd":"CTRL");
		if(window.opera&&(!opera.version||(opera.version()<9))){str+=" + T"}
		else{
			if(ua.indexOf("konqueror")!=-1){str+=" + B"}
			else{if(window.opera||window.home||isWebkit||isMSIE||isMac){str+=" + D"}else{str+=" + D"}}
		}
		return str
	}
	try{
		if(document.all){window.external.addFavorite(url,title)}
		else{
			if(window.sidebar){window.sidebar.addPanel(title,url,"")}
			else{alert("浏览器不支持自动添加收藏夹。关闭本对话框后，请您手动使用组合快捷键'"+findKeys()+"'进行添加。")}
		}
	}catch(e){
		alert("浏览器不支持自动添加收藏夹。关闭本对话框后，请您手动使用组合快捷键'"+findKeys()+"'进行添加。")
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


function layer(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
		  '<tr><th><em>*</em>企业名称:</th><td><input name="cp" type="text" /><span>如无企业则填个人采购</span></td></tr>'+
		  '<tr><th><em>*</em>所属行业:</th><td><input name="hy" type="text" /><span>请输入所属行业</span></td></tr>'+
		  '<tr><th><em>*</em>样品名称:</th><td><input name="na" type="text" /><span>请输入样品名称</span></td></tr>'+
		  '<tr><th><em>*</em>月采购量:</th><td><input name="nu" type="text" /><span>请输入月采购量</span></td></tr>'+
		  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
		  '<tr><th><em>*</em>QQ:</th><td><input name="qq" type="text" /><span>请输入QQ</span></td></tr></table></div>',
		ok: function() {
			var cp=$("input[name='cp']").val(),
				hy=$("input[name=hy]").val(),
				na=$("input[name=na]").val(),
				nu=$("input[name=nu]").val(),
				tel=$("input[name=tel]").val(),
				qq=$("input[name=qq]").val();
				$(".tablewidth td span").removeAttr("style");
				if(cp==""||hy==""||nu==""||qq==""||tel==""||na==""){
					if(cp==""){$("input[name='cp']").siblings("span").css("display","inline-block")}
					if(hy==""){$("input[name='hy']").siblings("span").css("display","inline-block")}
					if(na==""){$("input[name='na']").siblings("span").css("display","inline-block")}
					if(nu==""){$("input[name='nu']").siblings("span").css("display","inline-block")}
					if(tel==""){$("input[name='tel']").siblings("span").css("display","inline-block")}
					if(qq==""){$("input[name='qq']").siblings("span").css("display","inline-block")}
					return false;
				}
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 39,"subtype": "ajax","dosubmit":"好货源第8期","info[zh]":zhname,"info[cp]":cp,"info[hy]":hy,"info[na]":na,"info[nu]":nu,"info[tel]":tel,"info[qq]":qq},function(data){
	
				if(data.status == true){
					alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
					$("input[name=cp]").val("");
					$("input[name=hy]").val("");
					$("input[name=na]").val("");
					$("input[name=nu]").val("");
					$("input[name=tel]").val("");
					$("input[name=qq]").val("");
				}else{
					alert("申请失败，请刷新后重试！");
				}
			},"jsonp");
		},cancel:false,
		fixed: true,
		id: 'Fm7',
		icon: 'question',
		okVal: '申请拿样'});
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