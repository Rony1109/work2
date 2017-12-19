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
    require('jquery')

    /*
     * 以下为专题js代码
     * ......
     */

    //兑换详情
    $(function(){
        
        var mHover = $('.m-hover');
        mHover.hover(function(){
            var $this = $(this);
            var mCon = '<div class="mask g-dn"><div class="m-position">\
                      <span class="service-icon m-s1"></span>\
                      <span class="m-s2">兑换详情请联系客服</span></div>\
                    </div>';
            $this.append(mCon);        
            var mask = $this.find('.mask'),
                mPos = mask.find('.m-position'),
                eWidth = $this.outerWidth(),
                eHeight = $this.outerHeight();          
            mask.css({"width": eWidth,"height": eHeight});
            mask.fadeIn(300);
            
        },function(){
            var mask = mHover.find('.mask');
            mask.remove();
        })

    }); 
});
