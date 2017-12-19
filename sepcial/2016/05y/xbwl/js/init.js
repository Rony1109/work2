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
            var index = 6;
            var len = d;
            var animated = false;
            var interval = 3000;

            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 279;
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
                            list.style.left = -279 * len + 'px';
                        }
                        if(left<(-279 * len)) {
                            list.style.left = '-279px';
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
                animate(-279);
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
                animate(279);
            }
          }
          marquee("list","prev","next",6);
        });
});
