/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'top': 'm/top-bar/js/init.js',
		'header': 'm/head-search/js/init.js',
		'placeholder': 'm/sea-modules/placeholder.js'
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
    require('top');
    require('header');
    require('placeholder');
    require('./jquery.mousewheel.js');

    /*
     * 以下为专题js代码
     * ......
     */
    	var page=0,ismove=true,bodyH=$(window).height(),$nav = $('.Jnav'),$sitem=$('.sitem');
	function keyUdCode(event){
		event=EventUtil.getEvent(event);
		var code=EventUtil.getCharCode(event);
		switch(code){
			case 38://按向上键
			handleFun(120);
			break;
			case 40://按向下键
			handleFun(-120);
			break;
		};
	}
	$("#scrobox").css('height',bodyH+"px");
	$(".Jnav li").on('click',function(){
		var index=$('.Jnav li').index(this);
		ismove=false;
		$('.scroll').animate({'top':-index*100+'%'},500,function(){
			page=index;
			$('.Jnav li').removeClass('on').eq(page).addClass('on');
			$('body,html').animate({scrollTop:$('#scrobox').offset().top},500);
			$nav.css("position","fixed");
			ismove=true;
		});
		$(this).mousewheel(function(event, delta) {//重新绑定滑动
			handleFun(delta);	
			return false;		
		});
		return false;
	});
	$("#scrobox").hover(function(){
		$(this).mousewheel(function(event, delta) {
			handleFun(delta);	
			return false;		
		});
		$nav.css("position","fixed");
	},function(){
		$nav.css("position","absolute");
	});
	$("#totop").on("click",function(){
		$('body,html').animate({scrollTop:0},500);
	});
	$(document).mousewheel(function(){
		if($('#scrobox').offset().top==$(window).scrollTop() && ismove){
			handleFun(delta);	
			return false;
		}
	});
	function handleFun(delta){
		var totalPage=$('.sitem').length;
		switch(delta){
			case 1://向上滚动
			if(page>0&&ismove){
				ismove=false;
				$('.scroll').animate({'top':'+=100%'},500,function(){	
					page--;				
					$('.sitem').removeClass('cur').eq(page).addClass('cur');
					$('.Jnav li').removeClass('on').eq(page).addClass('on');
					$('body,html').animate({scrollTop:$('#scrobox').offset().top},500);
					ismove=true;
				});				
			}
			else if(page==0 && ismove){				
				$("#scrobox").unmousewheel();				
			}
			break;
			case -1://向下滚动
			if(page<totalPage-1 &&ismove){
				ismove=false;
				$('.scroll').animate({'top':'-=100%'},500,function(){	
					page++;				
					$('.sitem').removeClass('cur').eq(page).addClass('cur');
					$('.Jnav li').removeClass('on').eq(page).addClass('on');
					$('body,html').animate({scrollTop:$('#scrobox').offset().top},500);
					ismove=true;
				});
				
			}
			else if(page==totalPage-1 && ismove){
				$("#scrobox").unmousewheel();
				
			}
			break;
		};
	}



	 //第五层效果
	 $(function(){
		 var items = $("#f5-right").find("li");
		 var leftTit = $(".f5-left .title h3 a"),leftInt = $(".f5-left .title p");
		 var leftImg = $(".f5-left>a img");
		 //alert(leftImg.attr("src"));
		 //console.log(items);
		 items.hover(function(){
			 var liImg = $(this).find("a:first img").attr("src");
			 $(this).css("backgroundColor","#555");
			 leftTit.text($(this).find("h5").text());
			 leftInt.text($(this).find("p").text());
			 leftImg.attr("src",liImg);
			 },
			 function(){
		   	 $(this).css("backgroundColor","#e58322");	 
				 });
		
		 });
		 
		 //第六层效果
		  // 图片轮播
		  require('./scroll');
		 var tm;
		 $("#imgscroll").CscScroll({
		     Left: 2000,
		     Right: 2000,
		     Time: 2000,
		     linedUp: tm,
		     Auto: false,
		     Visual: 3
		 });
		 
		 
		 
		 
	// 	 //焦点图轮播
	// function tab(option,floorID){
	// 	function $(id){
	// 	return typeof id === 'string'?document.getElementById(id):id;
	// 	} 
	// 	//当前高亮显示的页签的索引
	// 	var index = 0;
	// 	var timer = null;
		
	// 	//获取所有的页签和要切换的内容
	// 	var lists = $(option).getElementsByTagName("li");
	// 	//if(!document.getElementsByClassName()) return false;加了这一句就不执行了
	// 	var divs = $(floorID).getElementsByClassName("con");
	    
	// 	//遍历每一个页签，给它们绑定鼠标滑过事件
	// 	for(var i=0; i < lists.length;i++){
	// 		lists[i].id=i;
	// 		lists[i].onmouseover = function(){
	// 			clearInterval(timer);
	// 			changeOption(this.id);
	// 			}
	// 		divs[i].onmouseover = function(){
	// 			clearInterval(timer);
	// 			}	
				
	// 		lists[i].onmouseout = function(){
	// 			timer = setInterval(autoPlay,2000);
	// 				}
	// 		divs[i].onmouseout = function(){
	// 			timer = setInterval(autoPlay,2000);
	// 				}	
	// 		}
	// 	//在添加定时器之前，清空正在等待的一些定时器
	// 	if(timer){
	// 		clearInterval(timer);
	// 		timer = null;
	// 		}
	// 	//添加定时器，改变当前高亮的索引
	//    timer = setInterval(autoPlay,2000);
		
	//    function autoPlay(){
	// 		index++;
	// 		if(index >= lists.length){
	// 			index=0;
	// 			}
	// 			changeOption(index);
	// 	   }

	//    function changeOption(curIndex){
	// 	   //console.log(curIndex);
	// 	   for(var j=0; j < lists.length; j++){
	// 				lists[j].className = "";
	// 				divs[j].className = "con g-dn";
	// 				index = curIndex;
	// 				}
	// 		//高亮显示当前页签
	// 		lists[curIndex].className = "cho";
	// 		divs[curIndex].className = "con g-db";
	// 	   }
	// }

});





