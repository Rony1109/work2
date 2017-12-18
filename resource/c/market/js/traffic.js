/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  var template = require('./template');
  var types = [
    'free',
    'bus',
    'car'
  ];
  template.$bd.delegate('ul.traffic-tab li:not(.active)', 'click', function(event) {
    location.hash = /type\=/.test(location.hash) ? location.hash.replace(/type\=[a-z]+/, 'type=' + types[$(this).index()]) : ('#!action=traffic&type=' + types[$(this).index()]);
  }).delegate('ul.tarffic-free li', 'mouseenter', function(event) {
    $(this).addClass('active').siblings().removeClass('active');
  }).delegate('a.exchange', 'click', function(event) {
    event.preventDefault();
    var $tabBd = $(this).parents('div.traffic-tab-bd');
    var $from = $tabBd.find('input[name="from"]');
    var $to = $tabBd.find('input[name="to"]');
    var from = $from.val();
    var to = $to.val();
    $from.val(to);
    $to.val(from);

    location.hash = $(this).attr('href') + '&' + $.param({
      from: to,
      to: from,
      transfer: /transfer\=true/.test(location.hash)
    });
  }).delegate('.select-accurate li', 'mouseenter', function(event) {
    var $t = $(this);
    AMap.event.trigger(markers[$t.index()], 'mouseover');
    $t.append('<a href="javascript:">设为' + $t.parents('.select-accurate').data('a') + '点</a>');
  }).delegate('.select-accurate li', 'mouseleave', function(event) {
    var $t = $(this);
    $t.find('a').remove();
    AMap.event.trigger(markers[$t.index()], 'mouseout');
  }).delegate('.select-accurate a', 'click', function(event) {
    event.preventDefault();
    var $t = $(this);
    var index = $t.parent().index();
    var arr = location.hash.replace('#!', '').split('&');
    var params = {};
    var tmp;
    for (var i = 0; i < arr.length; i++) {
      tmp = arr[i].split('=');
      params[tmp[0]] = decodeURIComponent(tmp[1]);
    }
    params['transfer'] = true;
    var LngLat = markers[index].getPosition();
    if ($t.parents('.select-accurate').data('a') == '起') {
      params['from'] = $t.prev().text();
      params['fromlngLat'] = LngLat.toString();
    } else {
      params['to'] = $t.prev().text();
      params['tolngLat'] = LngLat.toString();
    }
    location.hash = '#!' + $.param(params);

  });

  var isLoad = false; //是否已经加载过
  var activeMarker;
  var markers = [];

  module.exports = function(params, AMap, mapData) {
    var html = '<div class="content-bd g-ffy">' +
      template.headCount('交通指南');
    html += '  <div class="left-scroll">' +
      '    <div class="traffic-bd">' +
      '      <ul class="g-cf g-fs14 traffic-tab">' +
      '        <li class="free active">免费班车</li>' +
      '        <li class="bus">公交</li>' +
      '        <li class="car">自驾</li>' +
      '      </ul>' +
      '      <div class="traffic-tab-bd traffic-tab-bd-active">' +
      '        <ul class="tarffic-free">' +
      '          <li class="active">' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">华强北</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              8:00、9:00、10:00、11:00、13:00、14:00、15:00、16:00、17:00、18:00<br/>' +
      '              <br/>' +
      '              华强北发车时间：<br/>' +
      '              9:00、10:00、11:00、13:00、14:00、15:00、16:00、17:00、18:00、19:00' +
      '            </div>' +
      '          </li>' +
      '          <li>' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">布吉地铁站</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              10:00、11:00、12:00、14:00、15:00、16:00、17:00、18:00、19:00、20:00<br/>' +
      '              <br/>' +
      '              布吉地铁站发车时间：<br/>' +
      '              9:00、10:00、11:00、12:00、14:00、15:00、16:00、17:00、18:00、19:00' +
      '            </div>' +
      '          </li>' +
      '          <li>' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">丽湾酒店</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              8:00、10:00、13:30、16:00、18:30<br/>' +
      '              <br/>' +
      '              丽湾酒店发车时间：<br/>' +
      '              9:00、11:00、14:30、17:00' +
      '            </div>' +
      '          </li>' +
      '          <li>' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">凤凰大道</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              9:30、10:30、13:30、15:30、18:30<br/>' +
      '              <br/>' +
      '              凤凰大道发车时间：<br/>' +
      '              9:00、10:00、11:30、14:30、16:30' +
      '            </div>' +
      '          </li>' +
      '          <li>' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">山厦村委</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              9:30、10:30、13:30、15:30、18:30<br/>' +
      '              <br/>' +
      '              山厦村委发车时间：<br/>' +
      '              9:00、10:00、11:30、14:30、16:30' +
      '            </div>' +
      '          </li>' +
      '          <li>' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">慢城、龙园意境</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              9:30、11:00、14:00、16:00、17:00、19:00<br/>' +
      '              <br/>' +
      '              慢城、龙园意境发车时间：<br/>' +
      '              9:00、10:00、12:00、15:00、16:30、18:00' +
      '            </div>' +
      '          </li>' +
      '          <li>' +
      '            <div class="g-cf free-line-hd">' +
      '              <div class="g-fl">辅城坳</div>' +
      '              <div class="g-fr">华南城</div>' +
      '            </div>' +
      '            <div class="free-line-bd">' +
      '              华南城发车时间：<br/>' +
      '              9:40、11:20、14:00、16:00、18:30<br/>' +
      '              <br/>' +
      '              辅城坳发车时间：<br/>' +
      '              9:00、10:30、12:00、15:00、17:00' +
      '            </div>' +
      '          </li>' +
      '        </ul>' +
      '      </div>' +
      '      <div class="g-cf get-line traffic-tab-bd">' +
      '        <form action="#!trans">' +
      '          <div class="g-fl get-line-form">' +
      '            <div class="g-cf"><span>起</span><input name="from" type="text" value="' + (params['from'] || '') + '" autocomplete="off"/></div>' +
      '            <div class="g-h15"></div>' +
      '            <div class="g-cf end"><span>终</span><input name="to" type="text" value="' + (params['to'] || '深圳华南城') + '" autocomplete="off"/></div>' +
      '            <div class="g-h15"></div>' +
      '            <button type="sbumit">获取路线</button>' +
      '          </div>' +
      '        </form>' +
      '        <a href="#!action=traffic&type=bus" class="g-fl exchange"></a>' +
      '      </div>' +
      '      <div class="g-cf get-line traffic-tab-bd">' +
      '        <form action="#!driving">' +
      '          <div class="g-fl get-line-form">' +
      '            <div class="g-cf"><span>起</span><input name="from" type="text" value="' + (params['from'] || '') + '" autocomplete="off"/></div>' +
      '            <div class="g-h15"></div>' +
      '            <div class="g-cf end"><span>终</span><input name="to" type="text" value="' + (params['to'] || '深圳华南城') + '" autocomplete="off"/></div>' +
      '            <div class="g-h15"></div>' +
      '            <button type="sbumit">获取路线</button>' +
      '          </div>' +
      '        </form>' +
      '        <a href="#!action=traffic&type=car" class="g-fl exchange"></a>' +
      '      </div>' +
      '    </div>' +
      '  </div>';
    template.$bd.html(html + '</div>');

    var type = params['type'] || types[0];

    if (!template.$bd.find('.' + type).is('.active')) {
      var $t = template.$bd.find('.' + type);
      $t.addClass('active').siblings().removeClass('active');
      template.$bd.find('div.traffic-tab-bd:eq(' + $t.index() + ')').addClass('traffic-tab-bd-active').siblings().removeClass('traffic-tab-bd-active');
    }


    var getLine = {};

    function transfer() {
      if (params['transfer'] == 'true') {
        var lngLat;
        if (params['fromlngLat']) {
          lngLat = params['fromlngLat'].split(',');
          getLine['fromlngLat'] = [new AMap.LngLat(lngLat[0], lngLat[1])];
        }
        if (params['tolngLat']) {
          lngLat = params['tolngLat'].split(',');
          getLine['tolngLat'] = [new AMap.LngLat(lngLat[0], lngLat[1])];
        }


        if (!getLine['fromlngLat']) {
          getLine['step'] = 'fromlngLat';
          MGeocoder.getLocation(params['from']);
          return;
        }
        if (!getLine['tolngLat']) {
          getLine['step'] = 'tolngLat';
          MGeocoder.getLocation(params['to']);
          return;
        }


        getLine['step'] = 'search';
        if (params['type'] == 'bus') {
          trans.search(getLine['fromlngLat'][0], getLine['tolngLat'][0]);
          return;
        }
        driv.search(getLine['fromlngLat'][0], getLine['tolngLat'][0]);
      }
    }

    var MGeocoder;
    var auto;
    var trans;
    var driv;

    var $focus;
    var q;
    var polyline;
    var polylineHover;
    var steps = [];
    var paths = [];


    function clearTips() {
      template.$bd.find('div.get-tips').remove();
    }

    function autocompleteCallBack(data) {
      clearTips();
      if (data['info'] == 'OK' && data['tips'].length > 0) {
        var html = '<div class="g-ffy get-tips' + ($focus.is('[name="to"]') ? ' get-tips-2' : '') + '"><ul>';
        for (var i = 0; i < data['tips'].length; i++) {
          html += '<li><strong>' + data['tips'][i]['name'].replace(new RegExp('(' + q + ')', 'gi'), '<mark>$1</mark>') + '</strong><span>' + data['tips'][i]['district'] + '</span></li>';
        }
        template.$bd.append(html + '</ul></div>');
      }
    }

    function searchLine(data) {
      getLine = {
        step: 'fromlngLat'
      };
      if (data['info'] != 'OK') {
        alert('无法按照地点获取线路，请重新输入！');
        location.hash = location.hash.replace('&transfer=true', '');
        return;
      }
      var ol = '<ol class="steps">';
      if (params['type'] == 'car') {
        steps = data['routes'][0]['steps'];
        for (var i = 0; i < steps.length; i++) {
          paths = paths.concat(steps[i]['path']);
          ol += '<li>' + steps[i]['instruction'] + '</li>';
        }
      } else {
        steps = data['plans'][0]['segments'];
        paths = data['plans'][0]['path'];
        for (var i = 0; i < steps.length; i++) {
          steps[i]['path'] = steps[i]['transit']['path'];
          ol += '<li>' + steps[i]['instruction'] + '</li>';
        }
      }
      ol += '</ol>';
      template.$bd.find('.steps').remove();
      template.$bd.find('.traffic-bd').append(ol);

      if (polyline) {
        polyline.setMap(null);
      }
      polyline = new AMap.Polyline({
        map: cscMap,
        path: paths,
        strokeColor: "#9400D3",
        strokeOpacity: 0.7,
        strokeWeight: 4,
        strokeDasharray: [10, 5]
      });

      cscMap.setFitView();
      template.itemScroll();

    }

    function selectAccurate(data, step) {
      var html = '<div class="select-accurate" data-a="' + (step == 'fromlngLat' ? '起' : '终') + '"><h3>请选择准确的' + (step == 'fromlngLat' ? '起' : '终') + '点</h3><ol class="items-list">';

      for (var i = 0; i < data.length; i++) {
        html += '<li><div class="item-ico item-ico-' + (1 + i) + '"></div><span>' + data[i]['formattedAddress'] + '</span></li>';
        markers[i] = new AMap.Marker({
          icon: new AMap.Icon({
            size: new AMap.Size(30, 37),
            image: "//res.csc86.com/v2/c/market/css/img/poi.png",
            imageOffset: new AMap.Pixel(2 - (i * 50), -42)
          }),
          map: cscMap,
          position: data[i]['location'],
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

          template.$bd.find('.select-accurate li:eq(' + d.num + ')').addClass('hover');
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

          template.$bd.find('.select-accurate li:eq(' + d.num + ')').removeClass('hover');
        });
      }
      cscMap.setFitView();
      html += '</ol></div>';
      template.$bd.find('.select-accurate').remove();
      template.$bd.find('.traffic-bd').append(html);
      template.itemScroll();
    }

    template.$bd.undelegate('.steps li', 'mouseenter click').delegate('.steps li', 'mouseenter', function(event) {
      if (polylineHover) {
        polylineHover.setMap(null);
      }
      polylineHover = new AMap.Polyline({
        map: cscMap,
        path: steps[$(this).index()]['path'],
        strokeColor: "#FF3030",
        strokeOpacity: 0.9,
        strokeWeight: 4,
        strokeDasharray: [10, 5]
      });
    }).delegate('.steps li', 'click', function(event) {
      cscMap.setFitView(polylineHover);
    });


    cscMap.plugin(['AMap.Geocoder', 'AMap.Autocomplete', 'AMap.Transfer', 'AMap.Driving'], function() {
      MGeocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      });
      auto = new AMap.Autocomplete({});
      trans = new AMap.Transfer({
        city: '0755'
      });

      driv = new AMap.Driving({});

      AMap.event.addListener(MGeocoder, "complete", function(data) {
        if (data['info'] != 'OK') {
          getLine = {
            step: 'fromlngLat'
          };
          alert('无法按照地点获取线路，请重新输入！');
          location.hash = location.hash.replace('&transfer=true', '');
          return;
        }
        this[this['step']] = data['resultNum'] != 1 ? data : [data['geocodes'][0]['location']];

        if (this['step'] == 'fromlngLat' && !this['tolngLat']) {
          this['step'] = 'tolngLat';
          MGeocoder.getLocation(params['to']);
          return;
        }

        if ($.isPlainObject(this['fromlngLat']) || $.isPlainObject(this['tolngLat'])) {
          if ($.isPlainObject(this['fromlngLat'])) {
            selectAccurate(this['fromlngLat']['geocodes'], 'fromlngLat');
            return;
          }
          if ($.isPlainObject(this['tolngLat'])) {
            selectAccurate(this['tolngLat']['geocodes'], 'tolngLat');
            return;
          }
        }


        this['step'] = 'search';
        if (params['type'] == 'bus') {
          trans.search(this['fromlngLat'][0], this['tolngLat'][0]);
        } else {
          driv.search(this['fromlngLat'][0], this['tolngLat'][0]);
        }

      }, getLine);
      AMap.event.addListener(auto, 'complete', autocompleteCallBack);
      AMap.event.addListener(trans, 'complete', searchLine);

      AMap.event.addListener(driv, 'complete', searchLine);

      if (isLoad == false) {
        isLoad = true;
        template.$bd.delegate('input', 'keyup', function(event) { //搜索提示
          $focus = $(this);
          q = $.trim($focus.val());
          q.length > 0 ? auto.search(q) : clearTips();
        }).delegate('input', 'blur', function() { //焦点离开后清除提示
          setTimeout(clearTips, 200);
        }).delegate('div.get-tips li', 'click', function(event) { //选择地点
          $focus.val($(this).find('strong').text());
          clearTips();
        }).delegate('form', 'submit', function(event) { //搜索线路
          event.preventDefault();
          var $t = $(this);
          var from = $.trim($t.find('input[name="from"]').val());
          var to = $.trim($t.find('input[name="to"]').val());
          if (from.length == 0) {
            alert('请输入起点地址');
            return;
          }
          if (to.length == 0) {
            alert('请输入终点地址');
            return;
          }
          location.hash = '#!' + $.param({
            action: 'traffic',
            type: types[template.$bd.find('.traffic-tab li.active').index()],
            transfer: true,
            from: from,
            to: to
          });
        });
      }
      transfer();

    });
  };
});