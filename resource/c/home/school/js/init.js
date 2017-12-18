/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  require('m/newtopnav/js/init');
  require('m/newsearch/js/init');
  require('m/back-top/js/init');

  var views = {
    catid: [],
    newid: []
  };
  var likes = {
    catid: [],
    newid: []
  };
  var $views = $('[data-views]:not([data-detail])');
  var $likes = $('[data-like]');
  var $alike = $('.tag-like a.like,.v-like a.l');

  if ($views.length) {
    $views.each(function() {
      var $t = $(this);
      views.newid.push($t.data('id'));
      views.catid.push($t.data('views'));
    });
    //更新学习数量
    $.get('/api.php', {
      op: 'school_like',
      act: 'hits',
      catid: views.catid,
      newid: views.newid
    }, function(data) {
      if (data.status) {
        $views.each(function() {
          $(this).text(data.data.shift());
        });
      }
    }, 'jsonp');
  }

  if ($likes.length) {
    $likes.each(function() {
      var $t = $(this);
      likes.newid.push($t.data('id'));
      likes.catid.push($t.data('like'));
    });
    //更新喜欢数量
    $.get('/api.php', {
      op: 'school_like',
      act: 'likes',
      catid: likes.catid,
      newid: likes.newid
    }, function(data) {
      if (data.status) {
        $likes.each(function() {
          $(this).text(data.data.shift());
        });
      }
    }, 'jsonp');
  }

  $alike.on('click', function(event) {
    event.preventDefault();
    var $t = $(this);
    var $span = $t.find('[data-like]');
    $.get('/api.php', {
      op: 'school_like',
      act: 'onclick',
      catid: $span.data('like'),
      newid: $span.data('id')
    }, function(data) {
      if (data.status) {
        $t.after($t.is('.like') ? '<span class="g-fr like liked">已喜欢</span>' : '<span class="ld">已喜欢</span>');
        $t.remove();
      } else {
        switch (data.data) {
          case -1:
            require.async('//res.csc86.com/js/', function() {
              require.async('//res.csc86.com/f=js/m/sign', function() {
                csc.checkSign('location.reload');
              });
            });
            break;
          case -2:
            $t.after($t.is('.like') ? '<span class="g-fr like liked">已喜欢</span>' : '<span class="ld">已喜欢</span>');
            $t.remove();
            break;
          default:
            alert(data.msg || '喜欢失败，请稍后重试！');
        }
      }
    }, 'jsonp');
  });

  exports.isLike = function(data) {
    $.get('/api.php', $.extend({
      op: 'school_like',
      act: 'islike',
      catid: '',
      newid: ''
    }, data || {}), function(data) {
      if (data.status) {
        $alike.after($alike.is('.like') ? '<span class="g-fr like liked">已喜欢</span>' : '<span class="ld">已喜欢</span>');
        $alike.remove();
      }
    }, 'jsonp');
    $.get('/api.php', $.extend({
      op: 'school_like',
      act: 'onhits',
      catid: '',
      newid: ''
    }, data || {}), function(data) {
      $('[data-detail]').text(data.data);
    }, 'jsonp');
  };

  exports.switchType = function() {
    $('.list-filter .type').on('click', 'a', function(event) {
      event.preventDefault();
      var $t = $(this);
      $t.find(':radio').prop('checked', true);
      location.href = $t.attr('href');
    });
  };

  exports.share = function() {
    var $s = $('.v-share-box');
    var timer;
    $('.v-like').on('mouseenter', '.s', function() {
      clearTimeout(timer);
      $s.removeClass('g-dn');
    }).on('mouseleave', '.s', function() {
      timer = setTimeout(function() {
        $s.addClass('g-dn');
      }, 500);
    });
    $s.on('mouseenter', function() {
      clearTimeout(timer);
      $s.removeClass('g-dn');
    }).on('mouseleave', function() {
      $s.addClass('g-dn');
    });
  };

  $('.g-back').addCss().goBack();

});