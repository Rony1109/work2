/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  //顶部登录状态
  $.get('//api.csc86.com/notify/count/all/', function(data) {
    if (data.status) {
      $('div.top-sign-info').html('进入<a href="//www.csc86.com/" rel="nofollow">华南城网</a>，让世界看见你！ <a href="//member.csc86.com/" target="_blank" id="J_signEd" rel="nofollow">' + data.data.username + '</a>！消息<a href="//member.csc86.com/membercenter/messageall/" target="_blank" class="top-msg-num" rel="nofollow">' + data.data.message + '</a><span class="v-line">|</span><a href="//member.csc86.com/login/logout" rel="nofollow">退出</a><span class="v-line">|</span>');
    }
  }, 'jsonp');

  $(document).delegate('a[href*="login.csc86.com"],a[href*="/login/phone"]', 'click', function() {
    $(this).attr('href', '//login.csc86.com/?done=' + encodeURIComponent(location.href));
  });


  // require('http://webapi.amap.com/maps?v=1.3&key=a7763e0cab021d965921a649619d608e&callback=cscMapInit');
  require('l/jquery/jquery.nicescroll.js');
  var template = require('./template');
  var $cscMap = $('#cscMap');
  var $cscContent = $('#cscContent');
  var $contentBd = $('#contentBd');
  var $cscMapBar = $('div.csc-map-bar');
  var $location = $('div.location').find('strong');
  var router = require('./router');
  var mapData = {
    $index: $contentBd.html()
  };
  window.lastAction = 'map-index';

  function loading() {
    $contentBd.find('div.content-loading').length > 0 || $contentBd.prepend('<div class="content-loading"></div>');
  }

  // module.exports = function() {
    var center = new AMap.LngLat(114.127607, 22.677152);
    window.cscMap = new AMap.Map('cscMap', {
      resizeEnable: true,
      center: center,
      level: 16
    });
    var ruler;
    var MGeocoder;
    cscMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.RangingTool', 'AMap.OverView', 'AMap.Geocoder'], function() {
      //加载工具条
      ruler = new AMap.RangingTool(cscMap);
      cscMap.addControl(new AMap.ToolBar({
        offset: new AMap.Pixel(10, 46)
      }));
      cscMap.addControl(new AMap.Scale());
      cscMap.addControl(new AMap.OverView());
      MGeocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      });
      //返回地理编码结果  
      AMap.event.addListener(MGeocoder, "complete", function(data) {
        if (data['info'] == 'OK') {
          var data = data['regeocode']['addressComponent'];
          $location.html(data['province'] + (data['city'] ? ' &gt; ' + data['city'] : ''));
        }
      });
      AMap.event.addListener(ruler, 'end', function(e) {
        ruler.turnOff();
        $cscMapBar.find('a.active').removeClass('active');
      });

      AMap.event.addListener(cscMap, 'moveend', function(e) {
        MGeocoder.getAddress(this.getCenter());
      });

    });


    var $wd = $(window);
    var trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 10
    });

    $cscMapBar.delegate('a.ranging', 'click', function(event) {
      event.preventDefault();
      var $t = $(this);
      if ($t.is('.active')) {
        $t.removeClass('active');
        ruler.trunOff();
      } else {
        $t.addClass('active');
        ruler.turnOn();
      }
    }).delegate('a.traffic', 'click', function(event) {
      event.preventDefault();
      var $t = $(this);
      if ($t.is('.traffic-active')) {
        trafficLayer.setMap(null);
        $t.removeClass('traffic-active');
      } else {
        trafficLayer.setMap(cscMap);
        $t.addClass('traffic-active');
      }
    }).delegate('a.full', 'click', function(event) {
      event.preventDefault();
      var $t = $(this);
      var $body = $('body');
      var $scroll = $('.nicescroll-rails:first');
      if ($body.is('.full')) {
        $body.removeClass('full');
        $t.text('全屏').removeClass('full-active');
        if ($scroll.is('.s-hide')) {
          $scroll.show();
        }
      } else {
        $body.addClass('full');
        $t.text('退出全屏').addClass('full-active');
        if ($scroll.is('.s-hide') || $scroll.is(':visible')) {
          $scroll.addClass('s-hide').hide();
        }
      }
      $wd.trigger('resize');
    });


    $cscContent.delegate('a.content-close', 'click', function(event) {
      event.preventDefault();
      var $scroll = $('.nicescroll-rails:first');
      if ($cscContent.is('.csc-content-hide')) {
        $cscContent.removeClass('csc-content-hide');
        if ($scroll.is('.s-hide')) {
          $scroll.show();
        }
      } else {
        $cscContent.addClass('csc-content-hide');
        if ($scroll.is('.s-hide') || $scroll.is(':visible')) {
          $scroll.addClass('s-hide').hide();
        }
      }
    });

    $wd.bind('resize', function(event) {
      var bH = !$('body').is('.full') ? $(this).height() - 101 : $(this).height();
      if (bH != $cscContent.height()) {
        $cscContent.height(bH);
        $contentBd.height(bH);
        $cscMap.height(bH);
      }
    }).trigger('resize');

    function useRoter() {
      $wd.bind('hashchange', function(event) {
        loading();
        router(location.hash, AMap, mapData);
      });
    }

    if (/MSIE.(7|6)\.0/.test(navigator.userAgent)) {
      require.async('l/jquery/jquery.ba-hashchange.js', function() {
        useRoter();
        if (location.hash != '') $wd.trigger('hashchange');
      });
    } else {
      useRoter();
      if (location.hash != '') $wd.trigger('hashchange');
    }

    $('form[action="search"]').bind('submit', function(event) {
      event.preventDefault();
      var $t = $(this),
        $q = $t.find('[name="q"]'),
        q = $.trim($q.val());
      if (q == '') {
        $q.trigger('focus');
        return;
      }
      location.hash = '!action=' + $t.attr('action') + '&q=' + encodeURIComponent(q);
    });

    template.itemScroll();
  // };
  window.onerror = function(){
    return true;
  };
});