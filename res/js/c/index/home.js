/*ie升级提示 by lg*/
var startcook;
function detectOS() {//系统检测
	var sUserAgent = navigator.userAgent,
		isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
	if (isWin) {
		var w = "Windows NT ",
			Win = sUserAgent.indexOf(w),
			str = sUserAgent.substr(Win,14),
			ie = str.replace(w,"");
		return ie;
	}
	return "other";
}
function ieUpdateTips(){//插入IE升级提示
	var ie8 = "<div class='ie-tips'><div class='ie8 g-o-a'><a class='tips-dload-btn' href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank'>立即下载</a><b class='tips-off'>关闭</b></div></div>",
		ie9 = "<div class='ie-tips'><div class='ie9 g-o-a'><a class='tips-dload-btn' href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank'>立即下载</a><b class='tips-off'>关闭</b></div></div>",
		OS = detectOS();
	if( OS < 6 && $.browser.msie && !( $.browser.version == "8.0" ) ){
		$("body").prepend(ie8);
	}else if( OS >= 6 && $.browser.msie && !( $.browser.version == "9.0" ) && !( $.browser.version == "10.0" ) ){
		$("body").prepend(ie9);
	}if($(".tips-off").size() > 0){
		$(".tips-off").bind("click",function(){
			$(".tips-dload-btn").hide();
			$(".tips-off").hide();
			$(".ie-tips").slideUp();
		});
	}
}

