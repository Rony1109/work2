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
        'jquery':'l/jquery/1.10.2/jquery.min'
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
     
     //轮播图
     $(function(){
        var arr = [];
        var btns = [];
        var j = 0;
        var time = null;
        var btn = $('.cur').find('span');
        var item = $('.roll-list li');
        var rollBox = $('roll-box');
        item.each(function(){
            arr.push($(this));
        });
        btn.each(function(){
            btns.push($(this));
        });
        function slide(btn,num){
            btn.addClass('hl').siblings().removeClass('hl');
            arr[num].addClass('g-db').siblings().removeClass('g-db'); 
        }

        //鼠标经过按钮时
        
            btn.mouseover(function(){
                var $this = $(this);
                var index = btn.index(this);
                slide($this,index);
                j = index;
            });

            rollBox.mouseover(function(){
                clearInterval(time);
            });
            // 自动播放
            time = setInterval(function(){
                var i = j;
                if(i >= btn.length-1){
                    j = 0;
                }else{
                    j++;
                }
                slide(btns[i],i)
            },4000);
       
        
        
    });
});

