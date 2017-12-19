/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    $(window).scroll(function(){
        var top=$(this).scrollTop(),
            flrTop1=$("#flr1").offset().top;
            $aside=$("#aside");
        if(top>=flrTop1){
            $aside.slideDown();
        }else{
            $aside.slideUp();
        }
    });
    /*
     * 以下为专题js代码
     * ......
     */

});
