/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'scroll':'c/fur/js/scroll.js',
		'jqscroll':'./scroll.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('./focusPlay');
	require('jqscroll');

     // 图片滚动
     require('scroll');
	 
	 var Index = {
		// 所有模块的入口函数都是init
		init: function () {
			  $(window).scroll(function() {
        var topscr = $(this).scrollTop();
        //alert(topscr);
        if (topscr < 600) {
            $(".leftnav").addClass("g-dn");
        } else {
            $(".leftnav").removeClass("g-dn");
        }
    });
	
	
$(document).bind("click",function(){$(".imgbox").fadeOut();});
$(".imgbox").bind("click",function(){$(".imgbox").fadeOut();$("#imgscroll2").data({stop:1}); return false});	
 $("#imgscroll2").cscjqscroll();
 $("#imgscroll").cscjqscroll();
 $(".imgbox").css("height",$(window).height());
 $("#imgscroll2").on("click",function(){
 $(".imgcon").find("ul").html($(".scroll-box-first").html()) ;
  $(".imgboxcon").cscjqscroll({ Left: 1600,Right: 800,Auto:false});
	 $(".imgbox").fadeIn();
	return false;
	 });
		}
	}
	module.exports = Index;
	Index.init();
	 /*
    var tm;
    $("#imgscroll").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 3
    });
	*/
    // 图片轮播
    // 
    // csc.foucsPlay("#slide",null,2008);
  
	 
	

	
/*
    $("#imgscroll2").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 3
    });	
	
	
    // 精彩花絮滚动 
    (function () {
        var
          root = $("#imgscroll2"),
          ul = root.find("ul"),
          prev = root.parent().find(".ctr-l"),
          next = root.parent().find(".ctr-r"),
          li = ul.children().first(),
          w = li.width() + 14,
          c_len = ul.children().length,
          count = 0,
          page = Math.ceil(c_len / 4);
        
        ul.css("width", w * c_len);

        for (var i = 0; i < page; i++) {
            $("#scroll-box-first-index").append('<li index="'+ (i + 1) +'"><a href="javascript:;">'+ (i + 1) +'</a></li>')
        }
        $("#scroll-box-first-index").width(page * 50 - 10);
        $("#scroll-box-first-index").children().removeClass('hover').first().addClass('hover');

        prev.click(function (){
          scroll(2);
        });
        next.click(function (){
          scroll(1);
        });

        var timer = null;

        function setTimer () {
          timer = setInterval(function (){
            scroll(1);
          }, 3000);
        }
        setTimer();
        root.parent().hover(function (){
          clearInterval(timer);
        }, function (){
          setTimer();
        });
        
        function scroll ( fx, num ) {
            num = num || 1;
            if ( fx === 1) { // prev
                ul.animate({
                    left: - w * 4 * num
                }, 500, function () {
                    ul.children().slice(0, 4 * num).appendTo( ul );
                    ul.css("left", 0);
                });
                
                count ++;
                if (count === page) {
                    count = 0;
                }
            } else if ( fx === 2) { // next
                var clone = ul.clone();
                clone.appendTo(root);
                clone.css("width", w * c_len);
                clone.css("top", 0);
                clone.css("left", -w * c_len);

                ul.animate({
                    left: w * 4 * num
                }, 500, function () {
                    ul.children().slice(-4 * num).prependTo( ul );
                    ul.css("left", 0);
                });
                clone.animate({
                    left: -w * c_len + w * 4 * num
                }, 500, function () {
                    clone.remove();
                });
                
                count --;
                if (count < 0) {
                    count = page - 1;
                }
            }
            $("#scroll-box-first-index").children().removeClass('hover').eq(count).addClass('hover');
        }

        $("#scroll-box-first-index").children().click(function() {
            var index = $(this).attr("index"),
                cur = count + 1;
            if (cur - index > 0) {
                scroll(2, cur - index);
            } else if ( cur - index < 0 ){
                scroll(1, index - cur);
            } else {
                return false;
            }
            count = index - 1;
            $("#scroll-box-first-index").children().removeClass('hover').eq(count).addClass('hover');
        });
      })();
	  
	  */
	  
	  
});

