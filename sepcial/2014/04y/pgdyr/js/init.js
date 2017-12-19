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
        'slide': 'm/jsM/slide.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    //圈子话题
    var comment = require('m/comment/js/init');
    comment.init('a7934b67-18ce-4902-b59c-5b7cfeb08126',$('#JComment'),{pn:3});

    //幻灯片
    var slide = require("slide");
    new slide(".slideInner ul", ".slideInner li", {
        slideWidth : 860,
        slideHeight : 400,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,       
        slides_to_l : ".slideInner .l",
        slides_to_r : ".slideInner .r",
        slides_fun : slide.definedfun
    });

    //投票
    $(".vote .v").each(function(){
        var $t = $(this);
        $t.on("click",function(){
            var $t = $(this);
            console.info($t.is(".voted"))
            if($t.is(".voted")){
                alert("已投票");
            }else{
                var num = parseInt($t.prev("strong").html()) ;
                num++;
                $t.prev("strong").html(num).end().addClass("voted");
            }
        });
    });

    $(".img_list li").each(function(n) {
        $(this).hover(function(){
            $(".B_intro li").eq(n).addClass('cur').siblings().removeClass('cur');
        });
    });
});
