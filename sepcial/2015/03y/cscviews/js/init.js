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
    var menu = $("#menu"),list = menu.find('li'),conlf = $('.con_lf'),conrg = $('.con_rg');
    list.on('click',function(){
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur")
    });

    var offTop1 = $("#pg1").offset().top,
        offTop2 = $("#pg2").offset().top,
        offTop3 = $("#pg3").offset().top,
        offTop4 = $("#pg4").offset().top,
        offTop5 = $("#pg5").offset().top,
        conTop= $('.con_lf').offset().top,
        conlfLef =conlf.offset().left,
        fixTop = $('.fix_menu').offset().top,
        fixLeft = $('.fix_menu').offset().left;

    $(window).on("scroll",function(){
        var top = $(document).scrollTop();
        if(top>=conTop){
            conlf.addClass("fixed");
            conlf.css("left",conlfLef);
            conrg.css("margin-left","190px");
        }else{
            conlf.removeClass("fixed");
            conrg.css("margin-left","0");
        }
        if(top>=fixTop){
           $('.fix_menu').css({"position":'fixed',"left":fixLeft+"px","top":"10px"}); 
        }else{
             $('.fix_menu').css({"position":"absolute","top":55+"px","right":"-90px","left":"auto"})
        }
        if(top<offTop2){
            list.removeClass("cur");
            list.eq(0).addClass("cur")
        }else if(top>=offTop2 && top<offTop3){
            list.removeClass("cur");
            list.eq(1).addClass("cur")
        }else if(top>=offTop3 && top<offTop4){
            list.removeClass("cur");
            list.eq(2).addClass("cur")          
        }else if(top>=offTop4 && top<offTop5){
             list.removeClass("cur");
            list.eq(3).addClass("cur")               
        }else if(top>=offTop5){
             list.removeClass("cur");
            list.eq(4).addClass("cur")  
        }

    })
    /*
     * 以下为专题js代码
     * ......
     */

});
