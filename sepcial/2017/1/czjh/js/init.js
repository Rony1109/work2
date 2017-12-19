/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    alias: {
        'top': 'c2/newcgsc/js/newtop.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    }
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');

    $('.level-tab-list li').hover(function(){
        var $this=$(this);
        var index=$this.index();
        $this.parent().removeClass().addClass('level-tab-list level-tab-list'+index);
        $('.level-c').eq(index).show().siblings('.level-c').hide();
    });

    $('.bank-list li').hover(function(){
        $(this).addClass('li-hover');
    },function(){
        $(this).removeClass('li-hover');
    });
});