$(function(){
	//首页轮播当空时去掉当前LI
	/*var iframenot=$(".src-bann .src-img ul li");
	for(var i=0;i<iframenot.length;i++){
		if(!iframenot.eq(i).children().is("iframe")){
			iframenot.eq(i).remove();
		}
	}
	var jli=1;
	for(var i=0;i<5;i++){
		if($(".src-bann .src-img ul li iframe").length<=i){
			$(".src-bann .src-img ol li:eq("+(5-jli)+")").remove();
			jli++;
		}
	}*/
	//楼层右则文字广告加|
	for(var i=0;i<$(".tit-pro .dis").length;i++){
		switch($(".tit-pro .dis:eq("+i+")").children("a").length){
			case 2:
				$(".tit-pro .dis:eq("+i+")").children("a:eq(0)").after("<i>|</i>");
			break;
			case 3:
				$(".tit-pro .dis:eq("+i+")").children("a:eq(0)").after("<i>|</i>");
				$(".tit-pro .dis:eq("+i+")").children("a:eq(1)").after("<i>|</i>");
			break;
			default:
			break;
		}
	}
	//商城广告
	/*var ifr=$(".ml-bock ul li");
	for(var i=0;i<ifr.length;i++){
		if(!ifr.eq(i).children().is("iframe")){
			ifr.eq(i).remove();
		}
	}
	if(!$(".ml-bock ul li:eq(0)").hasClass("cur")){
		$(".ml-bock ul li:eq(0)").addClass("cur");
	}
	if(ifr.children("iframe").length==4){
		$(".mall-li .r .img02").css("display","block");
		$(".mall-li .r .img01").css("display","none");
		$(".mall-li .l").removeAttr("style");
	}*/
	
	
	
	
	try{ieUpdateTips();}catch(e){console.info(e.message);}//IE升级提示
	try{marquee.loop(".src-new","#newLeft","#newRight",".new-view>ul",400);}catch(e){console.info(e.message);}/*无限循环*/
	//$("div.m-nav").after('<div class="festival"><div class="festival-bd"></div></div>');添加用于新年效果的div
	$("body").append(
	'<div id="top-fixed" class="g-d-n fixed">'+
		'<a class="go_yj" target="_blank" href="//www.csc86.com/about/feedback.html" title="意见反馈" onfocus="this.blur()">&nbsp;</a>'+
		'<a class="go_top" href="#" title="回到顶部" onfocus="this.blur()">&nbsp;</a>'+
	'</div>'
	);
	/*head头部广告*/
	setTimeout(function(){
   		 $('.ad-slide > .adv-2').slideUp(600, function(){
			$(".ad-slide .adv-slide").show();	 
			//$(this).hide();
		 });
		 	
	}, 3000)
	
	$(".clos-btn").live("click",function(){
  		$("#ad-slide").remove();
	})


	/*企业，个人，新手上路*/
	$("#tab-sev>li>a").on("hover",function(){
		$(this).parent().addClass("cur").siblings().removeClass("cur");
	});	
	/*商圈*/
	$("#dir-mess dd a").hover(function(){
		var $t = $(this);
		$("#show-img").attr("src",$t.data("url")).parent().attr("href",$t.attr("href"));
		$t.parent().addClass("cur").siblings().removeClass();
	});
	/*会员推荐*/
	$("#con-hover li").append('<div class="mask"></div>').hover(function(){
		var $t = $(this);
		$t.addClass("cur").siblings().removeClass("cur");
		$("#hiv-mem").addClass("h-hover");
		$("#show-con").html($t.find("div.g-d-n").html());	
	});
	$("#hiv-mem").on("mouseleave",function(){
		$(this).removeClass("h-hover").find("li.cur").removeClass("cur");
		$("#show-con").html("抢占好位置，让你的名片更快传播！");
	});
	/*反回顶部*/
	$("#f-top").click(function(){
		$(document).animate({scrollTop:0},500);
	});
	
	$(window).bind("scroll",function (){
		//console.log("sd");
		$(document).scrollTop() > 10 ? $("#top-fixed").removeClass("g-d-n") :$("#top-fixed").addClass("g-d-n");
	}).trigger("scroll");
	
	var scrollTimer1 = "",scrollTimer2 = "",scrollTimer3 = "",scrollTimer4 = "",scrollTimer5 = "",scrollTimer6 = "";
	
	$("#src-market dl ol.src-pru1").hover(function() {
        clearInterval(scrollTimer1);
    }, function() {
		var $this=$(this);
         scrollTimer1 = setInterval(function() {
            scrollLeft($this);
        },5000);
    }).trigger("mouseleave");
	
	$("#src-market dl ol.src-pru2").hover(function() {
        clearInterval(scrollTimer2);
    }, function() {
		var $this=$(this);
         scrollTimer2 = setInterval(function() {
            scrollLeft($this);
        },5000);
    }).trigger("mouseleave");
	
	$("#src-market dl ol.src-pru3").hover(function() {
        clearInterval(scrollTimer3);
    }, function() {
		var $this=$(this);
         scrollTimer3 = setInterval(function() {
            scrollLeft($this);
        },5000);
    }).trigger("mouseleave");
	
	$("#src-market dl ol.src-pru4").hover(function() {
        clearInterval(scrollTimer4);
    }, function() {
		var $this=$(this);
         scrollTimer4 = setInterval(function() {
            scrollLeft($this);
        },5000);
    }).trigger("mouseleave");
	
	$("#src-market dl ol.src-pru5").hover(function() {
        clearInterval(scrollTimer5);
    }, function() {
		var $this=$(this);
         scrollTimer5 = setInterval(function() {
            scrollLeft($this);
        },5000);
    }).trigger("mouseleave");
	
	$("#src-market dl ol.src-pru6").hover(function() {
        clearInterval(scrollTimer6);
    }, function() {
		var $this=$(this);
         scrollTimer6 = setInterval(function() {
            scrollLeft($this);
        },5000);
    }).trigger("mouseleave");

	function scrollLeft(obj){
		obj.animate({ "top" : "-20px" },400, function(){
			obj.css({top:0}).find("li:first").appendTo(obj);
		})
	}		
	var $t = $("#ad-slide"),len = $t.find("img").length;
	if(len){
	    $("#ad-slide").css({"min-height":"40px"});
		$t.append('<span class="clos-btn"> </span>');
	}
	
	/*友情链接更多下拉*/
	function links_down(){
		var _html = "<b class='links-down'>更多</b>",
			f = $("div.frie-links"),
			h = f.height();
		if( parseInt(h) > 22 ){
			f.append(_html);
			f.children("span").css("height",22);
			var b = $("b.links-down");
			b.toggle(function(){
				f.children("span").css("height","auto");
				$(this).addClass("links-down2");
			},function(){
				f.children("span").css("height",22);
				$(this).removeClass("links-down2");
			});
		}		
	};links_down();
	
	
	//精彩活动
	var timecust;
	$(".cust-l").hover(function(){
		clearInterval(timecust);
	},function(){
		timecust=setInterval(function(){
				var leng=$(".cust-l li.cur").nextAll().length;
				//alert(leng);
				if(leng==0){
					$(".cust-l li").removeClass("cur").first().addClass("cur");
				}else{
					$(".cust-l").find(".cur").removeClass("cur").next().addClass("cur");
				}	
		},3000);
	}).trigger("mouseleave");
	$(".cust-l li").hover(function(){
		clearInterval(timecust);
		$(".cust-l li").removeClass("cur");
		$(this).addClass("cur");
	},function(){}).trigger("mouseleave");
	
	//明星商铺
	var timecust02;
	$(".ce-two").hover(function(){
		clearInterval(timecust02);
	},function(){
		timecust02=setInterval(function(){
				var leng=$(".ce-two li.cur").nextAll().length;
				//alert(leng);
				if(leng==0){
					$(".ce-two li").removeClass("cur").first().addClass("cur");
				}else{
					$(".ce-two").find(".cur").removeClass("cur").next().addClass("cur");
				}	
		},3000);
	}).trigger("mouseleave");
	$(".ce-two li").hover(function(){
		clearInterval(timecust02);
		$(".ce-two li").removeClass("cur");
		$(this).addClass("cur");
	},function(){}).trigger("mouseleave");
	
	//商城广告
	var mimg=false;
	$(".mall-li .r .img01").click(function(){
		var ling=$(".mall-li ul li.cur").nextAll().length;
		var left=$('.ml-bock ul').position().left;
		var allleng=$(".mall-li ul li").length;
		var ti;
		if(allleng/4==2){ti=1;
		}else if(allleng/4==3){ti=2;
		}else if(allleng/4==1){ti=0;}
		var al=allleng-allleng/4;
		var alt=allleng-ti;
		if(ling==al){
			$(".mall-li .r .img02").css("display","block");
			$(".mall-li .r .img01").css("display","none");
			$(".mall-li .l").removeAttr("style");
		}else{
			if(!mimg){
				mimg=true;
				if(ling==alt){
				$(".mall-li .r .img02").css("display","block");
				$(".mall-li .r .img01").css("display","none");
				}
				$(".ml-bock ul").animate({left:left-(123*4)},300,function(){mimg=false;});
				$(".mall-li .l .img02").css("display","block");
				$(".mall-li .l .img01").css("display","none");
				$(".mall-li ul").find(".cur").removeClass("cur").next().addClass("cur");
				}
		}
	});
	$(".mall-li .l .img02").click(function(){
		var ling=$(".mall-li ul li.cur").prevAll().length;
		var left=$('.ml-bock ul').position().left;
		if(ling==1){
			$(".mall-li .l .img01").css("display","block");
			$(".mall-li .l .img02").css("display","none");
			$(".mall-li .r").removeAttr("style");
		}else{
			if(!mimg){
				mimg=true;
				if(ling==2){
					$(".mall-li .l .img01").css("display","block");
					$(".mall-li .l .img02").css("display","none");
				}
				$(".ml-bock ul").animate({left:left+(123*4)},300,function(){mimg=false;});
				$(".mall-li .r .img01").css("display","block");
				$(".mall-li .r .img02").css("display","none");
				$(".mall-li ul").find(".cur").removeClass("cur").prev().addClass("cur");
			}
		}
	});
	
	
});

