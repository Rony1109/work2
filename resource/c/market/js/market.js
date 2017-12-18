define(function(require, exports, module) {
  var template = require('./template');
  var page = require('./page');
  var activeMarker;
  var infoWindow;
  var markers = [];
  var hasLngLat = false;
  template.$bd.delegate('ol li', 'mouseenter', function(event) {
    var $t = $(this);
    if ($t.data('lnglat') === true) {
      AMap.event.trigger(markers[$t.index()], 'mouseover');
    } else {
      $t.addClass('hover');
    }
  }).delegate('ol li', 'mouseleave', function(event) {
    var $t = $(this);
    if ($t.data('lnglat') === true) {
      AMap.event.trigger(markers[$t.index()], 'mouseout');
    } else {
      $t.removeClass('hover');
    }
  }).delegate('div.item-ico', 'click', function(event) {
    cscMap.setCenter(markers[$(this).parents('li').index()].getPosition());
  });
  module.exports = function(params, AMap, mapData) {
    if (!infoWindow) {
      infoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        offset: new AMap.Pixel(10, -55)
      });
      $(document).delegate('.info-window-close', 'click', function(event) {
        event.preventDefault();
        var prevMarker = activeMarker;
        activeMarker = null;
        AMap.event.trigger(prevMarker, 'mouseout');
        template.$bd.find('li:eq(' + prevMarker.getExtData().num + ')').removeClass('active');
        infoWindow.close();
      }).delegate('.info-window a.to,.info-window a.from', 'click', function(event) {
        event.preventDefault();
        var $t = $(this),
          $f = $t.parent().next();
        if ($t.is('.active')) return;
        $t.addClass('active').siblings().removeClass('active');
        $f.data('type', $t.is('.to') ? 'to' : 'from');
        $f.find('span').html($t.is('.to') ? '起点' : '终点');
      }).delegate('.info-window a.bus,.info-window a.car', 'click', function(event) {
        event.preventDefault();
        var $t = $(this),
          $f = $t.parent(),
          val = $.trim($f.find('input').val()),
          type = $f.data('type'),
          types = {
            to: '起点',
            from: '终点'
          };

        if (val == '') {
          alert('请输入' + types[type] + '地址');
          return;
        }

        var parms = {
          action: 'traffic',
          type: $t.attr('class'),
          transfer: true
        };

        parms[type] = $f.data('val');
        parms[type == 'to' ? 'from' : 'to'] = val;
        parms[type + 'LngLat'] = infoWindow.getPosition().toString();
        location.hash = '#!' + $.param(parms);

      });
    }
    var html = '<div class="content-bd g-ffy content-search">' + template.headCount('主题市场');

    if (/\d+/.test(params['marketId'])) { //如果是市场详情
      $.get('//market.csc86.com/market/detail.html', params, function(data) {
        if (lastAction != params['action']) return;
        if (data['status']) {
          data = data['data'];
          html += '<div class="left-scroll items-list">';
          var market = data['market'];
          html += '<div class="market-detail">' +
            '<h3>' + market['name'] + '</h3>' +
            '<p>位置：' + market['location'] + '<br />营业时间：' + market['businessBegin'] + '-' + market['businessEnd'] + '<br />电话：' + market['telephone'].join(' ') + '<br />特色：' + market['feature'].join('，') + '<br />介绍：' + market['introduction'] + '</p>' +
            '</div>';
          html += '<ol class="shop-list">';
          var list = data['shop']['list'];
          for (var i = 0; i < list.length; i++) {


            hasLngLat = /^\d+(\.\d+)?$/.test(list[i]['lat']);
            // if (!list[i]['lng']) {
            //   alert('数据错误：' + list[i]['shopName'] + '坐标信息为空！');
            //   location.hash = '#!';
            //   return;
            // }
            if (hasLngLat) {
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
                var d = this.getExtData();
                var data = list[d.num];
                this.setzIndex(2);
                cscMap.setCenter(this.getPosition());
                infoWindow.setContent(template.infoWindow(data['shopName'], '<ul>' +
                  '<li>经营范围：' + (data['mainIndustry'] || '') + '</li>' +
                  '<li>电话：' + data['phone'] + '</li>' +
                  '</ul>'));
                infoWindow.open(cscMap, this.getPosition());
                prevMarker && AMap.event.trigger(prevMarker, 'mouseout');

                template.$bd.find('li:eq(' + d.num + ')').addClass('active').siblings('.active').removeClass('active');
              });
            }
            html += '<li class="g-cf" data-lnglat="' + hasLngLat + '">' +
              (hasLngLat ? '<div class="item-ico item-ico-' + (1 + i) + '"></div>' : '') +
              '<div class="info">' +
              '<h3>' + (list[i]['shopUrl'] ? '<a href="' + list[i]['shopUrl'] + '" target="_blank">' + list[i]['shopName'] + '</a>' : list[i]['shopName']) + '</h3>' +
              '<p>经营范围：' + (list[i]['mainIndustry'] || '') + '</p>' +
              '</div>' +
              '</li>';
          }
          cscMap.setFitView();

          html += '</ol>';
          html += page(params['start'] || 0, data['shop']['totalPages'], data['shop']);
          html += '</div>';
        } else {
          html += template.empty();
        }
        template.$bd.html(html + '</div>');
        template.itemScroll();
        var $marketDetail = template.$bd.find('.market-detail p');
        if ($marketDetail.height() > 120) {
          $marketDetail.css({
            height: 120,
            overflow: 'hidden'
          });
          $('<a href="javascript:" class="close"></a>').bind('click', function(event) {
            event.preventDefault();
            var $t = $(this);
            if ($marketDetail.is('[style]')) {
              $t.addClass('up');
              $marketDetail.removeAttr('style');
            } else {
              $marketDetail.css({
                height: 120,
                overflow: 'hidden'
              });
              $t.removeClass('up');
            }
          }).appendTo($marketDetail.parent().next().find('li:first'));
        }
      }, 'jsonp');
      return;
    }

    $.get('//market.csc86.com/market.html', params, function(data) {
      if (lastAction != params['action']) return;
      if (data['status'] && data['data']['totalRows'] > 0) {
        data = data['data'];
        html += '<div class="left-scroll items-list"><ol class="market-list">';
        var list = data['list'];
        for (var i = 0; i < list.length; i++) {
          // if (!list[i]['lng']) {
          //   alert('数据错误：' + list[i]['name'] + '坐标信息为空！');
          //   location.hash = '#!';
          //   return;
          // }
          hasLngLat = /^\d+(\.\d+)?$/.test(list[i]['lat']);

          if (hasLngLat) {
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
              var d = this.getExtData();
              var data = list[d.num];
              this.setzIndex(2);
              cscMap.setCenter(this.getPosition());
              infoWindow.setContent(template.infoWindow(data['name'], '<ul>' +
                '<li>位置：' + data['location'] + '</li>' +
                '<li>营业时间：' + data['businessBegin'] + ' - ' + data['businessEnd'] + '</li>' +
                '<li>电话：' + data['telephone'].join(' ') + '</li>' +
                '<li>特色：' + data['feature'].join(' ') + '</li>' +
                '</ul>'));
              infoWindow.open(cscMap, this.getPosition());
              prevMarker && AMap.event.trigger(prevMarker, 'mouseout');

              template.$bd.find('li:eq(' + d.num + ')').addClass('active').siblings('.active').removeClass('active');
            });
          }
          html += '<li class="g-cf" data-lnglat="' + hasLngLat + '">' +
            '<a href="#!action=market&marketId=' + list[i]['id'] + '" class="g-fl" target="_blank"><img src="' + list[i]['logo'] + '" alt="' + list[i]['name'] + '" width="88" height="80"/></a>' +
            (hasLngLat ? '<div class="item-ico item-ico-' + (1 + i) + '"></div>' : '') +
            '<div class="info">' +
            '<h3><a href="#!action=market&marketId=' + list[i]['id'] + '" target="_blank">' + list[i]['name'] + '</a></h3>' +
            '<p>电话：' + list[i]['telephone'].join('<br />') + '<br />位置：' + list[i]['location'] + '</p>' +
            '</div>' +
            '</li>';
        }
        cscMap.setFitView();

        html += '</ol>';
        html += '</div>';
      } else {
        html += template.empty();
      }
      template.$bd.html(html + '</div>');
      template.itemScroll();
    }, 'jsonp');
  };
});