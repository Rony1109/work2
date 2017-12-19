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
        'placeholder': 'm/sea-modules/placeholder.js',
		'comment': 'm/comment/js/init.js',
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
    require('top');
    require('header');
    require('placeholder');
	 var comment = require('comment');
	 
	 comment.init('79b2875d-2fda-4245-a4e7-85f4314ce525',$('#JComment'),{pn:2});

    /*
     * 以下为专题js代码
     * ......
     */
	 $(window).scroll(function(){
		 var topscr = $(this).scrollTop();
		 var fix = $(".fixed");
		 //alert(topscr);
		 if(topscr>=790){
			 fix.fadeIn();
			 }else{
				 fix.fadeOut();
				 }
		 });
		 
		 // 进步销售密码 js
	   function changeImg(){
		   var items = document.getElementById("li-item");
		   var links =items.getElementsByTagName("a");
		   //alert(links.length);
		   for(var i=0; i< links.length; i++){
			   links[i].onclick = function(){
				   return showImg(this);
				   }
			   }
		   }
		   function showImg(pic){
			   var hrefs = pic.getAttribute("href");
			   var oImg = document.getElementById("imgbox");
			   oImg.setAttribute("src",hrefs);
			   if(pic.getAttribute("title")){
				   var oSrc = pic.getAttribute("name");
				   var text = pic.getAttribute("title");
				   }else{
					   var oSrc = "";
					   var text = "";
					   }
			   var oHref = document.getElementById("ohref");
			   oHref.setAttribute("href",oSrc); 	   	   
			   var oTitle = document.getElementById("tbox");
			   if(oTitle.firstChild.nodeType == 3){
				   oTitle.firstChild.nodeValue = text;
				   }
				   return false;
			   }
              window.onload = changeImg();


});
