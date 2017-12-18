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
  }).delegate('ol.support-list div.item-ico,ol.bank-list li', 'click', function(event) {
    var $t = $(this),
      $li = $t.is('li') ? $t : $t.parents('li');
    if ($li.data('lnglat') === true) {
      cscMap.setCenter(markers[$li.index()].getPosition());
    }
  });

  function privilege(data) {
    if (!data || data.length == 0) return '';
    var html = '';
    for (var i = 0; i < data.length; i++) {
      html += '<div class="pre">' + data[i] + '</div>';
    }
    return html;
  }


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
        parms[type + 'lngLat'] = infoWindow.getPosition().toString();
        location.hash = '#!' + $.param(parms);

      });
    }

    if (/\d+/.test(params['view'])) {
      params['id'] = params['view'];
      $.get('//market.csc86.com/support/detail.html', params, function(data) {
        if (lastAction != params['action']) return;
        if (data['status']) {
          template.$bd.find('div.content-loading').remove();
          $dialog = template.dialog();
          template.support($dialog, data, params['c']);
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
    var obj = {
      dining: ['CY', '餐饮'],
      enter: ['XX', '休闲'],
      hotel: ['JD', '酒店'],
      bank: ['YH', '银行']
    };
    $.get('//market.csc86.com/support/' + obj[params['c']][0] + '.html', params, function(data) {
      if (lastAction != params['action']) return;
      var html = '<div class="content-bd g-ffy content-search">';
      if (data['status'] && data['data']['totalRows'] > 0) {
        data = data['data'];
        html += template.headCount(obj[params['c']][1]) + '<div class="left-scroll items-list"><ol class="' + (params['c'] != 'bank' ? 'support-list' : 'bank-list') + '">';
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
                '<li>' + (data['location'] || '暂无地址信息') + '</li>' +
                '<li>' + data['phone'] + '</li>' +
                '</ul>' + (params['c'] != 'bank' ? privilege(data['privilege']) : ''), params['c'] != 'bank' ? 'support' : ''));
              infoWindow.open(cscMap, this.getPosition());
              prevMarker && AMap.event.trigger(prevMarker, 'mouseout');

              template.$bd.find('li:eq(' + d.num + ')').addClass('active').siblings('.active').removeClass('active');
            });
          }

          html += '<li data-lnglat="' + hasLngLat + '">' +
            '<div class="g-cf">' +
            (hasLngLat ? '<div class="item-ico item-ico-' + (1 + i) + '"></div>' : '') +
            (params['c'] != 'bank' ?
            '<a href="#!action=support&c=' + params['c'] + '&view=' + list[i]['id'] + '"><img src="//img.csc86.com' + list[i]['imagepicture'] + '" alt="' + list[i]['name'] + '" width="100" height="75" class="g-fr" /></a>' +
            '<div class="info">' +
            '<h3><a href="#!action=support&c=' + params['c'] + '&view=' + list[i]['id'] + '">' + list[i]['name'] + '</a></h3>' +
            '<p>电话：' + (list[i]['phone'] || '暂无电话信息') + '<br />地址：' + list[i]['location'] + '</p>' +
            '</div>' +
            '</div>' +
            privilege(list[i]['privilege']) : ('<div class="info">' +
              '<h3>' + list[i]['name'] + '</h3>' +
              '<p>电话：' + (list[i]['phone'] || '暂无电话信息') + '<br />地址：' + list[i]['location'] + '</p>' +
              '</div>')) +
            '</li>';
        }
        cscMap.setFitView();
        html += '</ol>';
        html += page(params['start'] || 0, data['totalRows'], data);
        html += '</div>';
      } else {
        html += template.headCount(obj[params['c']][1]) + template.empty();
      }
      template.$bd.html(html + '</div>');
      template.itemScroll();
    }, 'jsonp');
  };
});