$(function(){
	var index ={};
	index.dialog = function(){
		// 弹窗
        var dWidth = ($(document).width() - $(".dialog").width())/2;
        $(".com-title").find("span:last").on("click",function(){
            var $this = $(this),
                dHeight = $this.offset().top-$(window).scrollTop();
            $(".dialog").fadeIn();
            $(".dialog").css({"position":"fixed","left": 0,"top":dHeight});
        });
        $(".close").on("click",function(){
            $(".dialog").fadeOut();
        });
    },
    index.rollBanner = function(){
    // 轮播图	
    var $prev = $(".prev"),
        $next = $(".next");
        var slide = function(rollist,un){
            var $ul = $(rollist).find("ul"),
                $width = ($ul.find("li:first").width());
                if(!$ul.is(":animated")){
                    if(un==1){
                        $ul.animate({
                            left: -$width
                        },500,function(){
                            $ul.css({"left":"0px"}).find("li:first").appendTo($ul);
                        });
                    }else{
                        $ul.css({"left": -$width}).find("li:last").prependTo($ul);
                        $ul.animate({left: 0});
                    }
                }     
            }
        $next.on("click",function(){
            slide(".rollist",1);
        });

        $prev.on("click",function(){
            slide(".rollist",2);
        })

        var timer;
        $('.rollbox').mouseenter(function() {
            clearInterval(timer);
        }).mouseleave(function() {
        var $th = $(this);
            timer = setInterval(function() {
            slide($th, "1");
            }, 3000);
        }).trigger("mouseleave");  
    }

    index.rollBanner();
    index.dialog();
});