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
	//左移动
	$(".maito .scr-l").click(function(){
		left_right(".scr-all","1");
	});
	//右移动
	$(".maito .scr-r").click(function(){
		left_right(".scr-all","2");
	});
	//轮播
	var timer;
	$('.maito').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	
	
	$("#call01 ul li:eq(3)").addClass("cur");
	var i=3,t=false;
	$("#call01 ul li").hover(function(){
		var $th=$(this);
		var leng=$th.closest("ul").find("li").length;
		if(leng>4&&$th.index()==3&&!t){
			numove($th,leng);
		}else if(leng>4&&$th.index()==leng-4&&$th.closest("ul").children(".cur").index()==leng-1&&t){
			unlto($th,leng);
		}
	});
	function numove(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i<leng-2){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left-250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").next().addClass("cur");
						if($ul.find("li.cur").index()==leng-1){
							t=true;
						}
						numove($th,leng);
						i++;
					});	
				}
			},630);
		}
	}
	function unlto(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i-1>3){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left+250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").prev().addClass("cur");
						unlto($th,leng);
						if($ul.find("li.cur").index()==3){
							t=false;
						}
						i--;
					});	
				}
			},630);
		}
	}
	
$("#call02 ul li:eq(3)").addClass("cur");
	var i2=3,t2=false;
	$("#call02 ul li").hover(function(){
		var $th=$(this);
		var leng=$th.closest("ul").find("li").length;
		if(leng>4&&$th.index()==3&&!t2){
			numove2($th,leng);
		}else if(leng>4&&$th.index()==leng-4&&$th.closest("ul").children(".cur").index()==leng-1&&t2){
			unlto2($th,leng);
		}
	});
	function numove2(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i2<leng-2){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left-250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").next().addClass("cur");
						if($ul.find("li.cur").index()==leng-1){
							t2=true;
						}
						numove2($th,leng);
						i2++;
					});	
				}
			},630);
		}
	}
	function unlto2(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i2-1>3){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left+250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").prev().addClass("cur");
						unlto2($th,leng);
						if($ul.find("li.cur").index()==3){
							t2=false;
						}
						i2--;
					});	
				}
			},630);
		}
	}
	
	$("#call03 ul li:eq(3)").addClass("cur");
	var i3=3,t3=false;
	$("#call03 ul li").hover(function(){
		var $th=$(this);
		var leng=$th.closest("ul").find("li").length;
		if(leng>4&&$th.index()==3&&!t3){
			numove3($th,leng);
		}else if(leng>4&&$th.index()==leng-4&&$th.closest("ul").children(".cur").index()==leng-1&&t3){
			unlto3($th,leng);
		}
	});
	function numove3(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i3<leng-2){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left-250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").next().addClass("cur");
						if($ul.find("li.cur").index()==leng-1){
							t3=true;
						}
						numove3($th,leng);
						i3++;
					});	
				}
			},630);
		}
	}
	function unlto3(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i3-1>3){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left+250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").prev().addClass("cur");
						unlto3($th,leng);
						if($ul.find("li.cur").index()==3){
							t3=false;
						}
						i3--;
					});	
				}
			},630);
		}
	}
	
	$("#call04 ul li:eq(3)").addClass("cur");
	var i4=3,t4=false;
	$("#call04 ul li").hover(function(){
		var $th=$(this);
		var leng=$th.closest("ul").find("li").length;
		if(leng>4&&$th.index()==3&&!t4){
			numove4($th,leng);
		}else if(leng>4&&$th.index()==leng-4&&$th.closest("ul").children(".cur").index()==leng-1&&t4){
			unlto4($th,leng);
		}
	});
	function numove4(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i4<leng-2){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left-250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").next().addClass("cur");
						if($ul.find("li.cur").index()==leng-1){
							t4=true;
						}
						numove4($th,leng);
						i4++;
					});	
				}
			},630);
		}
	}
	function unlto4(tmp,leng){
		var $th=tmp;
		var $ul=$th.closest("ul");
		if(i4-1>3){
			setTimeout(function(){
				if(!$ul.is(":animated")){
					$ul.animate({
						left:$ul.position().left+250
					},600,function(){
						$ul.find("li.cur").removeClass("cur").prev().addClass("cur");
						unlto4($th,leng);
						if($ul.find("li.cur").index()==3){
							t4=false;
						}
						i4--;
					});	
				}
			},630);
		}
	}
	
	
	

	
});

//左右滑过





//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find("ul"),
		$w=$ul.find("li:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("li:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}
