$(function(){
	//var top = $("#fiexd_nav").position().top;
	$(document).scroll(function(){
		var topscr = $(this).scrollTop();
		if(topscr<705){
			$("#fiexd_nav").removeClass("fiexd_nav");	
		}else{
			$("#fiexd_nav").addClass("fiexd_nav");	
		}
	});	
	
	$(".fright .next") .click(function(){
			var leng=	$(".featureUL .cur").nextAll().length;
			var thleft=$(".featureUL").position().left;
			if(leng==0){}else{
				$(".featureUL").animate({left: thleft-220}, 600);
				$(".featureUL li.cur").removeClass("cur").next().addClass("cur");	
			}
		}); 
	$(".fright .prev") .click(function(){
			var leng=	$(".featureUL .cur").prevAll().length;
			var thleft=$(".featureUL").position().left;
			if(leng==0){}else{
				$(".featureUL").animate({left: thleft+220}, 600);
				$(".featureUL li.cur").removeClass("cur").prev().addClass("cur");	
			}
		}); 
	
	$(".fright .next-a") .click(function(){
			var leng=	$(".featureUL-a .cur").nextAll().length;
			var thleft=$(".featureUL-a").position().left;
			if(leng==0){}else{
				$(".featureUL-a").animate({left: thleft-220}, 600);
				$(".featureUL-a li.cur").removeClass("cur").next().addClass("cur");	
			}
		}); 
	$(".fright .prev-a") .click(function(){
			var leng=	$(".featureUL-a .cur").prevAll().length;
			var thleft=$(".featureUL-a").position().left;
			if(leng==0){}else{
				$(".featureUL-a").animate({left: thleft+220}, 600);
				$(".featureUL-a li.cur").removeClass("cur").prev().addClass("cur");	
			}
		}); 
	
	$(".floatTools-gr") .click(function(){
			var leng=	$(".featureUL-b .cur").nextAll().length;
			var thleft=$(".featureUL-b").position().left;
			if(leng==0){}else{
				$(".featureUL-b").animate({left: thleft-62}, 600);
				$(".featureUL-b li.cur").removeClass("cur").next().addClass("cur");	
			}
		}); 
	$(".floatTools-gl") .click(function(){
			var leng=	$(".featureUL-b .cur").prevAll().length;
			var thleft=$(".featureUL-b").position().left;
			if(leng==0){}else{
				$(".featureUL-b").animate({left: thleft+62}, 600);
				$(".featureUL-b li.cur").removeClass("cur").prev().addClass("cur");	
			}
		}); 


	/*$(".m-img,.m-pr05").live("mouseenter",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").css("display","block");
	}).live("mouseleave",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").removeAttr("style"); 
	});*/
});
/* 
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
*/

