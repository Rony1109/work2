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

	 $("#slide").delegate("li","click",function(){
		$("#slideimg").find("img").attr("src",$(this).find("img").attr("src"));
	})
	
		require('./scroll');
	    var tm;
	    $(".img-scroll").CscScroll({
	        Left: 1610,
	        Right: 805,
	        Time: 4000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 1
	    });

	csc.foucsPlay("#src-img2",null,2008);
		var $li = $("#src-img2 ol>li");
		$("#adv-upload").find("li").on("mouseover",function (){
			$li.eq($(this).index()).trigger("mouseover");
		}).on("mouseout",function (){
			$li.eq($(this).index()).trigger("mouseout");
		});

	csc.foucsPlay("#src-img",null,2008);
		var $li = $("#src-img ol>li");
		$("#adv-upload").find("li").on("mouseover",function (){
			$li.eq($(this).index()).trigger("mouseover");
		}).on("mouseout",function (){
			$li.eq($(this).index()).trigger("mouseout");
		});

	
	  $(".tball").click(function(index) {
			var $th = $(this),
			  idx = $th.index();
			if (idx > 0) {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $th.addClass("tlcurone");
			  $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
			} else {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $th.addClass("tlcurone");
			   $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
				}
		  });

	  /*$(".tball").each(function(index){
			$(this).on('click',function(){
				$(".tab-sig").eq(index).show().sliblings(".tab-sig").hide();
			})	
		})*/
	 
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<400){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	


});
