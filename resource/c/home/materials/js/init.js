/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  require('m/newtopnav/js/init');
  require('m/newsearch/js/init');
  require('m/back-top/js/init');

  if (/MSIE.6/.test(navigator.userAgent)) {
    $('.cate-nav-bd').on('mouseenter', '.th1', function() {
      $(this).addClass('active');
    }).on('mouseleave', '.th1', function() {
      $(this).removeClass('active');
    });
  }

  (function() {
    var $focusNext = $('.focus-next');
    var $focusUl = $focusNext.find('ul');
    var $focusLi = $focusUl.find('li');
    var itemWidth = $focusLi.outerWidth(true);
    var width = itemWidth * $focusLi.length;
    var onceWidth = itemWidth * 5;
    if ($focusLi.length > 5) {
      $focusNext.find('a.prev').addClass('dis-prev');
      $focusNext.on('click', 'a.prev:not(.dis-prev)', function(event) {
        event.preventDefault();
        if ($focusUl.is(':animated')) return;
        var mL = parseInt($focusUl.css('marginLeft'), 10);
        if ((mL + onceWidth) < 0) {
          $focusUl.animate({
            marginLeft: '+=' + onceWidth
          }, function() {
            $focusNext.find('a.next').removeClass('dis-next');
            if (parseInt($focusUl.css('marginLeft'), 10) === 0) {
              $focusNext.find('a.prev').addClass('dis-prev');
            }
          });
        } else {
          $focusUl.animate({
            marginLeft: '+=' + (0 - mL)
          }, function() {
            $focusNext.find('a.prev').addClass('dis-prev');
            $focusNext.find('a.next').removeClass('dis-next');
          });
        }
      }).on('click', 'a.next:not(.dis-next)', function(event) {
        event.preventDefault();
        if ($focusUl.is(':animated')) return;
        var mL = parseInt($focusUl.css('marginLeft'), 10);
        var mW = width + mL - onceWidth;
        if (mW > onceWidth) {
          $focusUl.animate({
            marginLeft: '-=' + onceWidth
          }, function() {
            $focusNext.find('a.prev').removeClass('dis-prev');
            if (onceWidth - parseInt($focusUl.css('marginLeft'), 10) === width) {
              $focusNext.find('a.next').addClass('dis-next');
            }
          });
        } else {
          $focusUl.animate({
            marginLeft: '-=' + mW
          }, function() {
            $focusNext.find('a.prev').removeClass('dis-prev');
            $focusNext.find('a.next').addClass('dis-next');
          });
        }
      });
    } else {
      $focusNext.find('a.prev,a.next').remove();
    }
  }());

  $('.company-rec').on('click', '.item:not(.active) .i-w', function(event) {
    event.preventDefault();
    var $t = $(this).parents('li.item');
    if ($t.siblings().is(':animated')) return;
    var $active = $t.siblings('.active');
    $active.animate({
      width: 180
    });
    $t.animate({
      width: 460
    }, function() {
      $active.removeClass('active');
      $t.addClass('active');
    });
  });

  $('.g-back').addCss().goBack();


  (function() {
    var sTimer = null;
    var rTimer = null;
    var $this = $('.floor-nav');
    var ie6 = /MSIE.6/.test(navigator.userAgent);
    var $window = $(window);
    var $document = $(document);
    var num = parseInt($this.css('bottom'), 10);
    var maxTop = $document.height() - $this.height() - num;
    var $f1 = $('#floor1');
    var f1Top = $f1.offset().top;
    var f1H = $f1.outerHeight(true);
    $window.on({
      scroll: function() {
        var Ht = $window.height() - $this.height() - num;
        var Tpr = $document.scrollTop();
        var floorNum = ((Tpr + f1H * 2 - 50) - f1Top) / f1H;
        $this.find('li.active').removeClass('active');
        if (floorNum > 0 && floorNum < 8) {
          floorNum = parseInt(floorNum, 10) || 1;
          $this.find('li:eq(' + (floorNum - 1) + ')').addClass('active');
        }
        if (sTimer) {
          clearTimeout(sTimer);
        }
        if (ie6) {
          sTimer = setTimeout(function() {
            $this.stop(true).animate({
              'top': Math.min(maxTop, Tpr + Ht)
            }, 'fast');
          }, 100);
        }
      },
      resize: function() {
        var winWh = $window.width();
        var $domWidth = $this.parent().width();
        var domMr = (winWh - $domWidth) / 2 - $this.width() - 12;
        if (rTimer) {
          clearTimeout(rTimer);
        }
        rTimer = setTimeout(function() {
          $this.css({
            'right': domMr > -1 ? 'auto' : 0,
            'marginLeft': domMr > -1 ? $domWidth + 12 : 'auto'
          });
          $window.trigger('scroll');
        }, 100);
      }
    }).trigger('resize');
  }());

});