$(function(){
    slideing(".slide");

    //活动轮播
    new csc.slide("#acSlide ul", "#acSlide ul>li", {
        slideWidth : 215,
        slideHeight : 150,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 4000,
        slideButs_bindsj : "click",
        slides_to_l:$(".ac-slide .l"),
        slides_to_r:$(".ac-slide .r")
    });

    //返回顶部
    var $gotop = $(".gotop"),$window = $(window);
    $window.scroll(function(){
        if($window.scrollTop() > 300){
            $gotop.fadeIn(300);
        }else{
            $gotop.fadeOut(300);
        }
    });
    $gotop.find(".top").bind("click",function(){
        $("body,html").stop().animate({scrollTop:0},300);
    }).end().find(".btm").bind("click",function(){
        $("body,html").stop().animate({scrollTop:$(".activity").offset().top},300);
    });
});

//个人风采轮播
function slideing(o){
    var $o = $(o),index = 0,l = $o.find("li").length,
        $L = $o.find(".l"),
        $R = $o.find(".r");
    $o.find("a").each(function(){
        var $t = $(this),
            tit = $t.find("img").attr("alt"),
            tmp = '<span class="bg"></span><span class="txt">' + tit + '</span>';
        $t.append(tmp);
    });

    var mar = function(){
        index++;
        if(index > l-1){ index = 0 }
        switching(index);
    };

    play = setInterval(mar,3000);

    $(o).find(".ctrl").on({
        mouseenter:function(){
            clearInterval(play)
        },
        mouseleave:function(){
            play = setInterval(mar,4000);
        }
    });

    $R.bind("click",function(){
        index++;
        if(index > l-1){ index = 0 }
        switching(index);
    });
    $L.bind("click",function(){
        index--;
        if(index < 0 ){ index = l-1 }
        switching(index);
    });

    function switching(n){
        $o.find("li").eq(n).fadeIn(500,function(){
            var $t = $(this);
            $t.find(".bg,.txt").stop().animate({bottom:0},100);
        }).siblings().fadeOut(500,function(){
            var $t = $(this);
            $t.find(".bg,.txt").stop().animate({bottom:-30},100)
        });
    }
}