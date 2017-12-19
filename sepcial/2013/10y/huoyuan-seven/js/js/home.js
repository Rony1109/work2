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

	$(".tab a").click(function(){
		var inde=$(this).index()+1;
		$(".link-lc a").removeClass("cur");
		$(".link-lc a:eq("+inde+")").addClass("cur");
	});

	$(".link-lc a").click(function(){
		$(".link-lc a").removeClass("cur");
		$(this).addClass("cur");
	});
	
	$("#btn_fabu").click(function(){
		$.get("http://api.csc86.com/api/member/islogin",function(data){
			if(data.status==true){
				artDialog({id: "memtool",
					content: $("#mem-toolct").html(),
					opacity:0.4,
					fixed: true,
					title: "发布采购信息",
					width: 500,
					padding: "5px 19px 25px 15px",
					lock:true
				});	
			}else{
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}
		},"jsonp");
	});
	
	/*$("#mbg").mousemove(function(e){
		var pointX = e.pageX;
		var pointY = e.pageY;
		alert(pointX+"---"+pointY);
		if(pointY<450&&pointX<700){
			$(this).animate({left:-170,top:60},300);
		}else if(pointY>450&&pointX<700){
			$(this).animate({left:-170,top:90},300);
		}else if(pointY<450&&pointX>700){
			$(this).animate({left:-130,top:60},300);
		}else if(pointY>450&&pointX>700){
			$(this).animate({left:-130,top:90},300);
		}
	});*/
	
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