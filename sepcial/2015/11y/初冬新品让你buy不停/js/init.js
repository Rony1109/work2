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
    //轮播
    var left_right = function(tag, un) {
        var $ul = $(tag).find("ul"),
            $w = $ul.find("li:first").width();
        if (!$ul.is(":animated")) {
            if (un == 1) {
                $ul.animate({
                    left: -$w
                }, 300, function() {
                    $ul.css({
                        left: "0px"
                    }).find("li:first").appendTo($ul);
                });
            } else {
                $ul.css({
                    left: -$w
                }).find("li:last").prependTo($ul);
                $ul.animate({
                    left: 0
                }, 300);
            }
        }
    }
    $(".maitob .scr-lb").click(function() {
        left_right(".scr-allb", "1");
    });

    //右移动
    $(".maitob .scr-rb").click(function() {
        left_right(".scr-allb", "2");
    });

    //轮播
    var timer;
    $('.maitob').mouseenter(function() {
        clearInterval(timer);
    }).mouseleave(function() {
        var $th = $(this);
        timer = setInterval(function() {
            left_right($th, "1");
        }, 3000);
    }).trigger("mouseleave");

    $(window).scroll(function() {
        var topscr = $(this).scrollTop();
        //alert(topscr);
        if (topscr < 600) {
            $(".fixed").addClass("g-dn");
        } else {
            $(".fixed").removeClass("g-dn");
        }
    });

    $(".j_1").hover(function() {
        $(this).children().last().removeClass('g-dn');
    }, function() {
        $(this).children().last().addClass('g-dn');
    });
    $(".j_2").hover(function() {
        $(this).find(".j_3").removeClass('g-dn');
    }, function() {
        $(this).find(".j_3").addClass('g-dn');
    });

});
