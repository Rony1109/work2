define(function(require, exports, module) {
  var template = require('./template');
  var page = require('./page');
  var cookie = require('m/jsM/cookie');
  var activeMarker;
  var markers = [];
  var hasLngLat = false;
  $(document).delegate('a.zan_btn', 'click', function(event) {
    if (cookie.get(encodeURIComponent(location.hash))) {
      alert('请勿重复提交！');
      return false;
    }
    var url = $(this).attr('href');
    $.get(url, function(data) {
      data = data['data'];
      var $zan = $('ul.special-zan');
      if (data['state'] == 1) {
        $zan.find('li.g-fl span').html(data['generalCount']);
        $zan.find('li.g-fr span').html(data['badCount']);
        $zan.find('li.m span').html(data['goodCount']);
        cookie.set(encodeURIComponent(location.hash), true, 1440);
      }
    }, 'jsonp');
    event.preventDefault();
  }).delegate('.J_history', 'click', function(event) {
    $(this).toggleClass('brand-history-cur');
  }).delegate('div.rec[data-lnglat="true"]', 'mouseenter', function(event) {
    var $t = $(this),
      $li = $t.parent(),
      marker = markers[$li.index()][$t.index() - 1];
    AMap.event.trigger(marker, 'mouseover');
  }).delegate('div.rec[data-lnglat="true"]', 'mouseleave', function(event) {
    var $t = $(this),
      $li = $t.parent(),
      marker = markers[$li.index()][$t.index() - 1];
    AMap.event.trigger(marker, 'mouseout');
  }).delegate('div.rec[data-lnglat="true"]', 'click', function(event) {
    var $t = $(this),
      $li = $t.parent(),
      marker = markers[$li.index()][$t.index() - 1];
    cscMap.setCenter(marker.getPosition());
    AMap.event.trigger(marker, 'click');
  });

  function supportShop(data, n) {
    var html = '';
    markers[n] = [];
    for (var i = 0; i < data.length; i++) {
      // data[i]['lng'] = 114.5 - Math.random() * 0.01;
      // data[i]['lat'] = 22.5 + Math.random() * 0.01;
      hasLngLat = /^\d+(\.\d+)?$/.test(data[i]['lat']);
      // if (!data[i]['lng']) {
      //   alert('数据错误：' + data[i]['name'] + '坐标信息为空！');
      //   location.hash = '#!';
      //   return;
      // }
      if (hasLngLat) {
        markers[n][i] = new AMap.Marker({
          icon: new AMap.Icon({
            size: new AMap.Size(30, 37),
            image: "//res.csc86.com/v2/c/market/css/img/poi.png",
            imageOffset: new AMap.Pixel(-498, -42)
          }),
          map: cscMap,
          position: new AMap.LngLat(data[i]['lng'], data[i]['lat'])
        });
        AMap.event.addListener(markers[n][i], 'mouseover', function(e) {
          if (activeMarker == this) return;
          this.setIcon(new AMap.Icon({ //复杂图标
            size: new AMap.Size(30, 37), //图标大小
            image: "//res.csc86.com/v2/c/market/css/img/poi.png",
            imageOffset: new AMap.Pixel(-500, -100)
          }));
          this.setzIndex(3);
        });
        AMap.event.addListener(markers[n][i], 'mouseout', function(e) {
          if (activeMarker == this) return;
          this.setIcon(new AMap.Icon({ //复杂图标
            size: new AMap.Size(30, 37), //图标大小
            image: "//res.csc86.com/v2/c/market/css/img/poi.png",
            imageOffset: new AMap.Pixel(-498, -42)
          }));
          this.setzIndex(1);
        });
        // AMap.event.addListener(markers[n][i], 'mousemove', function(e) {
        //   console.log(this, e);
        // });
        AMap.event.addListener(markers[n][i], 'click', function(e) {
          if (activeMarker == this) return;
          var prevMarker = activeMarker;
          activeMarker = this;
          this.setzIndex(2);
          cscMap.setCenter(this.getPosition());
          prevMarker && AMap.event.trigger(prevMarker, 'mouseout');
        });
      }
      html += '<div class="rec" data-lnglat="' + hasLngLat + '">' + data[i]['name'] + (hasLngLat ? '<div class="item-mark"></div>' : '') + '</div>';
    }
    return html;
  }

  module.exports = function(params, AMap, mapData) {
    if (/\d+/.test(params['view'])) {
      params['id'] = params['view'];
      $.get('//market.csc86.com/special/detail.html', params, function(data) {
        if (lastAction != params['action']) return;
        if (data['status']) {
          template.$bd.find('div.content-loading').remove();
          $dialog = template.dialog();
          template[params['type'] == 1 ? 'nv' : 'brand']($dialog, data);
          template.dialogScroll($dialog);
        } else {
          alert('加载失败，请稍后重试！');
          location.hash = '';
        }
      }, 'jsonp');
      return;
    } else {
      $('div.dialog').remove();
    }

    $.get('//market.csc86.com/special/index.html', params, function(data) {
      if (lastAction != params['action']) return;
      var title = params['type'] == 1 ? '饮食男女' : '品牌风暴';
      var html = '<div class="content-bd g-ffy content-search">';
      if (data['status'] && data['data']['totalRows'] > 0) {
        data = data['data'];
        html += template.headCount(title) + '<div class="left-scroll items-list"><ol class="special-list">';
        var list = data['list'];
        for (var i = 0; i < list.length; i++) {
          html += '<li>' +
            '<div class="g-cf theme">' +
            '<a href="#!action=special&type=' + params['type'] + '&view=' + list[i]['id'] + '"><img src="//img.csc86.com' + list[i]['specialImage'] + '" alt="' + list[i]['theme'] + '" width="100" height="75" class="g-fl" /></a>' +
            '<h3><a href="#!action=special&type=' + params['type'] + '&view=' + list[i]['id'] + '"><span>第' + list[i]['issue'] + '期：</span>' + list[i]['theme'] + '</a></h3>' +
            '<div class="time">' + list[i]['updatetime'].substr(0, 10) + '</div>' +
            '</div>' +
            supportShop(list[i]['supportShopDTOs'], i) +
            '</li>';
        }
        cscMap.setFitView();
        html += '</ol>';
        html += '</div>';
      } else {
        html += template.headCount(title) + template.empty();
      }
      template.$bd.html(html + '</div>');
      template.itemScroll();
    }, 'jsonp');
  };
});