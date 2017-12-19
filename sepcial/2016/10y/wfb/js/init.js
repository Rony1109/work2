/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'jquery':'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('jquery');
    /*
     * 以下为专题js代码
     * ......
     */
    var index={
        scrll:function () {
            var arr = [];
            var navbox = $('#navbox');
            var poster = $('.poster');
            var btns = $('.nav-list li:not(.not)');
            var topHeight = poster.outerHeight();

            $('.navtop').each(function(){
                arr.push($(this).offset().top);
            });
            arr[1] -= 200; 

            $(window).scroll(function(){
                var topscr = $(this).scrollTop();
                topscr >= topHeight ? navbox.addClass('navbox'):navbox.removeClass('navbox');
            });
            btns.find('a').on('click',function(){
                var index = btns.find('a').index(this);
                //alert(index);
                $('html,body').animate({scrollTop:arr[index]-60},500);
                return false;
            })

        },
        
        init:function () {
            //导航
            index.scrll();
        }
    };
    index.init();
});
