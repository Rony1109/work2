$(function(){
	$(".p-01 li").hover(function(){
		$(this).children(".bg-img").css("display","none");						 
		$(this).children(".inf").css("display","block");						 
	},function(){
		$(this).children(".bg-img").removeAttr("style");			 
		$(this).children(".inf").removeAttr("style");
	});
	$(".loall li").hover(function(){
		$(this).children(".ig01").css("display","none");						 
		$(this).children(".ig02").css("display","block");						 
	},function(){
		$(this).children(".ig01").removeAttr("style");			 
		$(this).children(".ig02").removeAttr("style");
	});
	$(".nav li").hover(function(){
		$(".nav li,.nav-sig li").removeClass("cur");
		$(this).addClass("cur");
		$(".nav-sig li:eq("+$(this).index()+")").addClass("cur");					 
	});
	$(".service li").hover(function(){
		$(".service li,.service-sig li").removeClass("cur");
		$(this).addClass("cur");
		$(".service-sig li:eq("+$(this).index()+")").addClass("cur");					 
	});
	$(".sev").hover(function(){},function(){$(".service li,.service-sig li").removeAttr("class");});
	
	$(".illustration .title span a").hover(function(){
		$(".it-sig").removeClass("show");
		$(".it-sig:eq("+$(this).index()+")").addClass("show");					 
	});
	
	
	var ss=false;
	var rTim;
	$('.bn-list').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 $t2=$(this);
			 var show=$(this).parent().hasClass("show")?true:false;
			 if(!ss&&show){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo();
				} ,2000);
			}
	 }).trigger("mouseleave");
	
	var tieftwo=function(){
		var self=$(".show").children(".bn-list"),lih =self.siblings("ul.bn").children(".cur"),ind=self.siblings("ul.bn").children("li").length,seidx=lih.index();
		if((seidx+1)==ind){
			ss=false;
			self.children("a").removeClass("cur").first().addClass("cur");
			self.siblings("ul.bn").find("li").removeClass("cur").first().addClass("cur");
		}else{
			ss=false;
			self.children("a.cur").removeClass("cur").next().addClass("cur");
			self.siblings("ul.bn").children(".cur").removeClass("cur").next().addClass("cur");
		}
	}
	
	
	$('.bn-list a').hover(function(){
		clearInterval(rTim);
		ss=false;
		var ind=$(this).index();
		$('.bn-list a').removeClass("cur");
		$(this).addClass("cur");
		$(this).closest(".it-sig").children(".bn").find("li").removeClass("cur");
		$(this).closest(".it-sig").children(".bn").find("li:eq("+ind+")").addClass("cur");
	},function(){
		var tvi=$(this).closest(".it-sig").find(".bn-list");
		if(!ss){
			 ss=true;
			 rTim = setInterval(function(){
				tieftwo(tvi); 
			} ,2000);
		}
	}).trigger("mouseleave");
	
	//
	var textTimer,iu,AutoScroll = function (obj){
		    var self=obj.find("ul"),lih =self.find("li:first").height();
			self.animate({
					top:-lih
			},500,function(){
				self.css({top:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('.height-r').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 iu=$(this);
			textTimer = setInterval(function(){
				 AutoScroll(iu);
			} ,2000);
	 }).trigger("mouseleave");
	
});