/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'scroll':'c/fur/js/scroll.js',
        'slider':'./slide.js'
        // 'focus':'m/index/focusPlay.js'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('./focusPlay');
    // require('focus');
    require.async('slider',function(){
        $("#swiper").slide({
                slideContainer: $('#swiper a'),
                effect: 'easeOutCirc',
                autoRunTime: 3000,
                slideSpeed: 1000,
                nav: false,
                autoRun: true,
                prevBtn: $('a.prev'),
                nextBtn: $('a.next')
            });
        $(window).resize(function(){
            $("#swiper").slide({
                    slideContainer: $('#swiper a'),
                    effect: 'easeOutCirc',
                    autoRunTime: 3000,
                    slideSpeed: 1000,
                    nav: false,
                    autoRun: true,
                    prevBtn: $('a.prev'),
                    nextBtn: $('a.next')
                });
        });
    })
   
    /*
     * 以下为专题js代码
     * ......
     */
    
     // 图片滚动
     require('scroll');
     var tm;
     $("#imgscroll").CscScroll({
         Left: 460,
         Right: 230,
         Time: 3000,
         linedUp: tm,
         Auto: true,
         Visual: 2
     });
     $("#mask").on("click",function(){
        $(this).fadeOut();
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
     $("#totop a").on("click",function(e){
         e.preventDefault();
         $("html,body").animate({scrollTop:0},800);
     });
     // 图片轮播
     csc.foucsPlay("#focus1","li",4008);
     csc.foucsPlay("#focus2","li",3588);
     csc.foucsPlay("#focus3","li",2408);
     csc.foucsPlay("#focus4","li",4008);
     csc.foucsPlay("#focus5","li",3508);
     csc.foucsPlay("#focus6","li",2408);
     csc.foucsPlay("#focus7","li",4008);



});
function viewImg(t){    
     $("#mask img").prop("src",$(t).prop("src"));
    $("#mask").fadeIn();
}

