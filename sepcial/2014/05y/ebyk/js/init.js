/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');

    /**
     *首页滚动相关
     */
    require('./img-scroll');
    var tm;
    $(".list").PicWall({
        Time: tm,
        Auto: true,
        Inerval: 3000
    });
    $(".list ").delegate("li.cur", "mouseenter mouseleave", function(e) {
        if (e.type == "mouseenter") {
            var WH = $(this).width(),
                HT = $(this).height();
            $(this).find('a').removeClass("g-dn").css({
                width: WH + "px",
                height: HT + "px"
            });
        } else if (e.type == "mouseleave") {
            $(this).find('a').addClass("g-dn")
        }
    });
    /**
     *辅助导航的位置
     */
    $(".page-btn").each(function() {
        $(this).css({
            top: ($(window).height() / 2 - $(this).height() / 2) + "px"
        });
    });
    /**
     *tab相关
     */
    var tabs = new require('m/jsM/tab.js');
    tabs($(".tab-nav li"), $(".J-tab"), "mouseover", "action");

    /**
     *资讯翻页
     */
    var len = $(".msg").length,
        num = Math.ceil(len / 3) - 1,
        i = 0;
    $(".ctr-b").bind("click", function() {
        if (i < num) {
            i += 1;
            $(".msg-box").animate({
                marginTop: "+=-537px"
            }, 500);
        } else {
            alert("已经是最后一页了！")
        }

    });
    $(".ctr-t").bind("click", function() {
        if (i != 0) {
            i -= 1;
            $(".msg-box").animate({
                marginTop: "-=-537px"
            }, 500);
        } else {
            alert("已经回到第一页了！")
        }
    });

    /**
    *往期回顾banner相关
    */
    $(".banner li").each(function(){
        var $me=$(this);
        $me.css("background","url("+$me.find('img').attr('src')+") no-repeat center 0");
    });
    $(".nav-content").each(function(){
        var $me=$(this);
        $me.css("background","url("+$me.find('img').attr('src')+") no-repeat right bottom")
    });
    var times,sum=0,len= $(".banner li").length;
    $(".banner-main").hover(function(){
        clearInterval(times);
    },function(){
        times=setInterval(function(){
            sum++;
            if(sum==len)sum=0;
            _scl(sum);
        },5000)
    }).trigger("mouseleave");
    $(".banner-nav").delegate('li','mouseenter',function(){
         sum=$(".banner-nav li").index(this);
        _scl(sum);
    })
    function _scl(i){
        $(".banner-nav li").eq(i).addClass("cur").siblings("li").removeClass("cur");
         $(".banner li").eq(i).fadeIn().siblings("li").hide();
    };
    /**
    * 内容tabs相关
    */
    tabs($(".list-nav li"),$(".items"),"mouseover","cur");

    /**
    * 照片墙hover效果
    */
    $(".pic-show").find('p').each(function(){
        var WH=$(this).siblings('img').width(),HT=$(this).siblings('img').height();
        $(this).parent('a').css({width:(WH+10)+"px",height:(HT+10)+"px"})
        $(this).css({width:WH+"px",height:HT+"px"});
        $(this).siblings("")
    })
});