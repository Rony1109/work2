$(document).ready(function(){
	/*var timer;
	$(".cj_list ul").hover(function(){
		clearInterval(timer);
	},function(){
		var $me=$(this);
		timer=setInterval(function(){
			var a=$me.find("li:first")
			$me.animate({marginTop:"-25px"},500);
			setTimeout(function(){
				$me.append(a);
				$me.css("margin-top",0);
			},600)	
				
					
		},2000);
		
	}).trigger("mouseleave");

	var tm,sum=-1,ln;

	$(".scroll").hover(function(){
		clearInterval(tm);
		$(".btn_left").click(function(){
			sum+=1;
			if(ln>6){
				if(sum==(ln-6)){return}
				$(".scroll_list").animate({marginLeft:-133*sum+"px"})
			}
		})
		$(".btn_right").click(function(){
			sum-=1;
			if(ln>6){
				if(sum<0||sum==0){return}
				$(".scroll_list").animate({marginLeft:-133*sum+"px"})
			}
		})
	},function(){
		var $ul=$(".scroll_list");
		ln=$ul.children().length;
		tm=setInterval(function(){
			if(ln>6){
			sum++
				if(sum==(ln-6)){sum=0}
				$(".scroll_list").animate({marginLeft:-133*sum+"px"})
			}		
		},1000)
		sum+=1;
	}).trigger("mouseleave")*/
	
	//左移动
	$(".scroll .btn_left").click(function(){
		left_right(".scroll_box","1");
	});
	//右移动
	$(".scroll .btn_right").click(function(){
		left_right(".scroll_box","2");
	});
	//轮播
	var timer;
	$('.scroll').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
});

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
