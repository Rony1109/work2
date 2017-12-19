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
    require('placeholder');
    $q = $('#fiexd');
    var fixed_num = 300;
    $(window).on('scroll',function(){
        var sT = $(this).scrollTop();
        var ua=navigator.userAgent.toLowerCase();
        var  check = function(r){return r.test(ua);}

        var isOpera = check(/opera/);
        var isIE = !isOpera && check(/msie/);
        var isIE6 = isIE && check(/msie 6/);
        if(isIE6){
          if(sT>fixed_num){
              $q.animate({
                top:$(window).scrollTop()
            },200);

          }else if(sT<fixed_num){
            $q.css({
              top:fixed_num
          });
        }
        return;
    }
    if(sT>fixed_num && $q.is(':not([style])')){
      $q.css({
        position:'fixed',
        top:0
    });
  }else if(sT<fixed_num && $q.is('[style]')){
      $q.removeAttr('style');

  }
});
$(".fashion span").each(function(){
    $(this).css("width",$(this).parent().width()+"px");
   

})
});