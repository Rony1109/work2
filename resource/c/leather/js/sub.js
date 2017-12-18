/**
 * 皮革栏目页
 *
 */

define(function(require, exports, module) {
    //资讯图片hover
    $(".zx-picshow li a").each(function(){
        var $t = $(this),
            w = $t.width() - 6, //左右3pxborder
            h2 = $t.find("span").height(),
            h = $t.height() - h2 - 3; //上3pxborder
        $t.prepend($('<em class="g-dib"/>').width(w).height(h));
        $t.hover(function(){
            $t.find("em").show();
        },function(){
            $t.find("em").hide();
        });
    });
    var pg_hover = require("hover");
    pg_hover(".zx-activi a.rec","rec-cur");
    pg_hover(".zx-s5box .rec","rec-cur");
    pg_hover(".sc-zysc li","hover");
    pg_hover(".sc-yzsj li","hover");
    pg_hover(".zx-zysc li","hover");
    pg_hover(".zh-merchant li","hover");

    //展会
    var $exhibitionNav = $(".zh-nav");
    if($exhibitionNav.length){
        var exH = $exhibitionNav.offset().top,
            eH = $("#activity").offset().top -80;
        function checkExH(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop > exH){
                $exhibitionNav.addClass("ex-h");
            }else{
                $exhibitionNav.removeClass("ex-h");
            }
            if (scrollTop >= eH){
                $exhibitionNav.find("li").eq(1).addClass("cur").siblings().removeClass("cur");
            }else{
                $exhibitionNav.find("li").eq(0).addClass("cur").siblings().removeClass("cur");
            }
        }
        $(window).scroll(function(){
            checkExH();
        });
        $(".zh-nav li").bind("click",function(){
            var $t = $(this), href = $t.data("href"),top = $("#"+href).offset().top;
            $("html,body").animate({scrollTop:top});
        });
    }

    if($('#exhibitionFlag').length){
        var calendar = require('./getDay');
        var ph = require('placeholder');
        ph.placeholder('input[placeholder]');
        // 展会排期去掉月份前的字符0
        $('div.J_Date').find('span').each(function(){
            if($(this).html().charAt(0) == "0") {
                $(this).html($(this).html().slice(1));
            }
        });
        $('div.J_Date').delegate('span','click',function(){
            $(this).addClass('cur').siblings('span').removeClass('cur');
            var date = $(this).attr('date').split('-');
            calendar.init({year:date[0],month:date[1]},'pige');
        }).find('span:first').trigger('click');
    }

    if($(".details").length){
        $("body").prepend('<link href="//res.csc86.com/v2/c/leather/css/print.css" rel="stylesheet" type="text/css"  media="print" >');
    }

    //时间
    require('l/My97DatePicker/4.8/buyoffer_WdatePicker');
});