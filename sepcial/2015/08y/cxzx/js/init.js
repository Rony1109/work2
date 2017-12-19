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
        'scroll':'c/fur/js/scroll.js'
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
     $("#rtlist li").on("mouseenter",function(){
           $(this).addClass("act").siblings("li").removeClass("act");
           $('#rtcn div:eq('+$(this).index()+')').show().siblings().hide();
        });
     // 图片轮播
     require('scroll');
    var tm;
    $("#imgscroll").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 3
    });
    // 浮动菜单
    $q = $('#qqfloat');
        var fixed_num = parseInt($q.css('top')) || 690;
        $(window).on('scroll', function() {
            var sT = $(this).scrollTop();
            var ua = navigator.userAgent.toLowerCase();
            var check = function(r) {
                return r.test(ua);
            };

            var isOpera = check(/opera/);
            var isIE = !isOpera && check(/msie/);
            var isIE6 = isIE && check(/msie 6/);
            if (isIE6) {
                if (sT > fixed_num) {
                    $q.stop(true).animate({
                        top: $(window).scrollTop()
                    }, 200);

                } else if (sT < fixed_num) {
                    $q.css({
                        top: fixed_num
                    });
                }
                return;
            }
            if (sT > fixed_num && $q.is(':not([style])')) {
                $q.css({
                    position: 'fixed',
                    top: 0
                });
            } else if (sT < fixed_num && $q.is('[style]')) {
                $q.removeAttr('style');
            }
        });
        // 滚动动画        
        $("#scrolllist li").each(function(){
            $(this).find("a").on("click",function(e){
                e.preventDefault();
                var href=$(this).attr("href"),topValue=$(href).offset().top;
                $("html,body").animate({scrollTop:topValue},800);
            });
        });
        //客服弹窗
         $("#mask").fadeIn(function(){
            $("#servpopup").fadeIn();
            $(".close").on("click",function(){
                $("#mask,#servpopup").hide();
            });
        });
});
