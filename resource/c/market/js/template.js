define(function(require, exports, module) {
  var comment = require('m/comment/js/init').init;
  var play = require('m/sea-modules/focusPlay').focusPlay;
  var $bd = $('#contentBd');
  var $wd = $(window);

  function banner(data) {
    var html = '<ul>';
    for (var i = 0; i < data.length; i++) {
      html += '<li' + (i > 0 ? '' : ' class="cur"') + '><a href="' + data[i]['linkAddress'] + '" target="_blank"><img src="//img.csc86.com' + data[i]['img'] + '" width="635" height="270" alt=""/></a></li>';
    }
    return html + '</ul>';
  }

  function issues(data) {
    var html = '<ol>';
    for (var i = 0; i < data.length; i++) {
      html += '<li><a href="#!action=special&type=' + data[i]['specialType'] + '&view=' + data[i]['id'] + '"><span>第' + data[i]['issue'] + '期</span>' + data[i]['theme'] + '</a></li>';
    }
    return html + '</ol>';
  }

  function members(data) {
    var html = '<ul class="eat-friends g-tc g-cf">';
    for (var i = 0; i < data.length; i++) {
      html += '<li><a href="//quan.csc86.com/u/' + data[i]['userId'] + '"  target="_blank"><img src="' + data[i]['head'] + '" alt="" width="72" height="72" /><br/>ID:' + data[i]['userName'] + '</a></li>';
    }
    return html + '</ul>';
  }

  function recommend(data) {
    var html = '<ul class="nv-rec">';
    for (var i = 0; i < data.length; i++) {
      html += '<li class="g-cf' + (i > 0 ? '' : ' cur') + '">';
      html += '<a href="#!action=support&view=' + data[i]['id'] + '" class="t">' + data[i]['name'] + '</a>' +
        '                <a href="#!action=support&view=' + data[i]['id'] + '" class="g-fl"><img src="//img.csc86.com' + data[i]['imagepicture'] + '" alt="" width="84" height="84" /></a>' +
        '                <p><a href="#!action=support&view=' + data[i]['id'] + '" class="g-fwb">' + data[i]['name'] + '</a><br/>' + data[i]['business'] + '</p></li>';
    }
    return html + '</ul>';
  }

  function hotSpecial(data) {
    var html = '<ul class="special-add">';
    for (var i = 0; i < data.length; i++) {
      html += '<li><a href="#!action=special&type=' + data[i]['specialType'] + '&view=' + data[i]['id'] + '"><img src="//img.csc86.com' + data[i]['specialImage'] + '" alt="" width="220" height="120" /><br/><span>专题：' + data[i]['theme'] + '</span></a></li>';
    }
    return html + '</ul>';
  }

  function zan(data) {
    return '<ul class="special-zan g-fs14 g-tc g-fwb g-cf">' +
      '            <li class="g-fl">' +
      '              <span>' + data['evaluateGeneral'] + '</span>' +
      '              <a href="//market.csc86.com/updateSpecialEvaluate?id=' + data['id'] + '&type=general" class="zan_btn zan_bn1"></a>' +
      '            </li>' +
      '            <li class="g-fr">' +
      '              <span>' + data['evaluateBad'] + '</span>' +
      '              <a href="//market.csc86.com/updateSpecialEvaluate?id=' + data['id'] + '&type=bad" class="zan_btn zan_bn3"></a>' +
      '            </li>' +
      '            <li class="m">' +
      '              <span>' + data['evaluateGood'] + '</span>' +
      '              <a href="//market.csc86.com/updateSpecialEvaluate?id=' + data['id'] + '&type=good" class="zan_btn zan_bn2"></a>' +
      '            </li>' +
      '          </ul>';
  }

  function other(data) {
    if (data['box'] || data['wifi'] || data['stopcar']) {
      var html = '<ul>';

      if (data['stopcar']) {
        html += '<li class="pos1">免费停车</li>';
      }
      if (data['wifi']) {
        html += '<li class="pos2">无线路由</li>';
      }
      if (data['box']) {
        html += '<li class="pos3">包厢</li>';
      }
      return html + '</ul>'
    }
    return '';
  }

  function pre(data) {
    if (data['privilege'].length < 1) return '';
    var html = '<h2 class="detail_title"><strong>优惠</strong>信息<span></span></h2>' +
      '  <ul class="detail_list">';
    html += '    <li><a href="javascript:">森田扒房：情人节双人浪漫套餐</a></li>' +
      '    <li><a href="javascript:">森田扒房：情人节双人浪漫套餐</a></li>';
    return html + '  </ul>' +
      '  <div class="g-h20"></div>' +
      '  <div class="g-h20"></div>';
  }

  function rec(data) {
    if (data['productpicture'].length < 1) return '';
    var html = '  <h2 class="detail_title"><strong>商家</strong>推荐<span></span></h2>' +
      '  <div class="g-cf img_scroll">' +
      '    <ul class="img_show">';
    for (var i = 0; i < data['productpicture'].length; i++) {
      html += '<li class="cur"><a href="' + data['productpictureURL'][i] + '" target="_blank"><img src="//img.csc86.com' + data['productpicture'][i] + '" alt="" width="810" height="400" /></a></li>';
    }
    return html + '    </ul>' +
      '    <span class="btn_left"></span>' +
      '    <span class="btn_right"></span> ' +
      '  </div>' +
      '  <div class="g-h20"></div>' +
      '  <div class="g-h20"></div>';
  }

  function quality(data) {
    if (data.length < 1) return '';
    var html = '<div>' +
      '<h2 class="special-side-title tit_1">优质广场</h2>' +
      '<div class="g-h10"></div>' +
      '<ul class="special-add">';
    for (var i = 0; i < data.length; i++) {
      html += '<li><a href="' + data[i]['linkAddress'] + '" target="_blank"><img src="//img.csc86.com/' + data[i]['img'] + '" alt="" width="235" height="120" /></a></li>';
    }
    return html + '</ul>' +
      '</div>' +
      '<div class="g-h10"></div>';
  }

  function visit(data) {
    if (data.length < 1) return '';
    var html = '<div>' +
      '<h2 class="special-side-title tit_1">随便逛逛</h2>' +
      '<div class="random_list">' +
      '<ul class="g-cf">';
    for (var i = 0; i < data.length; i++) {
      html += '<li><a href="#!action=special&type=2&view=' + data[i]['id'] + '"><img src="//img.csc86.com/' + data[i]['image'] + '" alt="" width="110" height="110" /></a></li>';
    }
    return html + '</ul>' +
      '</div>' +
      '</div>';
  }

  function specialListScroll() {
    var $history = $('.J_history'),
      $ol = $history.find('ol'),
      loading = false,
      page = 2;
    $ol.bind('scroll', function() {
      if (loading) { //加载中
        return;
      }
      var $last = $ol.find('li:last');
      if (($last.position().top - $ol.height() - $ol.scrollTop()) < 40) {
        loading = true;
        $.get('//market.csc86.com/listSpecial', {
          pageIndex: page,
          type: /type\=2/.test(location.hash) ? 2 : 1
        }, function(data) {
          var html = '';
          data = data['data'];
          loading = false;
          page++;
          for (var i = 0; i < data['list'].length; i++) {
            html += '<li title="' + data['list'][i]['theme'] + '"><a href="/special?type=' + data['list'][i]['specialType'] + '&id=' + data['list'][i]['id'] + '"><span>第' + data['list'][i]['issue'] + '期</span>' + data['list'][i]['theme'] + '</a></li>';
          }
          if (data['has_nextPage'] == false) { //最后一页解除事件绑定
            $ol.unbind('scroll');
            html += '<li class="last">没有更多了</li>';
          }
          $ol.append(html);
        }, 'jsonp');
      }
    });
  }


  exports.$bd = $bd;

  exports.$wd = $wd;

  exports.headCount = function(n) {
    n = n || 0;
    return '<div class="g-cf content-hd">' +
      '<h2 class="g-fl">' + (/\d+/.test(n) ? '共' + n + '条搜索结果' : n) + '</h2>' +
      '<a href="#" class="g-fr back">返回</a>' +
      '</div>';
  };

  exports.empty = function() {
    return '<div class="g-tc g-fs14 search-empty">没有找到相匹配信息</div>';
  };

  exports.itemScroll = function() {
    var $ls = $bd.find('.left-scroll');
    if ($ls.length == 0) return;
    $ls.height($wd.height() - $ls.offset().top).niceScroll({
      cursoropacitymin: 0.6,
      cursorcolor: "#f9f9f9",
      cursorwidth: "7px",
      cursorborder: "1px solid #bfbfbf",
      cursorborderradius: "4px",
      background: '#fff url(//res.csc86.com/v2/c/market/css/img/scroll-bg.png) repeat-y center 0'
    });
  };

  exports.dialog = function() {
    if ($('#dialog').length == 0) {
      $('body').append('<div class="dialog"><div class="dialog-bg"></div><div class="dialog-bd-bg"></div><div class="g-ffy dialog-bd" id="dialog"></div></div>');
      if (/MSIE.6\.0/.test(navigator.userAgent)) {
        var $dialog = $('.dialog');
        $dialog.height($wd.height());
        $dialog.find('div.dialog-bd-bg').css('margin-left', ($wd.width() - 960) / 2);
        $dialog.find('div.dialog-bd').css('margin-left', ($wd.width() - 930) / 2)
      }
    }
    return $('#dialog').empty();
  };

  exports.dialogScroll = function($dialog) {
    if (/MSIE.(7|6)\.0/.test(navigator.userAgent)) {
      $dialog.find('div.dialog-scroll').height(template.$wd.height() - 45);
    }
    $dialog.find('div.dialog-scroll').niceScroll({
      cursoropacitymin: .6,
      cursorcolor: "#f9f9f9",
      cursorwidth: "7px",
      cursorborder: "1px solid #bfbfbf",
      cursorborderradius: "4px",
      background: '#fff url(//res.csc86.com/v2/c/market/css/img/scroll-bg.png) repeat-y center 0'
    });
  };

  exports.nv = function($dialog, data) {
    $dialog.html('<a href="#!action=special&type=1" class="back">返回</a><div class="dialog-scroll">' +
      '<div class="dialog-scroll-bd">' +
      '<div class="g-cf banner-box">' +
      '        <div class="banner g-fl">' +
      banner(data['data']['imgs']) +
      '        </div>' +
      '        <div class="g-fr g-tc brand-logo">' +
      '          <img src="//res.csc86.com/v2/c/market/image/eat-logo.jpg" width="200" height="155" alt="饮食男女"/>' +
      '          <div class="brand-author"><strong class="g-fs16 g-ffy">第' + data['data']['special']['issue'] + '期</strong><span class="g-dib">@逛市场 出品</span></div>' +
      '          <div class="brand-history J_history"' + (data['data']['hasNextSpecialList'] == 'true' ? ' data-hasnext="true"' : '') + '>' +
      '            <a href="javascript:"><span>第' + data['data']['special']['issue'] + '期</span>' + data['data']['special']['theme'] + '</a>' +
      issues(data['data']['specialDOs']) +
      '          </div>' +
      '        </div>' +
      '      </div>' +

      '      <div class="g-cf">' +
      '        <div class="g-h20"></div>' +
      '        <div class="g-h20"></div>' +
      '        <div class="g-fl nv-main">' +
      '<div class="g-cf nv-content">' + data['data']['special']['content'] + '</div>' +
      '<div class="g-h20"></div>' +
      '          <div class="g-h20"></div>' +
      '          <h2 class="g-fs18 g-ffy g-tc">你觉得这期饮食男女质量如何？</h2>' +
      '          <div class="g-h20"></div>' +
      '          <div class="g-h20"></div>' +
      zan(data['data']['special']) +
      '          <div class="g-h30"></div>' +
      '          <div class="g-h30"></div>' +
      '<h3 class="g-ffy g-fs16 comment-title">饭友评论</h3>' +
      '<div id="JComment"></div>' +
      '</div>' +
      '        <div class="g-fr nv-sub">' +
      '          <div class="eat-editor">' +
      '            <h2 class="special-side-title tit_1">本期主编</h2>' +
      '            <div class="g-h20"></div>' +
      '            <div class="g-cf">' +
      '              <a href="javascript:" class="g-fl"><img src="//img.csc86.com' + data['data']['special']['editorHead'] + '" alt="" width="94" height="94" /></a>' +
      '              <p><a href="javascript:" class="g-fwb">ID:' + data['data']['special']['editorName'] + '</a><br/>' + data['data']['special']['editorIntroduce'] + '</p>' +
      '            </div>' +
      '          </div>' +
      '          <div class="g-h25"></div>' +
      '          <div>' +
      '            <h2 class="special-side-title1">本期饭友</h2>' +
      '            <div class="g-h15"></div>' + members(data['data']['members']) +
      '          </div>' +
      '          <div class="g-h25"></div>' +
      '          <div class="g-h25"></div>' +
      '          <div>' +
      '            <h2 class="special-side-title tit_2">本期推荐</h2>' +
      '            <div class="g-h15"></div>' +
      recommend(data['data']['recommendSupportDOs']) +
      '          </div>' +
      '          <div class="g-h20"></div>' +
      '          <div class="g-h20"></div>' +
      '          <div>' +
      '            <h2 class="special-side-title tit_3">人气排行</h2>' +
      '            <div class="g-h15"></div>' +
      hotSpecial(data['data']['hotSpecialDOs']) +
      '          </div>' +
      '        </div>' +
      '        <div class="g-h20"></div>' +
      '    </div>' +
      '      </div>' +
      '</div>').parent().addClass('special-dialog');
    if ($('.banner').find('li').length > 1) {
      play('.banner', null, 3000);
    }
    comment(data['data']['special']['topicId'], $('#JComment'));
    if ($('[data-hasnext]').length > 0) {
      specialListScroll();
    }
  };

  exports.brand = function($dialog, data) {
    $dialog.html('<a href="#!action=special&type=2" class="back">返回</a><div class="dialog-scroll">' +
      '<div class="dialog-scroll-bd">' +
      '<div class="g-cf banner-box">' +
      '        <div class="banner g-fl">' +
      banner(data['data']['imgs']) +
      '        </div>' +
      '        <div class="g-fr g-tc brand-logo">' +
      '          <img src="//res.csc86.com/v2/c/market/image/brand-logo.jpg" width="200" height="155" alt="品牌风暴"/>' +
      '          <div class="brand-author"><strong class="g-fs16 g-ffy">第' + data['data']['special']['issue'] + '期</strong><span class="g-dib">@逛市场 出品</span></div>' +
      '          <div class="brand-history J_history"' + (data['data']['hasNextSpecialList'] == 'true' ? ' data-hasnext="true"' : '') + '>' +
      '            <a href="javascript:"><span>第' + data['data']['special']['issue'] + '期</span>' + data['data']['special']['theme'] + '</a>' +
      issues(data['data']['specialDOs']) +
      '          </div>' +
      '        </div>' +
      '      </div>' +

      '      <div class="g-cf">' +
      '        <div class="g-h20"></div>' +
      '        <div class="g-h20"></div>' +
      '        <div class="g-fl brand-main">' +
      '<div class="g-cf brand-content">' + data['data']['special']['content'] + '</div>' +
      '<div class="g-h20"></div>' +
      '          <div class="g-h20"></div>' +
      '          <h2 class="g-fs18 g-ffy g-tc">你觉得这期饮食男女质量如何？</h2>' +
      '          <div class="g-h20"></div>' +
      '          <div class="g-h20"></div>' +
      zan(data['data']['special']) +
      '          <div class="g-h30"></div>' +
      '          <div class="g-h30"></div>' +
      '<h3 class="g-ffy g-fs16 comment-title">饭友评论</h3>' +
      '<div id="JComment"></div>' +
      '</div>' +
      '        <div class="g-fr brand-sub">' +
      quality(data['data']['square']) +
      visit(data['data']['brandshopDOs']) +

      '        </div>' +
      '        <div class="g-h20"></div>' +
      '    </div>' +
      '      </div>' +
      '</div>').parent().addClass('special-dialog');
    if ($('.banner').find('li').length > 1) {
      play('.banner', null, 3000);
    }
    comment(data['data']['special']['topicId'], $('#JComment'));
    if ($('[data-hasnext]').length > 0) {
      specialListScroll();
    }
  };

  exports.support = function($dialog, data, c) {
    $dialog.html('<a href="#!action=support&c=' + c + '" class="back">返回</a><div class="dialog-scroll">' +
      '<div class="dialog-scroll-bd">' +
      '<div class="g-cf">' +
      '  <img src="//img.csc86.com' + data['data']['imagepicture'] + '" width="292" height="292" alt="" class="g-fl" />' +
      '  <div class="g-fl intro">' +
      '    <h2 class="detail_title">' + data['data']['name'] + '<span></span></h2>' +
      '    <div class="g-h10"></div>' +
      '    <p>' + data['data']['feature'] + '</p>' +
      '    <div class="g-h20"></div>' +
      '    <p class="lh-26">人均：￥' + data['data']['avgprice'] + '</p>' +
      '    <p class="lh-26">地址：' + data['data']['location'] + '</p>' +
      '    <p class="lh-26">电话：' + data['data']['phone'] + '</p>' +
      '    <div class="g-h25"></div>' +
      other(data['data']) +
      '  </div>' +
      '</div>' +
      '<div class="g-h20"></div>' +
      '<div class="g-h20"></div>' +
      '<div class="nv-detail-fd">' +
      pre(data['data']) +
      rec(data['data']) +
      '  <h2 class="detail_title"><strong>介绍</strong><span></span></h2>' +
      '  <div class="g-h15"></div>' +
      '  <div class="g-fs14 intro_text">' +
      (data['data']['introduce'] || '') +
      '  </div>' +
      '  <div class="g-h20"></div>' +
      '  <div class="g-h20"></div>' +
      '  <div class="comment-wrap"><h2 class="detail_title"><strong>评论</strong><span></span></h2>' +
      '  <div class="g-h30"></div>' +
      '  <div class="g-cf g-comment" id="JComment"></div>' +
      '  <div class="g-h20"></div></div>' +
      '</div>' +
      '<div class="g-h20"></div>' +
      '</div></div>').parent().addClass('special-dialog');
    data['data']['circleid'] ? comment(data['data']['circleid'], $('#JComment')) : $('.comment-wrap').remove();
    if ($('div.img_scroll li').length > 1) { //专题详情轮播
      (function() {
        var $div = $('div.img_scroll'),
          $ul = $div.find('ul').wrap('<div class="img_scroll_bd"></div>'),
          $li = $ul.find('li'),
          scroll = '-=810px',
          timer,
          player = function() {
            if ($ul.is(':animated')) {
              return;
            }
            $ul.animate({
              marginLeft: scroll
            }, 600, function() {
              var mL = parseInt($ul.css('marginLeft'));
              if (mL == 0) {
                $ul.css('marginLeft', 0 - 810 * $li.length);
              }
              if (mL == (810 - 1620 * $li.length)) {
                $ul.css('marginLeft', 0 - 810 * ($li.length - 1));
              }
            });
            timer = setTimeout(player, 3000);
          };
        $li.clone().appendTo($ul);
        $ul.width('999999pt').css('marginLeft', 0 - 810 * $li.length);
        $div.delegate('span', 'click', function(event) {
          clearTimeout(timer);
          scroll = $(this).is('.btn_left') ? '+=810px' : '-=810px';
          player();
        });
        timer = setTimeout(player, 3000);
      }());
    }
  };

  exports.infoWindow = function(title, content, type) {
    return '<div class="g-ffy info-window ' + (type || 'default') + '-info-window">' +
      '<a class="close info-window-close" href="javascript:void(0)">×</a><div class="hd">' + (title || '信息') + '</div>' +
      '<div class="bd">' + (content || '信息内容') + '</div>' +
      '<div class="ft">' +
      '<div class="g-cf"><a href="javascript:" class="active to">到这里去</a><a href="javascript:" class="from">从这里出发</a></div>' +
      '<div class="form" data-type="to" data-val="' + (title || '信息') + '"><span>起点</span>' +
      '<input type="text" autocomplete="off" class="text"/><a href="javascript:" class="bus">公交</a><a href="javascript:" class="car">驾车</a>' +
      '</div>' +
      '</div>' +
      '<div class="arr"></div>' +
      '</div>';
  };

});