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
     //顶部导航
     /*$(function(){
        var nav = $("#nav"),navA = $("#nav").find("li a"),arr = [];
        $(window).scroll(function(){//控制导航条显示
            var topscr = $(this).scrollTop();
            topscr>=669?nav.addClass("navp"):nav.removeClass("navp");
        });

        $(".navbox").each(function(){
            arr.push($(this).offset().top);
        });
        navA.on("click",function(){
            var _index = navA.index(this);
            $("html,body").animate({scrollTop:arr[_index]-85},500);
            return false;
        })
     });*/

     //查看更多
     $(function(){
        function slide(a,b){
        var morelist = $(a),morebtn = $(b);
        morebtn.hover(function(){
            $(".morex").addClass("morexhover");
        },function(){
            $(".morex").removeClass("morexhover");
        });
        morebtn.bind("click",function(){
            if(morebtn.text() == '[点击查看更多+]'){
                 morelist.slideDown(1000,function(){
                   morebtn.html('[点击收起更多-]');
                });
            }else{
                  morelist.slideUp(1000,function(){
                    morebtn.html('[点击查看更多+]');
                });
            }
        });
    }
     slide("#morelist","#morebtn");
     slide("#morelists","#morebtns");
     slide("#morelistss","#morebtnss");
     slide("#morelistsss","#morebtnsss")
     });
});
