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
  // require('header');
  // require('placeholder');

  /*
   * 以下为专题js代码
   * ......
   */
  $(".c3-lst li").hover(function(){
    $(this).addClass("cur");
  },function(){
    $(this).removeClass("cur");
  });
  (function scroll($scroll, opt) {

    if (!$scroll || $scroll instanceof jQuery == false) {
      return;
    }

    opt = $.extend({
      prev: '.prev',
      next: '.next',
      time: 3000,
      div: 'div',
      speed: 200, //滚动速度
      callback: function() {}
    }, opt || {});

    var speed = Math.max(opt.speed, 200),
      $div = $scroll.find(opt.div),
      $ul = $div.children('ul'),
      $li = $ul.find('li.item'),
      rW = $li.length * $li.outerWidth(true),
      divWidth = $div.width(),
      scrollWidth = opt.scrollWidth || divWidth,
      scroll = '-=' + scrollWidth + 'px',
      timer,
      player = function() {
        if ($ul.is(':animated')) {
          return;
        }
        var mL = parseInt($ul.css('marginLeft'));
        if (scroll == '-=' + scrollWidth + 'px') {
          if ((rW * 3 + mL) < 2 * divWidth) {
            $ul.css('marginLeft', rW + mL);
          }
        } else {
          if ((divWidth + mL) > 0) {
            $ul.css('marginLeft', mL - rW);
          }
        }

        $ul.animate({
          marginLeft: scroll
        }, 600, function() {
          opt.callback($scroll);
        });
        timer = setTimeout(player, opt.time);
      };

    if (rW < divWidth) {
      $scroll.find(opt.prev + ',' + opt.next).remove();
      return;
    }

    var html = $ul.html();
    $ul.append(html + html).css('marginLeft', -rW);
    $scroll.delegate(opt.prev + ',' + opt.next, 'click', function(event) {
      clearTimeout(timer);
      scroll = $(this).is(opt.prev) ? '+=' + scrollWidth + 'px' : '-=' + scrollWidth + 'px';
      player();
    }).delegate('a.detail', 'click', function(event) {
      clearTimeout(timer);

    }).delegate('a.close', 'click', function(event) {

      player();
    });
    //timer = setTimeout(player, 3000);
  }($('div.c4'), {
    div: '.bd',
    scrollWidth: 1020
  }));
  
  
	$('.c4 .detail').bind('click',function(){
		var _layer=$(this).closest('.item').find('.layer');
		_layer.show();
		if(navigator.userAgent.indexOf("MSIE 6.0") > 0){
			_layer.find('.layer-msk').hide();
		}
		if(_layer.is(':visible')){
			_layer.find('.close').bind('click',function(){
				_layer.hide();
				return false;
			});
		}
		return false;
	});
});