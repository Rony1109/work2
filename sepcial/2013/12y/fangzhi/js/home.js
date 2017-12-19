//烟花
var fireworks = function(){
	this.size = 20;
	this.rise();
}
fireworks.prototype = {
	color:function(){
		var c = ['0','3','6','9','c','f'];
		var t = [c[Math.floor(Math.random()*100)%6],'0','f'];
		t.sort(function(){return Math.random()>0.5?-1:1;});
		return '#'+t.join('');
	},
	aheight:function(){
		var h = document.documentElement.offsetHeight-250;
		return Math.abs(Math.floor(Math.random()*h-200))+201;
	},
	firecracker:function(){
		var b = document.createElement('div');
		var w = document.documentElement.clientWidth;
		b.style.position = 'absolute';
		b.style.color = this.color();
		b.style.bottom = 0;
		b.style.left = Math.floor(Math.random()*w)+1+'px';
		document.getElementById("yhstart").appendChild(b);
		//document.body.appendChild(b);
		return b;
	},
	rise:function(){
		var o = this.firecracker();
		var n = this.aheight();
		var c = this.color;
		var e = this.expl;
		var s = this.size;
		var k = n;
		var m = function(){
			o.style.bottom = parseFloat(o.style.bottom)+k*0.1+'px';
			k-=k*0.1;
			if(k<2){
				clearInterval(clear);
				e(o,n,s,c);
			}
		}
		o.innerHTML = '.';
		if(parseInt(o.style.bottom)<n){
			var clear = setInterval(m,20);
		}
	},
	expl:function(o,n,s,c){
		var R=n/3,Ri=n/6,Rii=n/9; 
		var r=0,ri=0,rii=0;
		for(var i=0;i<s;i++){
			var span = document.createElement('span');
			var p = document.createElement('i');
			var a = document.createElement('a');
			span.style.position = 'absolute';
			span.style.fontSize = n/10+'px';
			span.style.left = 0;
			span.style.top =0;
			span.innerHTML = '*';
			p.style.position = 'absolute';
			p.style.left = 0;
			p.style.top =0;
			p.innerHTML = '*';
			a.style.position = 'absolute';
			a.style.left = 0;
			a.style.top =0;
			a.innerHTML = '*';
			o.appendChild(span);
			o.appendChild(p);
			o.appendChild(a);
		}
		function spr(){
			r += R*0.1;
			ri+= Ri*0.06;
			rii+= Rii*0.06;
			sp = o.getElementsByTagName('span');
			p = o.getElementsByTagName('i');
			a = o.getElementsByTagName('a');
			for(var i=0; i<sp.length;i++){
				sp[i].style.color = c();
				p[i].style.color = c();
				a[i].style.color = c();
				sp[i].style.left=r*Math.cos(360/s*i)+'px';
				sp[i].style.top=r*Math.sin(360/s*i)+'px';
				sp[i].style.fontSize=parseFloat(sp[i].style.fontSize)*0.96+'px';
				p[i].style.left=ri*Math.cos(360/s*i)+'px';
				p[i].style.top=ri*Math.sin(360/s*i)+'px';
				p[i].style.fontSize=parseFloat(sp[i].style.fontSize)*0.96+'px';
				a[i].style.left=rii*Math.cos(360/s*i)+'px';
				a[i].style.top=rii*Math.sin(360/s*i)+'px';
				a[i].style.fontSize=parseFloat(sp[i].style.fontSize)*0.96+'px';
			}
			R-=R*0.1;
			if(R<2){
				o.innerHTML = '';
				o.parentNode.removeChild(o);
				clearInterval(clearI);
			}
		}
		var clearI = setInterval(spr,20);
	}
}
/*window.onload = function(){
	function happyNewYear(){
		new fireworks();
	}
	setInterval(happyNewYear,1000);
}*/


