
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
	$.get('http://data.csc86.com/api.php?op=dianzan&act=getcount&formid=16&id=1', function(data){//alert(data);
		$("span.right").html(data.data.points+"℃");		
		$("span.wrong").html(data.data.except+"℃");																														
	},"jsonp");
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}
	},"jsonp");
	$(".box03 span").hover(function(){
		$(this).children("a").css("display","block");	
	},function(){
		$(this).children("a").css("display","none");											 
	});
	$(".box04 span").hover(function(){
		$(this).children("a").css("display","block");	
		$(this).find("strong").css("background","#ff4c4c");	
	},function(){
		$(this).children("a").css("display","none");	
		$(this).find("strong").css("background","#4c4c4c");												 
	});
	$(".box05 span").hover(function(){
		$(this).find("strong").css("background","#ff4c4c");	
	},function(){
		$(this).find("strong").css("background","#4c4c4c");												 
	});
	$(".box06 ul li a").hover(function(){
		$(this).find("strong").css("display","block");	
	},function(){
		$(this).find("strong").css("display","none");												 
	});

	
	//左移动
	$(".info-to .scr-l").click(function(){
		left_right("div.scr-all","1");
	});
	//右移动
	$(".info-to .scr-r").click(function(){
		left_right("div.scr-all","2");
	});
	
	//左移动
	$(".bxtop .bx-l").click(function(){
		left_righttwo("1","2");
	});
	//右移动
	$(".bxtop .bx-r").click(function(){
		left_righttwo("2","2");
	});
	//左移动
	$(".bxbottom .bx-l").click(function(){
		left_righttwo("1","1");
	});
	//右移动
	$(".bxbottom .bx-r").click(function(){
		left_righttwo("2","1");
	});
	
	$(".bxbox .bob02 li").live("click",function(){
		var to=$(this).index();
		$(".bot02 li").removeClass("cur").siblings("li:eq("+to+")").prev().addClass("cur");
		$(".bob02 li").removeClass("cur").siblings("li:eq("+to+")").prev().addClass("cur");
	});
	
});
//轮播
var left_righttwo=function(un,tmp){
	var $ul=$(".bxbottom .bxsrc"),
		$w=$ul.find("li:first").width(),
		$y=$(".bxtop ul li:first").width(),
		$th01=$(".bxtop ul li.cur").index(),
		$th02=$(".bxbottom ul li.cur").index();
	if(!$ul.is(":animated")){
		if(un==1){
			$(".bxtop .bxsrc").animate({
				left:-$y
			},300);
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("li:first").appendTo($ul);
				$(".bxtop .bxsrc").css({left:"0px"}).find("li:first").appendTo(".bxtop .bxsrc");
				if(tmp==1){
					if($th02==0){
						$(".bxbottom ul li").removeClass("cur").siblings("li:first").addClass("cur");
						$(".bxtop ul li").removeClass("cur").siblings("li:first").addClass("cur");
					}else{
						$(".bxbottom ul li.cur").removeClass("cur").next().addClass("cur");
						$(".bxtop ul li").removeClass("cur").siblings("li:eq("+($th02-1)+")").addClass("cur");
					}
				}else{
					if($th02==0){
						$(".bxbottom ul li").removeClass("cur").siblings("li:first").addClass("cur");
						$(".bxtop ul li").removeClass("cur").siblings("li:first").addClass("cur");
					}else{
					$(".bxtop ul li.cur").removeClass("cur").next().addClass("cur");
					$(".bxbottom ul li").removeClass("cur").siblings("li:eq("+($th01-1)+")").addClass("cur");
					}
				}
			});
		}else{
			$ul.css({left:-$w}).find("li:last").prependTo($ul);
			$(".bxtop .bxsrc").css({left:-$y}).find("li:last").prependTo(".bxtop .bxsrc");
			$(".bxtop .bxsrc").animate({
				left:0
			},300);
			$ul.animate({
				left:0
			},300,function(){
				if(tmp==1){
					$(".bxbottom ul li.cur").removeClass("cur").prev().addClass("cur");
					$(".bxtop ul li").removeClass("cur").siblings("li:eq("+($th02-1)+")").addClass("cur");
				}else{
					$(".bxtop ul li.cur").removeClass("cur").prev().addClass("cur");
					$(".bxbottom ul li").removeClass("cur").siblings("li:eq("+($th01-1)+")").addClass("cur");
				}
			});
		}
	}
}

//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find(".box04"),
		$w=$ul.find("span:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("span:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("span:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
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

