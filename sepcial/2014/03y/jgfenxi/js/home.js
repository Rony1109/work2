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

	
 $q = $('#fiexd');
      var fixed_num = 610;
      $(window).on('scroll',function(){
        var sT = $(this).scrollTop();
        if($.browser.msie&&$.browser.version==6.0){
          if(sT>fixed_num){
              $q.animate({
                top:$(window).scrollTop()
              },200);
  
          }else if(sT<fixed_num){
            $q.css({
              top:fixed_num
            });
          }
          return;
        }
        if(sT>fixed_num && $q.is(':not([style])')){
          $q.css({
            position:'fixed',
            top:0
          });
        }else if(sT<fixed_num && $q.is('[style]')){
          $q.removeAttr('style');

        }
      });

      $('ul>li', $q).each(function(index){
        var $me = $(this);
        $me.on('click', function(){ 
          if(index==7){
          	$(window).scrollTop(0);
          }
          else{
          	$(this).addClass('active').siblings().removeClass('active');
          }         
        });
      });
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
csc.trend=function(){
	//假调查
	var data=[{num:4568,height:194},{num:3008,height:145},{num:1670,height:120}],sum=1;
	$(".trend li").each(function(i){
		var $this=$(this);
		$this.find("span:first").css("height",data[i].height+"px").html(data[i].num);		
		$this.find("span:last").bind("click",function(){
			if(sum==1){
				sum=2;
				$this.find("span:first").text(data[i].num+=1).css("height",data[i].height+10+"px")
				alert("谢谢您的参与！");	
			}
			else{
				alert("您已经参加过了调查！请不要重复点击");
			}

		})
	});
	//图片滚动
	var timer,$scrolImg=$(".scroll_img");
	$(".scroll").hover(function(){
		clearInterval(timer)
	},function(){
		timer=setInterval(function(){
			scroll(-460);
		},2000);
	}).trigger("mouseleave");
	$(".scroll_l").click(function(){
		scroll(-460);
	});
	$(".scroll_r").click(function(){
		scroll(0);
	});
	function scroll(a){
		$scrolImg.animate({marginLeft:a+"px"},500)
		if(a<0){
			$scrolImg.append($scrolImg.children("li:first"));
		}
		else{
			$scrolImg.prepend($scrolImg.children("li:last"));
		}
		$scrolImg.animate({marginLeft:"-230px"},1)
	};
};



