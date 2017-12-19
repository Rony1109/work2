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

    var banner = {//焦点图
        move : function(ul,txt,m,h,i,t){//移动图片
            ul.stop(false,true).animate({marginLeft:-(m*i)},t);
            txt.children().first().stop(false,true).animate({marginTop:-(h*i)},t);
        },
        tab : function(ol,cur,i){//切换焦点
            ol.children().siblings().removeClass(cur);
            ol.children().eq(i).addClass(cur);
        },
        auto : function(ul,txt,ol,cur,s,m,h,i,t){//自动执行
            var i = i || 0,v;
            return v = setInterval(function(){if(i >= s){i = 0;}else{banner.move(ul,txt,m,h,i,t);banner.tab(ol,cur,i);i++;}},t*10);
        },
        start : function(div,ul,txt,ol,cur,t){//开始动画
            var div = $(div),ul = $(ul),txt = $(txt),ol = $(ol),cur = cur,t = t || 300,q=0,
                liSize = ul.children().size(),
                liWidth = ul.children().outerWidth(true),
                olHight = txt.children().outerHeight(true),
                auto = banner.auto(ul,txt,ol,cur,liSize,liWidth,olHight,q,t);
            div.hover(function(){clearInterval(auto);},function(){auto = banner.auto(ul,txt,ol,cur,liSize,liWidth,olHight,q,t);});
            ol.children().each(function(i){
                $(this).hover(function(){
                    banner.tab(ol,cur,i);
                    banner.move(ul,txt,liWidth,olHight,i,t);
                },function(){q=i});
            });
        }
    };

    banner.start(".info-banner",".b-bd",".b-txt",".b-cur","cur");//焦点图

});
