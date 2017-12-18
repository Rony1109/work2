define(function(require, exports, module) {

  //设置首页及添加收藏
  require('c2/newcgsc/js/newtop.js');
  require('m/head-search/js/init');

  //检查是否登录
  $.ajax({
    url: '//api.csc86.com/notify/count/all/',
    dataType: 'jsonp',
    type: 'get',
    success: function(dataMsg) {
      if (dataMsg.status) {
        $("#name").val(dataMsg.data.username);
      }
    }
  });

  var tab = require('m/jsM/tab'),
    gotop = require('./gotop/init');
  tab('ul.c_txt_tab li', 'div.c_txt_inner div.c_con', 'mouseover', 'cur');
  gotop.setmain({
    marginbottom: 100,
    marginleft: 30
  });
  exports.feedback = function() {
    $('div.feedback form').bind('submit', function(event) {
      var $msg = $(this).find('textarea');
      if ($.trim($msg.val()) == '') {
        $msg.next().find('em').removeClass('g-dn');
        event.preventDefault();
      }
    });
  };
  var $side = $('.side');
  $(window).bind('scroll',function (event) {
    var wT = $(this).scrollTop();
    var startFixed = wT > 425;
    var isFixed = $side.is('.side-fixed');
    if(startFixed){
      isFixed || $side.addClass('side-fixed');
      if($side.css('position') != 'fixed'){
        $side.stop(true).animate({
          top:wT
        },150);
      }
    }else{
      $side.removeClass('side-fixed');
    }
  }).trigger('scroll');
});
