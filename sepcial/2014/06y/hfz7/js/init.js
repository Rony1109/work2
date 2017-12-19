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
        'placeholder': 'm/sea-modules/placeholder.js'
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
    $(".sub-nav a").each(function(i) {
        $(this).click(function() {
            $(".sub-nav").attr('class', 'sub-nav nav-active-' + i);
        })
    });
    //图片横向滚动
    require('./scroll');
    var tm;
    $(".img-scroll").CscScroll({
        Left: 476,
        Right: 238,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 4
    });
    //浮动
    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    var fixed_num = 700;
    $(window).scroll(function() {
        setTimeout(function() {
            var sT = $(window).scrollTop();
            if (ie6) {
                if (sT > fixed_num) {
                    $("#fixed").animate({
                        top: sT + "px"
                    });
                } else {
                    $("#fixed").removeAttr('style');
                }
            } else {
                if (sT >= fixed_num) {
                    $("#fixed").css({
                        position: "fixed",
                        top: 0
                    });
                } else if (sT <= fixed_num) {
                    $("#fixed").removeAttr('style');
                }
            }
        }, 400)
    });
    $("#fixed ul li:last").click(function() {
        $(window).scrollTop(0);
        $("#fixed").removeAttr('style');
    });
    if (ie6) {
        $(".fix-list li").hover(function() {
            $(this).find('span:first').show();
        }, function() {
             $(this).find('span:first').hide();
        })
    }
});