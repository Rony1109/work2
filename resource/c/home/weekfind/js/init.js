/**
 * 前端模板js文件
 * 
 */
 seajs.config({
	alias:  {
		'top': 'm/newtopnav/js/init.js',
		'rightcopy': 'm/bot-rightcopy/js/init.js',
		'backTop':'m/back-top/js/init.js'
	}			  
});
define(function(require, exports, module) {
	require('top');
	require('rightcopy');
	require('backTop');
	$('.g-back').addCss().goBack();//返回头部

	/*导航固定，goTop朝上*/
	function Gotop(opt){
		this.nav=opt.nav,
		this.initScrollY=document.documentElement.scrollTop || document.body.scrollTop;
		this.initY=this.initScrollY+this.nav.getBoundingClientRect().top,
		this.init();
	}
	Gotop.prototype={
		scroll:function(){
			var scrollY=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollY>this.initY){
				this.nav.style.position="fixed";
				this.nav.style.top=0;
				this.nav.style.left=0;
				this.nav.style.zIndex=9999;
			}else if(scrollY<=this.initY){
				this.nav.style.position="static";
				this.nav.removeAttribute("style")
			}
		},
		anchorteewn:function(){
			var timer=setInterval(function(){
				var scroll=document.documentElement.scrollTop || document.body.scrollTop;
				var speed=Math.floor(-scroll/3);
				document.documentElement.scrollTop = document.body.scrollTop = scroll + speed;
				if(scroll==0){
					clearInterval(timer);
				}
			},1000/16)	
		},
		init:function(){
			var _this=this;
			this.scroll();
			window.onscroll=function(){
				_this.scroll();
			}
		}
	}
	
	var goTop=new Gotop({
		nav:document.getElementById("menu-bar")
	})

	var $intoCode=$('.into').find("i.code_icon"),
		$intoHome=$('.into').find("i.home_icon"),
		$code=$(".code");
	$intoCode.each(function(index){
		$(this).hover(function(){
				$code.eq(index).fadeIn(100);
		},function(){
				$code.eq(index).hide();
		})
	})
	$intoHome.on("click",function(){
		//window.location.href=$(this).data("href");
		window.open($(this).data("href"),"_blank");
	})
	/*幻灯片*/
	function Slide(opt){
		this.prev=opt.prev,
		this.next=opt.next,
		this.slideLi=opt.slideLi,
		//this.alist=opt.alist,
		this.index=0,
		this.slide=opt.slide,
		this.len=this.slideLi.length,
		this.apoint=opt.apoint,
		this.timer,
		this.alist;
		if(this.len>1){
			this.init();
		}else{
			(this.len==1) && (this.slideLi[0].style.display="block");
			this.prev.parentNode.removeChild(this.prev),
			this.next.parentNode.removeChild(this.next);			
		}		
	}
	Slide.prototype={
		constructor:Slide,
		load:function(elem,src){
			var img=new Image();
			img.onload=function(){
				elem.src=src;
				elem.style.backgroundImage="none";
				elem.removeAttribute("data-src");
			}
			img.src=src;
		},
		slideAuto:function(){
			var len=this.len;
			this.slideLi[this.index].style.display="none";
			this.alist[this.index].className="slide_icon";
			this.index<len-1 ? this.index++ :this.index=0;
			this.slideLi[this.index].style.display="block";
			this.alist[this.index].className="slide_icon active";
		},
		timerSlide:function(){
			var _this=this;
			this.timer=setInterval(function(){
				_this.slideAuto();
			},3000);
		},
		getIndex:function(elem,arr){
			var index;
			for(var i=0,len=arr.length;i<len;i++){
				if(elem==arr[i]){
					index=i;
				}
			}
			return index;
		},
		point:function(len){
			var arr=[];
			for(var i=0;i<len;i++){
				if(i==0){
					arr[i]='<a href="javascript:;" class="slide_icon active"></a>';
				}else{
					arr[i]='<a href="javascript:;" class="slide_icon"></a>';
				}
			}
			this.apoint.innerHTML=arr.join('');
			this.alist=this.apoint.children;
		},
		init:function(){
			var _this=this;
			this.point(_this.len);
			this.timerSlide();
			this.prev.onclick=function(){
				clearInterval(_this.timer);
				var len=_this.len;
				_this.slideLi[_this.index].style.display="none";
				_this.alist[_this.index].className="slide_icon";
				_this.index>0 ? _this.index-- : _this.index= len-1;
				_this.slideLi[_this.index].style.display="block";
				_this.alist[_this.index].className="slide_icon active";
				_this.timerSlide();
			}
			this.next.onclick=function(){
				clearInterval(_this.timer);
				var len=_this.len;
				_this.slideLi[_this.index].style.display="none";
				_this.alist[_this.index].className="slide_icon";
				_this.index<len-1 ? _this.index++ : _this.index= 0;
				_this.slideLi[_this.index].style.display="block";
				_this.alist[_this.index].className="slide_icon active";
				_this.timerSlide();
			}
			for(var i=0,len=this.alist.length;i<len;i++){
				this.alist[i].onmouseover=function(){
					clearInterval(_this.timer);
					/*先隐藏当前*/
					_this.slideLi[_this.index].style.display="none";
					_this.alist[_this.index].className="slide_icon";

					var index=_this.getIndex(this,_this.alist);
					_this.slideLi[index].style.display="block";
					_this.alist[index].className="slide_icon active";
					_this.index=index;
				}
				this.alist[i].onmouseout=function(){
					_this.timerSlide();
				}
			}
		}
	}

	var slide=new Slide({
		prev:document.getElementById("prev"),
		next:document.getElementById("next"),
		slide:document.getElementById("slide"),
		slideLi:document.getElementById("slide").getElementsByTagName("li"),
		apoint:document.getElementById("apoint")
	})

});