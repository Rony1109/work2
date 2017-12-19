define(function(require, exports, module) {

  function formatSrc(src) {
    return /^http/.test(src) ? src : (location.href.replace('index.html', src));
  }


  var shareConfig = {
    // 如果是正常的网页分享，则不要添加。否则会出现未审核应用
    appid: '', // 公共账号ID？
    img_url: formatSrc('image/banner.jpg'),
    link: location.href,
    desc: '华南城 “中国青年 电商创业大赛”',
    title: '小投票 大梦想'
  };

  // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
  document.addEventListener('WeixinJSBridgeReady', function() {
    var WJ = WeixinJSBridge;
    // 发送给好友
    WJ.on('menu:share:appmessage', function() {
      WJ.invoke('sendAppMessage', shareConfig, function(res) {
        // _report('sendAppMessage', res.err_msg);
      });
    });
    // 发送到朋友圈
    WJ.on('menu:share:timeline', function() {
      WJ.invoke('shareTimeline', shareConfig, function(res) {
        // _report('shareTimeline', res.err_msg);
      });
    });

    // 发送到微博
    WJ.on('menu:share:weibo', function() {
      WJ.invoke('shareWeibo', shareConfig, function(res) {
        // _report('shareWeibo', res.err_msg);
      });
    });
  });


  var isLogin = require('http://api.csc86.com/member/isLogin.html?callback=define')['status'];

  var users = require('./users');

  $(function() {

    var $tab = $('.tabs');
    var $tabBd = $('.tab-item');
    var $share = $('.share');
    $(document).delegate('.tabs li:not(.active)', 'click', function() {
      var $t = $(this);
      var $ul = $tabBd.find('ul:eq(' + $t.index() + ')');
      $t.addClass('active').siblings().removeClass('active');
      $ul.addClass('active').siblings().removeClass('active');
      if ($ul.data('cache') != 'all') {
        $loading.text('加载中……');
      }
      $win.trigger('scroll');
    }).delegate('.z', 'click', function() {
      if (isLogin) {
        var $li = $(this).parents('li');
        $.get("http://quan.csc86.com/likeB.html?topicId=" + $li.data('topicid'), function(data) {
          if ("sns_likeTopic_000" == data.code) {
            $li.removeAttr('data-geted');
            getLikeNum();
            alert('恭喜您，投票成功！');
          } else if ("login_fail" == data.code) {
            alert('请登录后投票！');
            location.href = 'http://wslm.csc86.com/user/login.html?done=' + decodeURIComponent(location.href);
          } else if ("sns_likeTopic_001" == data.code) {
            alert("您已经投过票了！");
          } else {
            alert(data.desc);
          }
        }, "jsonp");
      } else {
        alert('请登录后投票！');
        location.href = 'http://wslm.csc86.com/user/login.html?done=' + decodeURIComponent(location.href);
      }
    }).delegate('.s', 'click', function() {
      var $li = $(this).parents('li');
      var $title = $li.find('.t');
      shareConfig = {
        // 如果是正常的网页分享，则不要添加。否则会出现未审核应用
        appid: '', // 公共账号ID？
        img_url: formatSrc($li.find('img').attr('src')),
        link: $title.attr('href'),
        desc: '华南城 “中国青年 电商创业大赛”',
        title: $title.text() + ' 已得' + $li.find('.p').text() + '，请与我一起支持他win华南城·中国青年电商创业大赛'
      };
      $share.show();
    });


    $share.bind('click', function() {
      shareConfig = {
        // 如果是正常的网页分享，则不要添加。否则会出现未审核应用
        appid: '', // 公共账号ID？
        img_url: formatSrc('image/banner.jpg'),
        link: location.href,
        desc: '华南城 “中国青年 电商创业大赛”',
        title: '小投票 大梦想'
      };
      $share.hide();
    });

    function getLikeNum() {
      $('li[data-topicid]:not([data-geted])').each(function() {
        var $t = $(this);
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
          "topicId": $t.data('topicid')
        }, function(data) {
          $t.attr('data-geted', 'true');
          $t.find('.p').html(data.code + '票');
        }, "jsonp");
      });
    }

    function scroll($scroll, opt) {
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
        $ul = $div.find('ul'),
        $li = $ul.find('li'),
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
      });
      timer = setTimeout(player, 3000);
    }
    var $brand = $('.top-brand');

    scroll($brand);
    getLikeNum();
    $brand.hammer().bind('swiperight', function(event) {
      $brand.find('a.prev').trigger('click');
    }).bind('swipeleft', function(event) {
      $brand.find('a.next').trigger('click');
    });

    $('.J_tab').hammer().bind('swiperight', function(event) {
      $tab.find('li.active').next().trigger('click');
    }).bind('swipeleft', function(event) {
      $tab.find('li.active').prev().trigger('click');
    });

    var loading = false, //是否加载中
      page = 1,
      $win = $(window),
      wH = $win.height(),
      $loading = $('.loading');

    $win.bind('scroll', function() {
      var oT = $loading.offset().top - 80;
      var sT = $win.scrollTop();
      if (oT <= (wH + sT) && loading == false) {
        loading = true;
        var $active = $tab.find('li.active');
        var city = $active.index();
        var $ul = $tabBd.find('ul:eq(' + city + ')');
        var cache = $ul.data('cache');
        if ($ul.data('cache') == 'all') return;
        cache = cache || 1;
        var url = (city + 1) + '_' + cache + '.html';
        $.get(url, function(data) {
          $ul.append(data);
          getLikeNum();
          if (cache == $ul.data('page')) {
            $ul.data('cache', 'all');
            $loading.text('没有了');
          } else {
            $ul.data('cache', cache + 1);
            $loading.text('加载中……');
          }
          loading = false;
        });
      }
    }).trigger('scroll');


    var $form = $('form');

    $form.bind('submit', function() {
      var q = $.trim($form.find('input.bg').val());
      if (q == '') {
        alert('请输入选手名字');
        return false;
      }
      if (users[q]) {
        location.href = 'http://mp.weixin.qq.com/s?__biz=MzA5MTQwMTIzMw==&mid=200429107' + users[q];
      } else {
        alert('找不到名为 ' + q + ' 的选手');
      }
      return false;
    });

  });

});