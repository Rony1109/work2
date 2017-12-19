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

    var arr = [
        {
            n1: "品牌效应1",
            n2: "让企业变强大和高效",
            n3: "眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。去年的双十一火爆程度仍然记忆犹新，当天的成交金额达571亿元。眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。"
        },
        {
            n1: "品牌效应2",
            n2: "让企业变强大和高效",
            n3: "眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。去年的双十一火爆程度仍然记忆犹新，当天的成交金额达571亿元。眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。"
        },
        {
            n1: "品牌效应3",
            n2: "让企业变强大和高效",
            n3: "眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。去年的双十一火爆程度仍然记忆犹新，当天的成交金额达571亿元。眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。"
        },
        {
            n1: "品牌效应4",
            n2: "让企业变强大和高效",
            n3: "眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。去年的双十一火爆程度仍然记忆犹新，当天的成交金额达571亿元。眼看全球狂欢节双十一即将到来，享受一年一度“价格战”的不仅仅是自称“剁手族”的普通消费者们，几乎所有产业链上的电商企业，都想从这块蛋糕中分一杯羹。"
        }
    ];
    
    $("#nn").find('a').hover(function() {
        var index = $("#nn").find('a').index($(this));
        var o = arr[index];
        var href = $(this).attr("href");
        $("#n1").text(o.n1);
        $("#n2").text(o.n2);
        $("#n3").text(o.n3);
        $("#n4").attr("href", href);
    })
});
