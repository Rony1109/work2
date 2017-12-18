/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias:  {
		'focus': 'c/home/index/js/focusPlay',
		'src': 'c/home/index/js/src_bdt'
	}			  
});
define(function(require, exports, module) {
	var csc = require('focus');
	var src = require('src');
	
	//设置首页及添加收藏
	require('m/top-bar/js/init');
	require('m/head-search/js/init');

    //友情链接更多
    require('c/home/links/js/linkMore');
	
	//轮播
	$(".src-img ul").find("script").remove();
	csc.focusPlay("div.src-img");
	
	//检查是否登录
	$.get("//api.csc86.com/notify/notify",function(data){
		if(data.status==true){
			$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>'+data.data.purchase+'</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>'+data.data.bank+'</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>'+data.data.message+'</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
		}
	},"jsonp");
	
	//首页今日采购左移动
	$(".c-phe .l").click(function(){
		src.left_right(".c-d-src","1");
	});
	//首页今日采购右移动
	$(".c-phe .r").click(function(){
		src.left_right(".c-d-src","2");
	});
	//首页今日采购轮播
	var timer;
	$('#c-phe').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 src.left_right($th,"1");
			 },5000);
	 }).trigger("mouseleave");
	
	//左则固定宽度
	var viwidth=$(window).width();
	if(viwidth>1100){
		var left=(viwidth-1000)/2-115;
		$("div.fiexd_nav").css("right",left);
	}
	
	//热门活动标题切换
	$(".l-title h3").hover(function(){
		hover_more($(this),".l-title h3",".l-cont ul");
	});
	
	//热门活动内容图片显示切换
	$(".l-cont ul:eq(0) li").hover(function(){
		hover_more($(this),".l-cont ul:eq(0) li");
	});
	
	//会员服务及买家入门切换
	$(".tab-sev-til a").hover(function(){
		hover_more($(this),".tab-sev-til a",".sev-til");
	});
	
	//企业访谈转图片内容切换
	$(".l-alt a").hover(function(){
		hover_more($(this),".l-alt a",".l-img a");
	});
	
	
	//右则导航收展效果
	$(".fd-header,.fd-footer").click(function(){
		if(!$("div.fd-content").is(":animated")){
			if($(".fd-content").is(":visible")){
				$("div.fd-content").slideUp();
				$(".fd-footer a.show").css("display","none");
				$(".fd-footer a.hid").css("display","block");
			}else{
				$("div.fd-content").slideDown();
				$(".fd-footer a.show").css("display","block");
				$(".fd-footer a.hid").css("display","none");
			}
		}										  
	});
	
	//右则导航楼层跳转
	$(".fd-content span a").click(function(){
		var $th=$(this);	
		var h=$(this).attr("href").replace(/\#/,'');
		var targetOffset =$("div[name='"+h+"']").position().top;
		$('html,body').animate({scrollTop: targetOffset},18,function(){//alert($th.parent().html());
			setTimeout(function(){
				$(".fd-content span").removeClass("cur");
				$th.parent().addClass("cur");	
			},5)
		});
	});
	
	//右则导航出现
	var fk=[];
	var lyrightstart=false;
	function closeban(){
		fk=[];
		for(var i=0;i<$(".mark-lay").length;i++){
			fk.push($(".mark-lay").eq(i).offset().top);
		}
	}
	closeban();
	$(window).scroll(function(){
		if($("#bannerAll").length==0&&lyrightstart==false){
			closeban();
			lyrightstart=true;
		}
		var topscr=$(this).scrollTop();
		if(topscr<130){
			$(".fiexd_nav").addClass("g-dn");
		}else{
			$(".fiexd_nav").removeClass("g-dn");
		}
		if(arrivedAtBottom()){
			var leng=$(".fd-content span").length;
			$(".fd-content span").removeClass("cur");
			$(".fd-content span:eq("+(leng-1)+")").addClass("cur");
			return;
		}
		for(var j=0;j<fk.length;j++){
			if(topscr<fk[j+1]){
				$(".fd-content span").removeClass("cur");
				$(".fd-content span:eq("+j+")").addClass("cur");
				return true;
			}else{
				$(".fd-content span").removeClass("cur");
			}
		}
		
	});	
	//滚动条总高度
	var arrivedAtBottom = function () {
		return $(document).scrollTop() + $(window).height() == $(document).height();
	}
	
	//头部广告
	$(".min-banner").css("display","none");
	var stime=setTimeout(function(){
		$(".max-banner").slideUp("slow",function(){
			$(".min-banner").show();
			lyrightstart=true;
			closeban();
		});
	},5000)
	$(".min-banner span").click(function(){
		$(this).closest(".g-o").css("display","none");
		lyrightstart=true;
		closeban();
	});
	if($(".min-banner a").length<1){
		$(".min-banner").find("span").remove();
	}
	if($(".max-banner a").length<1){
		$(".max-banner").find("span").remove();
	}
	
	//电商产业园切换
	$(".tab_tit li").hover(function(){
		$th=$(this).index();
		$(".tab_tit li").removeClass("hover");
		$(this).addClass("hover");
		$(".tab_con .tab_item").removeClass("cur");
		$(".tab_con .tab_item").eq($th).addClass("cur");						
	});
	
	
	
	//判断浏览器版本
	var browser=navigator.appName 
	var b_version=navigator.appVersion 
	if(b_version.indexOf(";")!=-1){
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,""); 
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
		{ 
		$("body").prepend("<div class='ie-tips'><div class='ie8 g-o'><a class='tips-dload-btn' href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank'>立即下载</a><b class='tips-off'>关闭</b></div></div>");
		} 
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
		{ 
		$("body").prepend("<div class='ie-tips'><div class='ie8 g-o'><a class='tips-dload-btn' href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank'>立即下载</a><b class='tips-off'>关闭</b></div></div>");
		} 
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") 
		{ 
		$("body").prepend("<div class='ie-tips'><div class='ie9 g-o'><a class='tips-dload-btn' href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank'>立即下载</a><b class='tips-off'>关闭</b></div></div>");
		}
	}
	 
	
	$(".tips-off").bind('click',function(){
		$(".ie-tips").detach();					  
	});

	$('div[data-aid]').each(function(){
		var $t = $(this);
		$.get('//api.csc86.com/g/check.html',{
			id:$t.data('aid'),
			adtype:$t.data('adtype'),
			csc_ajax:true
		},function(data){
			if(!$t.is(':first-child') && $t.parent().is('.dis')){
				$t.before('<i>|</i>');
			}
			$t.before(data.data);
			$t.remove();
		},'jsonp');
	});
	
	//楼层右则文字广告加
	$('div.tit-pro .dis a:not(:last-child)').after('<i>|</i>');
});

//tmp:$(this);elem:当前事件元素；add：同事要添加删除的class;
function hover_more(tmp,elem,add,num){
	var length=arguments.length;
	if(length==3){
		$th=tmp.index();
		$(add).removeClass("cur");
		$(add).eq($th).addClass("cur");
	}
	$(elem).removeClass("cur");
	tmp.addClass("cur");
}


