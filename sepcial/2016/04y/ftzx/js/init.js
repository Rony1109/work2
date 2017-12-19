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
      $(function(){
        function marquee(a,b,c,d){
            var container = document.getElementById('container');
            var list = document.getElementById(a);
            var prev = document.getElementById(b);
            var next = document.getElementById(c);
            var index = 1;
            var len = d;
            var animated = false;
            var interval = 3000;

            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 258;
                var inteval = 10;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -258 * len + 'px';
                        }
                        if(left<(-258 * len)) {
                            list.style.left = '-258px';
                        }
                        animated = false;
                    }
                }
                go();
            }

            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == d) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-258);
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = d;
                }
                else {
                    index -= 1;
                }
                animate(258);
            }
          }
          marquee("list","prev","next",7);
          marquee("lists","arrowl","arrowr",15);
        });

      //顶部导航
      $(function(){
         var nav = $("#nav");
         var arr = [];
         var navA = nav.find("ul>li>a");
         $(window).scroll(function(){
            var topscr = $(this).scrollTop();
            nav.css({'position':'fixed','top':0,'z-index':99})
            topscr >= 517?nav.fadeIn():nav.fadeOut();
         });
         $(".navbox").each(function(){
            arr.push($(this).offset().top);
         });
         navA.on("click",function(){
            var $index = navA.index(this);
            $("html,body").animate({scrollTop:arr[$index]-60},500);
            return false;   
            });
      });
});
