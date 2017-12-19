/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'jquery':'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    require('jquery');
    /*
     * 以下为专题js代码
     * ......
     */
     //顶部导航nav
     $(function(){
        var nav = $("#nav"),
            navA = nav.find("ul li").find("a"),
            navBox = [];
        nav.css({"position":"fixed","top":0,"z-index":999});
        $(window).scroll(function(){
            var topscr = $(this).scrollTop();
            topscr >=418?nav.fadeIn():nav.fadeOut();
        });
        $(".navbox").each(function(){
            navBox.push($(this).offset().top);
        });
        navA.on("click",function(){
            $index = navA.index(this);
            $("html,body").animate({scrollTop:navBox[$index]-101},500);
            return false;
        });
     });

     //轮播图 
     function bannerImg(a,b,c){
         var tabLi = $(a),
             tabLen = tabLi.length,
             prevBtn = $(b),
             nextBtn = $(c),
             _index = 0,
             _timer = null;
        nextBtn.on("click",function(){
            _index++;
            if(_index > tabLen-1){
                _index = 0;
                }
                changeLi(_index);
            }); 
        prevBtn.on("click",function(){
            _index--;
            if(_index <0){
                _index = tabLen -1;
                }
                changeLi(_index);
            }); 
        function changeLi(_index){
          tabLi.eq(_index).css("display","block");
          tabLi.eq(_index).siblings().css("display","none");
          clearInterval(_timer);
          _timer = setInterval(function(){nextBtn.click()},3000);
          }
          _timer = setInterval(function(){nextBtn.click()},3000);       
         }
        
        bannerImg(".rollist ul li",".leftBtn",".rightBtn"); 
});
