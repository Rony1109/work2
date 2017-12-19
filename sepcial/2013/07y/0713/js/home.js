$(function(){
	$(".course-all li").hover(function(){
			$(".course-all li").removeClass("cur");
			$(this).addClass("cur");
	});
	
	/*首页banner*/
	var ss=false;
	var rTim;
	$('.banner').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 if(!ss){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo();
				} ,2000);
			}
	 }).trigger("mouseleave");
	var tieftwo=function(){
		var self=$(".banner .bn-img"),lih =self.siblings("ul.bn-info").children(".cur"),seidx=lih.index();
		if((seidx+1)==3){
			ss=false;
			self.children("li").removeClass("cur").first().addClass("cur");
			self.siblings("ul.bn-info").find("li").removeClass("cur").first().addClass("cur");
		}else{
			ss=false;
			self.children("li.cur").removeClass("cur").next().addClass("cur");
			self.siblings("ul.bn-info").children(".cur").removeClass("cur").next().addClass("cur");
		}
	}
	$('.banner .bn-info li').hover(function(){
		$('.banner .bn-info li,.banner .bn-img li').removeClass("cur");	
		$(this).addClass("cur");
		$(".banner .bn-img li:eq("+$(this).index()+")").addClass("cur");
	});
	
	var s=false;
	var rTi;
	$('.contwo').hover(function(){
			 clearInterval(rTi);
			 s=false;
		 },function(){
			 if(!s){
				 s=true;
				 rTi = setInterval(function(){
					tief();
				} ,2000);
			}
	 }).trigger("mouseleave");
	var tief=function(){
		var self=$(".contwo"),lih=$(".contwo ul.show").index();
		//alert(lih); return;
		if(lih==3){
			s=false;
			self.children("ul.show").removeClass("show").siblings("ul:eq(0)").addClass("show");
			$(".contwo .soll").children("a.cur").removeClass("cur").siblings("a:eq(0)").addClass("cur");
		}else{
			s=false;
			self.children("ul.show").removeClass("show").next().addClass("show");
			$(".contwo .soll").children("a.cur").removeClass("cur").next().addClass("cur");
		}
	}
	$('.contwo .soll a').hover(function(){
		$('.contwo .dt04').removeClass("show");
		$('.contwo .soll a').removeClass("cur");	
		$(this).addClass("cur");
		$(".contwo .dt04:eq("+$(this).index()+")").addClass("show");
	});
	
	var h=false;
	var nc;
	$('.hnc-ban').hover(function(){
			 clearInterval(nc);
			 h=false;
		 },function(){
			 if(!h){
				 h=true;
				 nc = setInterval(function(){
					tie();
				} ,2000);
			}
	 }).trigger("mouseleave");
	var tie=function(){
		var self=$(".hnc-ban"),lih=$(".hnc-ban ul:eq(2)").children(".cur").index();
		// return;
		if((lih+1)==6){
			h=false;
			$(".hnc-ban .bn01 li").removeClass("cur").first().addClass("cur");
			$(".hnc-ban .bn02 li").removeClass("cur").first().addClass("cur");
			$(".hnc-ban .bn03 li").removeClass("cur").first().addClass("cur");
		}else{
			h=false;
			self.find("ul li.cur").removeClass("cur").next().addClass("cur");
		}
	}
	$('.hnc-ban .bn03 li').hover(function(){
		$(".hnc-ban").find(".cur").removeClass("cur")	
		$(this).addClass("cur");
		$(".hnc-ban .bn01 li:eq("+$(this).index()+")").addClass("cur");
		$(".hnc-ban .bn02 li:eq("+$(this).index()+")").addClass("cur");
	});
	
	
	
	
});