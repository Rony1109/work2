/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'jquery':'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    require('jquery');
    /*
     * 以下为专题js代码
     * ......
     */
     //顶部导航nav
    $(function(){
        var nav = $("#nav"),
            navA = nav.find("ul li").find("a"),
            navBox = [];
        nav.css({"position":"fixed","top":0,"z-index":999});
        $(window).scroll(function(){
            var topscr = $(this).scrollTop();
            topscr >=418?nav.fadeIn():nav.fadeOut();
        });
        $(".navbox").each(function(){
            navBox.push($(this).offset().top);
        });
        navA.on("click",function(){
            $index = navA.index(this);
            $("html,body").animate({scrollTop:navBox[$index]-101},500);
            return false;
        });
     });

    //轮播图
    $(function(){
        var $prev = $(".prev"),
            $next = $(".next");
        var slide = function(rollist,un){
            var $ul = $(rollist).find("ul"),
                $width = ($ul.find("li:first").width());
                if(!$ul.is(":animated")){
                    if(un==1){
                        $ul.animate({
                            left: -$width
                        },300,function(){
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
    });  

    //弹窗
    $(function(){
        // var dHeight = ($(window).height() - $(".dialog").height())/2;
        var dWidth = ($(document).width() - $(".dialog").width())/2;
        $(".com-title").find("span:last").on("click",function(){
            var $this = $(this),
                dHeight = $this.offset().top-$(window).scrollTop();
            $(".dialog").fadeIn();
            $(".dialog").css({"position":"fixed","left": dWidth,"top":dHeight});
        });
        $(".close").on("click",function(){
            $(".dialog").fadeOut();
        });
    });  

    /* $(function(){
        //轮播图
        function bannerImg(a,b,c){
            var tabLi = $(a),
                tabLen = tabLi.length,
                prevBtn = $(b),
                nextBtn = $(c),
                _index = 0,
                _timer = null;
            nextBtn.on("click",function(){
                _index++;
                if(_index > tabLen-1){
                    _index = 0;
                }
                changeLi(_index);
            });
            prevBtn.on("click",function(){
                _index--;
                if(_index <0){
                    _index = tabLen -1;
                }
                changeLi(_index);
            });
            function changeLi(_index){
                tabLi.eq(_index).css("display","block");
                tabLi.eq(_index).siblings().css("display","none");
                clearInterval(_timer);
                _timer = setInterval(function(){nextBtn.click()},5000);
            }
            _timer = setInterval(function(){nextBtn.click()},5000);
        }
        bannerImg(".rollist ul li",".leftBtn",".rightBtn");
    }); */
});
