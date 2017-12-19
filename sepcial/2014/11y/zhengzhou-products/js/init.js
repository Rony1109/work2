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
    require('./focusPlay');



    /*

     * 以下为专题js代码

     * ......

     */
	 
   $("#left-left li").hover(function() {
        $(this).find("div.shade").show();
    }, function() {
        $(this).find("div.shade").hide();
    });
  
   csc.foucsPlay("#src-img",null,2008);
	var $li = $("#src-img ol>li");
	$("#adv-upload").find("li").on("mouseover",function (){
		$li.eq($(this).index()).trigger("mouseover");
	}).on("mouseout",function (){
		$li.eq($(this).index()).trigger("mouseout");
	});

	 

  	require('./scroll');
	    var tm;
	    $(".img-scroll").CscScroll({
	        Left: 470,
	        Right: 235,
	        Time: 2000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 4
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





var ss=false;

	var rTim;

	$('.bn-list').hover(function(){

			 clearInterval(rTim);

			 ss=false;

		 },function(){

			 $t2=$(this);

			 if(!ss){

				 ss=true;

				 rTim = setInterval(function(){

					tieftwo();

				} ,2000);

			}

	 }).trigger("mouseleave");

	

	var tieftwo=function(){

		var self=$(".it-sig").children(".bn-list"),lih =self.siblings("ul.bn").children(".cur"),ind=self.siblings("ul.bn").children("li").length,seidx=lih.index();

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





	//轮播

	var timer00;

	$('.lcall').mouseenter(function(){

			 clearInterval(timer00);

		 }).mouseleave(function(){

			 var $th=$(this);

			 timer00= setInterval(function(){

				 left_right00($th,"1");

			 },3000);

	 }).trigger("mouseleave");



});

//轮播

var left_right00=function(tag,un){

	var $ul=$(tag).find(".lctop"),

		$w=$ul.find("span:first").height();

	if(!$ul.is(":animated")){

		if(un==1){

			$ul.animate({

				top:-$w

			},300,function(){

				$ul.css({top:"0px"}).find("span:first").appendTo($ul);});

		}else{

			$ul.css({top:-$w}).find("span:last").prependTo($ul);

			$ul.animate({

				left:0

			},300);

		}

	}


}