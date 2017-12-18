define(function(require, exports, module) {

  module.exports = function(hash, AMap, mapData) {
    var params = {
      action: 'map-index'
    };
    if (/^#\!/.test(hash)) {
      var arr = hash.replace('#!', '').split('&');
      var tmp;
      for (var i = 0; i < arr.length; i++) {
        tmp = arr[i].split('=');
        params[tmp[0]] = decodeURIComponent(tmp[1]);
      }
    }
    lastAction = params['action'];

    if (lastAction != 'search') {
      $('form').find('[name="q"]').val('');
    }

    cscMap.clearMap(); //清空地图
    //cscMap.setZoomAndCenter(16, new AMap.LngLat(114.127607, 22.677152)); //重置中心点
    $('.nicescroll-rails').remove(); //清除自定义滚动条

    require.async('c/market/js/' + params['action'], function(action) {
      if (params['action'] == lastAction) { //因为有网络延时所以检测下最后的请求是不已经改变
        try {
          action(params, AMap, mapData);
        } catch (err) {
          //console.log(err);
        }
      }
    });
  };
});