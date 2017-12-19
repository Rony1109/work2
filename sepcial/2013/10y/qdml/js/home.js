$(function(){
	//产品鼠标滑过效果
	$(".pr ul li").hover(function(){
		$(this).children("span").fadeIn();			  
	},function(){
		$(this).children("span").fadeOut();
	});
	
	//右测导航效果
	$(".sildren .ftop span").hover(function(){
		var indx=$(this).index();
		$(".sildren .ftop span,.content .ban ul li,.pr ul").removeClass("cur");
		$(".sildren .font-bg").animate({top:186+indx*56},130);
		$(".content .ban ul").animate({top:-indx*686},130);
		$(".sildren .ftop span:eq("+indx+")").addClass("cur");
		$(".content .ban ul li:eq("+indx+")").addClass("cur");
		$(".pr ul:eq("+indx+")").addClass("cur");
	});
	$(".content .l").click(function(){
			var inx=$(".content .ban ul li.cur").prevAll().length;
			$(".sildren .ftop span,.content .ban ul li,.pr ul").removeClass("cur");
			if(inx==0){
				$(".sildren .font-bg").animate({top:186+4*56},130);
				$(".content .ban ul").animate({top:-4*686},130);
				$(".sildren .ftop span:last").addClass("cur");
				$(".content .ban ul li:last").addClass("cur");
				$(".pr ul:last").addClass("cur");
			}else{
				$(".sildren .ftop span:eq("+(inx-1)+")").addClass("cur");
				$(".content .ban ul li:eq("+(inx-1)+")").addClass("cur");
				$(".pr ul:eq("+(inx-1)+")").addClass("cur");
				$(".sildren .font-bg").animate({top:186+(inx-1)*56},130);
				$(".content .ban ul").animate({top:-(inx-1)*686},130);
			}
	});
	$(".content .r").click(function(){
		var indx=$(".content .ban ul li.cur").index();
		$(".sildren .ftop span,.content .ban ul li,.pr ul").removeClass("cur");
		if(indx==4){
			$(".sildren .font-bg").animate({top:186},130);
				$(".content .ban ul").animate({top:0},130);
				$(".sildren .ftop span:first").addClass("cur");
				$(".content .ban ul li:first").addClass("cur");
				$(".pr ul:first").addClass("cur");
		}else{
			$(".sildren .font-bg").animate({top:186+(indx+1)*56},130);
			$(".content .ban ul").animate({top:-(indx+1)*686},130);
			$(".sildren .ftop span:eq("+(indx+1)+")").addClass("cur");
			$(".content .ban ul li:eq("+(indx+1)+")").addClass("cur");
			$(".pr ul:eq("+(indx+1)+")").addClass("cur");
		}
	});
	
	
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-sign-info").html("您好，&nbsp;<b>"+data.data.userName+"&nbsp;&nbsp;&nbsp;&nbsp;");
		}
	},"jsonp");
	
	
	
	/*
	//使用自定义动画
	//过渡效果
	var animations= ['rightFade','leftFade'];
	var total_anim= animations.length;
	//设置选择效果
	var easeType= 'swing';
	//每个转换的速度
	var animSpeed	= 450;
	//缓存
	var $hs_container	= $('.ban .cur');
	var $hs_areas= $hs_container.find('.per-all');
	
	//第一预加载的所有图像
	$hs_images= $hs_container.find('img');
	var total_images= $hs_images.length;
	var cnt= 0;
	$hs_images.each(function(){
		var $this = $(this);
		$('<img/>').load(function(){
			++cnt;
			if(cnt == total_images){
				$hs_areas.each(function(){
					var $area= $(this);
					//当鼠标进入该区域时，我们制作动画的电流
					//图像（随机阵列动画）
					//使下一个得到可见。
					//"over" 是一个标志，如果我们可以动画 
					//一个地区或没有（我们不希望2动画
					//为每个区域在同一时间）
					$area.data('over',true).bind('mouseenter',function(){
						if($area.data('over')){
							$area.data('over',false);
							//在这方面多少图像？
							var total= $area.children().length;
							//可见光图像
							var $current	= $area.find('img:visible');
							//可见光图像的索引
							var idx_current= $current.index();
							//的将被显示的下一个图像。
							//无论是下一个，或第一个如果当前是最后
							var $next= (idx_current == total-1) ? $area.children(':first') : $current.next();
							//显示下一个（不可见）
							$next.show();
							//得到一个随机的动画
							var anim= animations[Math.floor(Math.random()*total_anim)];
							switch(anim){
								//从当前幻灯片的权利
								//从当前幻灯片的右侧和淡出
								case 'rightFade':
								$current.animate({'left':$current.width()+'px','opacity':'0'},animSpeed,easeType,function(){
									$current.hide().css({'z-index':'9','left':'0px','opacity':'1'});
									$next.css('z-index','9');
									$area.data('over',true);
								});
								break;
								//从当前幻灯片的左侧和淡出
								case 'leftFade':
								$current.animate({'left':-$current.width()+'px','opacity':'0'},animSpeed,easeType,function(){
									$current.hide().css({'z-index':'9','left':'0px','opacity':'1'});
									$next.css('z-index','9');
									$area.data('over',true);
								});
								break;	
								default:
								$current.animate({'left':-$current.width()+'px'},animSpeed,easeType,function(){
									$current.hide().css({'z-index':'9','left':'0px','opacity':'1'});
									$next.css('z-index','9');
									$area.data('over',true);
								});
								break;
							}	
						}
					});
				});
				//当点击hs_container各个领域得到滑动
				$hs_container.bind('click',function(){
					$hs_areas.trigger('mouseenter');
				});
			}
		}).attr('src',$this.attr('src'));
	});	
	
	*/
	
	//广告图效果
	//var showt=false;
	$(".per-all").hover(function(){  
		var $th=$(this);
		$(".per-all").removeAttr("style");
		$th.css("z-index","10");
		$th.animate({opacity: '0'}, "slow").animate({opacity: '1'}, "slow"); 
		setTimeout(function(){
			$th.children(".img-pr").fadeIn();
			$th.children(".img-lay").fadeIn();				
		},300)
		
	},function(){
		setTimeout(function(){
			$(".img-pr,.img-lay").css("display","none");			
		},300)
	});
	
	
	
});
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