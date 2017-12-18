define(function(require, exports, module) {
  var template = require('./template');
  var page = require('./page');
  var activeMarker;
  var markers = [];
  var hasLngLat = false;
  template.$bd.delegate('ol.search-result li:not(.active)', 'mouseenter', function(event) {
    var $t = $(this);
    if ($t.data('lnglat') === true) {
      AMap.event.trigger(markers[$t.index()], 'mouseover');
    } else {
      $t.addClass('hover');
    }
  }).delegate('ol.search-result li:not(.active)', 'mouseleave', function(event) {
    var $t = $(this);
    if ($t.data('lnglat') === true) {
      AMap.event.trigger(markers[$t.index()], 'mouseout');
    } else {
      $t.removeClass('hover');
    }
  }).delegate('ol.search-result li', 'click', function(event) {
    event.preventDefault();
    var $t = $(this);
    if ($t.data('lnglat') === true) {
      AMap.event.trigger(markers[$t.index()], 'click');
    } else {
      $t.addClass('active').siblings('.active').removeClass('active');
    }
  });
  module.exports = function(params, AMap, mapData) {
    var $q = $('form').find('[name="q"]');
    $q.val() == params['q'] || $q.val(params['q']);
    var q = params['q'];

    function mark(str) {
      return str.replace(new RegExp('(' + q + ')', 'gi'), '<strong>$1</strong>');
    }
    $.get('//market.csc86.com/shop/search', params, function(data) {
      if (lastAction != params['action']) return;
      var html = '<div class="content-bd g-ffy content-search">';
      if (data['status'] && data['data']['totalRows'] > 0) {
        data = data['data'];
        html += template.headCount(data['totalRows']) + '<div class="left-scroll items-list"><ol class="search-result">';
        var list = data['list'];

        for (var i = 0; i < list.length; i++) {

          // if (!list[i]['lng']) {
          //   alert('数据错误：' + list[i]['name'] + '坐标信息为空！');
          //   location.hash = '#!';
          //   return;
          // }

          hasLngLat = /^\d+(\.\d+)?$/.test(list[i]['lat']);
          if (hasLngLat) {
            // list[i]['lng'] = parseFloat(list[i]['lng']) - Math.random() * 0.01;
            // list[i]['lat'] = parseFloat(list[i]['lat']) + Math.random() * 0.01;
            markers[i] = new AMap.Marker({
              icon: new AMap.Icon({
                size: new AMap.Size(30, 37),
                image: "//res.csc86.com/v2/c/market/css/img/poi.png",
                imageOffset: new AMap.Pixel(2 - (i * 50), -42)
              }),
              map: cscMap,
              position: new AMap.LngLat(list[i]['lng'], list[i]['lat']),
              extData: {
                num: i
              },
              zIndex: 1
            });
            AMap.event.addListener(markers[i], 'mouseover', function(e) {
              if (activeMarker == this) return;
              var d = this.getExtData();
              this.setIcon(new AMap.Icon({ //复杂图标
                size: new AMap.Size(30, 37), //图标大小
                image: "//res.csc86.com/v2/c/market/css/img/poi.png",
                imageOffset: new AMap.Pixel(0 - (50 * d.num), -100)
              }));
              this.setzIndex(3);

              template.$bd.find('li:eq(' + d.num + ')').addClass('hover');
            });
            AMap.event.addListener(markers[i], 'mouseout', function(e) {
              if (activeMarker == this) return;
              var d = this.getExtData();
              this.setIcon(new AMap.Icon({ //复杂图标
                size: new AMap.Size(30, 37), //图标大小
                image: "//res.csc86.com/v2/c/market/css/img/poi.png",
                imageOffset: new AMap.Pixel(2 - (50 * d.num), -42)
              }));
              this.setzIndex(1);

              template.$bd.find('li:eq(' + d.num + ')').removeClass('hover');
            });
            // AMap.event.addListener(markers[i], 'mousemove', function(e) {
            //   console.log(this, e);
            // });
            AMap.event.addListener(markers[i], 'click', function(e) {
              if (activeMarker == this) return;
              var prevMarker = activeMarker;
              activeMarker = this;
              this.setzIndex(2);
              cscMap.setCenter(this.getPosition());
              prevMarker && AMap.event.trigger(prevMarker, 'mouseout');

              template.$bd.find('li:eq(' + d.num + ')').addClass('active').siblings('.active').removeClass('active');
            });
          }
          html += '<li data-lnglat="' + hasLngLat + '">' + (hasLngLat ? '<div class="item-ico item-ico-' + (1 + i) + '"></div>' : '') + '<div class="search-item"><a href="javascript:">' + mark(list[i]['name'] || '') + '</a><p>经营范围：' + (list[i]['mainIndustry'] || '') + '</p></div></li>';
        }
        cscMap.setFitView();
        html += '</ol>';
        html += page(params['start'] || 0, data['totalRows'], data);
        html += '</div>';
      } else {
        html += template.headCount() + template.empty();
      }
      template.$bd.html(html + '</div>');
      template.itemScroll();
    }, 'jsonp');
  };
});