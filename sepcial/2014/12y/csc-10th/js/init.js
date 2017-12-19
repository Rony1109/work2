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

    /*
     * 以下为专题js代码
     * ......
     */
	$(".n").click(function(){
			$(this).addClass("cur").siblings("li").removeClass("cur");
		})
	
	/*$("#slide").delegate("li","click",function(){
		  $(this).addClass("selected").siblings("li").removeClass("selected");
		  $("#slideimg").find("img").attr("src",$(this).find("img").attr("src"));
		})*/
		
	$("#imglist").delegate("li","click",function(){
		  $(this).addClass("scur").siblings("li").removeClass("scur");
		  $("#imgshow").find("img").attr("src",$(this).find("img").attr("src"));
		})
	
	$("#slide").find("li").each(function(index){
				$(this).on("click",function(){
						 $(this).addClass("selected").siblings("li").removeClass("selected");
						  $("#slideimg").find("img").attr("src",$(this).find("img").attr("src"));
						var html=$(this).find("p").html();
						//console.log(index);
						$("#slideimg").find("p").html(html);
					})
		})
		
	//幻灯
	require('./scroll');
	var tm;
	$(".img-scroll").CscScroll({
		Left: 456,
		Right: 228,
		Time: 3000,
		linedUp: tm,
		Auto: true,
		Visual: 4
	});
	
	$(".h1").mouseover(function(){
		  $(".n1").show();
		});
	$(".h2").mouseover(function(){
		  $(".n2").show();
		});
	$(".h3").mouseover(function(){
		  $(".n3").show();
		});
	$(".h4").mouseover(function(){
		  $(".n4").show();
		});
	$(".h5").mouseover(function(){
		  $(".n5").show();
		});
	$(".h6").mouseover(function(){
		  $(".n6").show();
		});
	$(".h1").mouseout(function(){
	  $(".n1").hide();
	});
	$(".h2").mouseout(function(){
	  $(".n2").hide();
	});
	$(".h3").mouseout(function(){
	  $(".n3").hide();
	});
	$(".h4").mouseout(function(){
	  $(".n4").hide();
	});
	$(".h5").mouseout(function(){
	  $(".n5").hide();
	});
	$(".h6").mouseout(function(){
	  $(".n6").hide();
	});
	
	
	
});
