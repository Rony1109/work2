/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'scroll':'c/fur/js/scroll.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
     // tab切换
     $.fn.tab=function(){
        var _this=$(this);        
        _this.find(".tabnav a").each(function(i){
            $(this).on("mouseover",function(e){                
                if(i!=3){
                    $(this).addClass("hover").siblings().removeClass("hover");
                }
                else{
                    $(this).siblings().removeClass("hover");
                }
                _this.children("img").eq(i).siblings("img").hide();
                _this.children("img").eq(i).show();
            })
        });
     }
     $(".dpsq1").tab();$(".dpsq2").tab();$(".dpsq3").tab();$(".dpsq4").tab();
     require('scroll');
     var tm;
     $("#imgscroll").CscScroll({
         Left: 1680,
         Right: 820,
         Time: 2000,
         linedUp: tm,
         Auto: false,
         Visual: 1
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
     $(".totop").on("click",function(e){
        e.preventDefault();
        $("html,body").animate({scrollTop:0},800);
     })
});