$(function(){
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}
	},"jsonp");
	
	//滑过效果
	$(".info-all li").hover(function(){
		$th=$(this);
		$th.children(".bg").animate({width:'218px',height:'218px',left:'-19px',top:'-19px'},500);
		$th.find("h2").animate({fontSize:'29px',lineHeight:'50px'},500);
		$th.find("span").animate({fontSize:'17px',lineHeight:'26px'},500);
		$th.find("img").animate({width:'218px',height:'218px',left:'-19px',top:'-19px'},500);
		$th.animate({zIndex:'10'},500);
	},function(){
		$th=$(this);
		$th.children(".bg").animate({width:'180px',height:'180px',left:'0',top:'0'},100);
		$th.find("h2").animate({fontSize:'24px',lineHeight:'38px'},100);
		$th.find("span").animate({fontSize:'14px',lineHeight:'20px'},100);
		$th.find("img").animate({width:'180px',height:'180px',left:'0',top:'0'},100);
		$th.animate({zIndex:'0'},100);
	});
	
	//左移动
	$(".info-to .scr-l").click(function(){
		left_right(".scr-all","1");
	});
	//右移动
	$(".info-to .scr-r").click(function(){
		left_right(".scr-all","2");
	});
	//轮播
	var timer;
	$('.info-to .g-o-a').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	//弹出关闭
	$("div.lay-close,.pot01 a,.pot03 a,.pot04 a").click(function(){
		clearInterval(yhtime);
		setTimeout(function(){$(".layer").css("display","none");},300);
		$(".lay-close,.zzlay").css("display","none");
		$(".lay").removeClass("cur");
		$(".layer").animate({width:"0",height:"0",left:"165px",top:"115px",display:"none"},300);	
	});
	$(".pot02 a,.lay-no a,.lay-ok a").click(function(){
		clearInterval(yhtime);
	});
	//弹出框
	var yhtime;
	function happyNewYear(){
		new fireworks();
	}
	$(".gt-l a").click(function(){
		if(!$(".layer").is(":animated")){
			$.get("http://api.csc86.com/fangzhi/draw?event=8&ajax",function(data){
				switch(data.No){
					case 	-1:
						seajs.use(csc.url("res","/f=js/m/sign"),function (){			
							csc.checkSign("location.reload");
						});
					break;
					case 	-3:
						layshow(".pot03");
					break;
					case 	-4:
						layshow(".pot04");
					break;
					case 	-6:
						layshow(".pot02");
					break;
					case 	-7:
						layshow(".lay-ok");
					break;
					case 	-8:
						layshow(".pot01");
					break;
					case 	0:
						layshow(".lay-ok");
					break;
					case 	1:
						layshow(".lay-no",data.data.wininfo);
					break;
				}
			},"jsonp");
		}
		return false;
	});
	
	function layshow(tmp,val){
		 var isIE = !!window.ActiveXObject;  
		var isIE6 = isIE && !window.XMLHttpRequest;  
		var isIE8 = isIE && !!document.documentMode;  
		var isIE7 = isIE && !isIE6 && !isIE8;
		yhtime=setInterval(happyNewYear,1000);
		$(".zzlay").css({width: document.body.scrollWidth,height:document.body.scrollHeight,display:"block"});	
		$(".lay-close").css("display","block");
		$(tmp).addClass("cur");
		if($(tmp).is(".lay-no")){
			$(tmp).find(".rank").html((val.split(":"))[0]);
			$(tmp).find(".rank-name").html("获得&nbsp;｛"+(val.split(":"))[1]+"}");
		}
		if(isIE6||isIE7||isIE8){
			$(".layer").css({width:"645px",height:"315px",left:"165px",top:"115px",display:"block"});	
		}else{
			$(".layer").css({width:"0",height:"0",left:"165px",top:"115px",display:"block"});	
			$("#layer").animate({width:"645px",height:"315px",left:"300px",top:"480px"},300).animate({left:"200px",top:"100px"}, "slow");
		}
	}
	
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