var csc=csc||{};
//加好友
var addfriendAct = function($id) {
  csc.useDialog(function(){	
		seajs.use(csc.url("res","/f=js/m/sign"),function(){
			csc.checkSign();
		});
	});
  //要加处理登录页判断
   var $name="", sname ='<div class="g-f-msg-box"><input type="text" class="txt" id="uname" value=""/><p class="tps" style="margin-top:6px;"><strong>提示</strong>请输入您的姓名</p></div>';
	$.get(csc.url("member","/public/personal/username"),function(data){
		$name=$.trim(data.username);
		if($name=="NotLogin"){
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}else if (!$name) {
			csc.useDialog(function (){
			artDialog({id: "addfriend0",content: sname,fixed: true,title: "请输入您的姓名",width: 280,padding: "10px 19px 10px 15px",init: function() {
					$("#uname").live("focus", function() {
						var $val = $(this).val(), defaultValue = $("#uname")[0].defaultValue;
						if (!$val || $val === defaultValue) {
							$(this).val("");
							$("#tps").hide();
						}
					});
				},ok: function() {
					var defaultValue = $("#uname")[0].defaultValue, $name = $.trim($("#uname").val());
					if (!$name || $name === defaultValue) {
						$("#uname").focus();
						$("#tps").show();
						return false;
					}
					relfirend($id, $name);
				},cancel:function(){},lock: true});
				})
		} else{
			relfirend($id);
		}
	},"jsonp");
};

//加入圈子

//加入圈子
csc.addCircleCircleId = "";csc.addCircleObj = null;
csc.addCircleCommC = function(){
	$.get("//quan.csc86.com/doCircle?t=authC&circleId="+csc.addCircleCircleId,function(data){
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
					$.get("//quan.csc86.com/doCircle?t=addC&circleId="+csc.addCircleCircleId+"&"+$("#addCircleForm").serialize(),function(data){
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
