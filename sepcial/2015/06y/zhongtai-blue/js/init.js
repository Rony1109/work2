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

    require.async('./cscSwitch.js',function(){
        //图片轮播
        var $jsSlideBox=$('.jsSlideBox');
		var $bpicBox=$jsSlideBox.find('.bpic-box');
		var $bpicLst=$jsSlideBox.find('.bpic-lst')
        var $bpicLi=$jsSlideBox.find('.bpic-lst li');
		var $spicBox=$jsSlideBox.find('.spic-box');
		var $spicLst=$jsSlideBox.find('.spic-lst');
		var $spicLi=$spicLst.find('li');
        var $slidePrev=$jsSlideBox.find('.JsPrev');
        var $slideNext=$jsSlideBox.find('.JsNext');
		var page=1;
        if($spicLi.length>1){
			$spicLst.cscSwitch($bpicLi,{
				trigger:'li',
				currCls:'cur',
                effect:'scroll',//移动方式，此处为scroll滚动移动\
				speed: .5,
                steps:1,//每次移动1个
                visible:1//默认可见1个
            }).carousel(); 
			
			$spicBox.cscSwitch($spicLi,{
                effect:'scroll',//移动方式，此处为scroll滚动移动
                steps:3,//每次移动1个
                visible:3,//默认可见1个
				nextBtn:$slideNext,
				prevBtn:$slidePrev
			});
        }   
    });

    (function mscroll(id, limit) {
        var $focusNext = $(id);
        var $focusUl = $focusNext.find('ul');
        var $focusLi = $focusUl.find('li');
        var itemWidth = $focusLi.outerWidth(true);
        var width = itemWidth * $focusLi.length;
        var onceWidth = itemWidth * limit;
        if ($focusLi.length > limit) {
            $focusNext.find('a.prev').addClass('dis');
            $focusNext.on('click', 'a.prev:not(.dis)', function(event) {
                event.preventDefault();
                if ($focusUl.is(':animated')) return;
                var mL = parseInt($focusUl.css('marginLeft'), 10);
                if ((mL + onceWidth) < 0) {
                    $focusUl.animate({
                        marginLeft: '+=' + onceWidth
                    }, function() {
                        $focusNext.find('a.next').removeClass('dis');
                        if (parseInt($focusUl.css('marginLeft'), 10) === 0) {
                            $focusNext.find('a.prev').addClass('dis');
                        }
                    });
                } else {
                    $focusUl.animate({
                        marginLeft: '+=' + (0 - mL)
                    }, function() {
                        $focusNext.find('a.prev').addClass('dis');
                        $focusNext.find('a.next').removeClass('dis');
                    });
                }
            }).on('click', 'a.next:not(.dis)', function(event) {
                event.preventDefault();
                if ($focusUl.is(':animated')) return;
                var mL = parseInt($focusUl.css('marginLeft'), 10);
                var mW = width + mL - onceWidth;
                if (mW > onceWidth) {
                    $focusUl.animate({
                        marginLeft: '-=' + onceWidth
                    }, function() {
                        $focusNext.find('a.prev').removeClass('dis');
                        if (onceWidth - parseInt($focusUl.css('marginLeft'), 10) === width) {
                            $focusNext.find('a.next').addClass('dis');
                        }
                    });
                } else {
                    $focusUl.animate({
                        marginLeft: '-=' + mW
                    }, function() {
                        $focusNext.find('a.prev').removeClass('dis');
                        $focusNext.find('a.next').addClass('dis');
                    });
                }
            });
        } else {
            $focusNext.find('a.prev,a.next').remove();
        }
    }('.dfy',4));

});
