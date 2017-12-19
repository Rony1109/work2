/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

  // 别名配置
  alias: {
    'jquery': 'l/jquery/1.10.2/jquery.min.js',
    'top': 'm/top-bar/js/init.js'
  },

  // Sea.js 的基础路径
  base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
  require('jquery');
  require('top');

  var dialog = require('m/dialog/js/init.js');
  var isLogin = require('http://api.csc86.com/member/isLogin.html?callback=define');


  $(window).scroll(function() {
    var topscr = $(this).scrollTop();
    //alert(topscr);
    if (topscr < 305) {
      $(".fiexd").addClass("fiexd_nav");
    } else {
      $(".fiexd").removeClass("fiexd_nav");
    }
  });

  $(".pho .poh-all").delegate("li", "click", function() {
    var $th = $(this),
      ind = $th.index();
    if (!$th.hasClass("cur")) {
      $(".pho .poh-all li").removeClass("cur").eq(ind).addClass("cur");
      $(".pho .box").removeClass("boxcur").eq(ind).addClass("boxcur");
    }
  });
  $(".bx-r .l").bind("click", function() {
    var $tli = $(".boxcur .bx-r .ul-img ul li:eq(0)");
    if ($tli.hasClass("cur")) {
      $tli.removeClass("cur").next().addClass("cur");
      $(".boxcur .bx-l img").removeClass("cur").eq(1).addClass("cur");
    }
    $(".boxcur .ul-img ul").append($(".boxcur .ul-img ul li:eq(0)"));
    $(".boxcur .bx-l").append($(".boxcur .bx-l img:eq(0)"));
  });

  $(".bx-r .r").bind("click", function() {
    var thds = $(".boxcur .bx-r .ul-img ul li").length - 1;
    var $tli = $(".boxcur .bx-r .ul-img ul li:eq(0)");
    if (!$tli.hasClass("cur")) {
      $(".boxcur .bx-r .ul-img ul li.cur").removeClass("cur").prev().addClass("cur");
      $(".boxcur .bx-l img.cur").removeClass("cur").prev().addClass("cur");
    }
    $(".boxcur .bx-r .ul-img ul").prepend($(".boxcur .bx-r .ul-img ul li:eq(" + thds + ")"));
    $(".boxcur .bx-l").prepend($(".boxcur .bx-l img:eq(" + thds + ")"));

  });

  $(".bx-r .ul-img ul").delegate("li", "click", function() {
    var $th = $(this),
      ind = $th.index();
    if (!$th.hasClass("cur")) {
      $(".tab-sig .boxcur .bx-r .ul-img ul li").removeClass("cur").eq(ind).addClass("cur");
      $(".tab-sig .boxcur .bx-l img").removeClass("cur").eq(ind).addClass("cur");
    }
  });

  $(".tball").click(function() {
    var $th = $(this),
      idx = $th.index();
    if (idx > 0) {
      $(".tball").removeClass("tlcur");
      $(".tball").removeClass("tlcurone");
      $(".tab-sig").removeClass("tballcur");
      $th.addClass("tlcur");
      $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
    } else {
      $(".tball").removeClass("tlcur");
      $(".tab-sig").removeClass("tballcur");
      $th.addClass("tlcurone");
      $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
    }
  });

  $(".tablenameto").click(function() {
    var $th = $(this),
      idx = $th.index() - 1;
    if (idx > 0) {
      $(".tball").removeClass("tlcur");
      $(".tball").removeClass("tlcurone");
      $(".tab-sig").removeClass("tballcur");
      $(".tball:eq(" + idx + ")").addClass("tlcur");
      $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
    } else {
      $(".tball").removeClass("tlcur");
      $(".tab-sig").removeClass("tballcur");
      $(".tball:eq(0)").addClass("tlcurone");
      $(".tab-sig:eq(0)").addClass("tballcur");
    }
    document.location.href = window.location.pathname + "#tabname"
    return false;
  });


  function scroll($scroll, opt) {

    if (!$scroll || $scroll instanceof jQuery == false) {
      return;
    }

    opt = $.extend({
      prev: '.prev',
      next: '.next',
      time: 3000,
      div: 'div',
      speed: 200, //滚动速度
      callback: function() {}
    }, opt || {});

    var speed = Math.max(opt.speed, 200),
      $div = $scroll.find(opt.div),
      $ul = $div.find('ul'),
      $li = $ul.find('li'),
      rW = $li.length * $li.outerWidth(true),
      divWidth = $div.width(),
      scrollWidth = opt.scrollWidth || divWidth,
      scroll = '-=' + scrollWidth + 'px',
      timer,
      player = function() {
        if ($ul.is(':animated')) {
          return;
        }
        var mL = parseInt($ul.css('marginLeft'));
        if (scroll == '-=' + scrollWidth + 'px') {
          if ((rW * 3 + mL) < 2 * divWidth) {
            $ul.css('marginLeft', rW + mL);
          }
        } else {
          if ((divWidth + mL) > 0) {
            $ul.css('marginLeft', mL - rW);
          }
        }

        $ul.animate({
          marginLeft: scroll
        }, 600, function() {
          opt.callback($scroll);
        });
        timer = setTimeout(player, opt.time);
      };

    if (rW < divWidth) {
      $scroll.find(opt.prev + ',' + opt.next).remove();
      return;
    }

    var html = $ul.html();
    $ul.append(html + html).css('marginLeft', -rW);
    $scroll.delegate(opt.prev + ',' + opt.next, 'click', function(event) {
      clearTimeout(timer);
      scroll = $(this).is(opt.prev) ? '+=' + scrollWidth + 'px' : '-=' + scrollWidth + 'px';
      player();
    });
    timer = setTimeout(player, 3000);
  }

  scroll($('div.brands .bd'))

  $('#bg a.tab-right').on('click', function(event) {
    event.preventDefault();
    if (isLogin['status']) {
      dialog({
        title: '在线报名',
        content: '<form class="join" action="/" class="myform">' +
          '       <input type="hidden" name="formid" value="15" />' +
          '       <input type="hidden" name="subtype" value="ajax" />' +
          '       <input type="hidden" name="dosubmit" value="在线报名6" />' +
          '       <table>' +
          '         <tr>' +
          '           <th><span>*</span>公司名称:</th>' +
          '           <td><input type="text" name="info[companyname]" id="companyname" /></td>' +
          '         </tr>' +
          '         <tr>' +
          '           <th>主营行业:</th>' +
          '           <td><input type="text" name="info[industry]" /></td>' +
          '         </tr>' +
          '         <tr>' +
          '           <th><span>*</span>联系人:</th>' +
          '           <td><input type="text" name="info[contact]" id="contact" /></td>' +
          '         </tr>' +
          '         <tr>' +
          '           <th><span>*</span>联系电话:</th>' +
          '           <td><input type="text" name="info[tel]" id="tel" /></td>' +
          '         </tr>' +
          '         <tr>' +
          '           <th>QQ:</th>' +
          '           <td><input type="text" name="info[qq]" /></td>' +
          '         </tr>' +
          '       </table>' +
          '       <span class="submit-btn"></span>' +
          '     </form>',
        okVal: '确认提交',
        ok: function() {
          var that = this;
          if ($("#companyname").val() == "") {
            alert("公司名称不能为空！");
            return false;
          }
          if ($("#contact").val() == "") {
            alert("联系人姓名不能为空！");
            return false;
          }
          if ($("#tel").val() == "") {
            alert("联系电话不能为空！");
            return false;
          }
          $.get('http://cncms.csc86.com/formguide/index.php', $('form.join').serializeArray(), function(data) {
            if (data.status == true) {
              alert('报名成功！');
              that.close();
            } else {
              alert('报名失败，请稍后重试！');
            }
          }, 'jsonp');
          return false;
        }
      })
    } else {
      alert('请登录后申请');
      location.href = 'http://login.csc86.com/?done=' + encodeURIComponent(location.href);
    }
  });



  function relfirend($id, $name) {
    var msg = '<div><textarea id="msg" name="" cols="60" rows="">给对方打个招呼</textarea></div><p class="tips" style="color:#888">提示：也可以直接点击“确定”发送请求。</p>';
    dialog({
      id: "addfriend1",
      content: msg,
      fixed: true,
      title: "发送好友请求",
      padding: "25px 50px 20px 30px",
      init: function() {
        $("#msg").bind("focus", function() {
          var $val = $(this).val(),
            defaultValue = $("#msg")[0].defaultValue;
          if ($val === defaultValue) {
            $(this).val("");
          }
        });
      },
      ok: function() {
        var defaultValue = $("#msg")[0].defaultValue,
          $msg = $.trim($("#msg").val());
        if ($msg === defaultValue) {
          $msg = "";
        }
        $.get('http://member.csc86.com/sns/home/addFriend.html', {
          "id": $id,
          "message": $msg,
          "relname": $name,
          "ajax": true
        }, function(data) {
          if ("2" == data.status) {
            dialog.alert(data.msg);
          } else if (data.status) {
            dialog.success(data.msg, 2);

          } else {
            dialog.alert(data.msg);
          }
        }, "jsonp");
      },
      cancel: function() {},
      lock: true
    });
  }

  $(document).delegate('a[data-f]', 'click', function(event) {
    event.preventDefault();
    var $id = $(this).data('f');
    if (isLogin['status']) {
      $.get('http://member.csc86.com/public/personal/username', function(data) {
        $name = $.trim(data.username);
        if ($name == "NotLogin") {
          alert('登录后才能加好友');
          location.href = 'http://login.csc86.com/?done=' + encodeURIComponent(location.href);
        } else if (!$name) {

          dialog({
            id: "addfriend0",
            content: sname,
            fixed: true,
            title: "请输入您的姓名",
            width: 280,
            padding: "10px 19px 10px 15px",
            init: function() {
              $("#uname").live("focus", function() {
                var $val = $(this).val(),
                  defaultValue = $("#uname")[0].defaultValue;
                if (!$val || $val === defaultValue) {
                  $(this).val("");
                  $("#tps").hide();
                }
              });
            },
            ok: function() {
              var defaultValue = $("#uname")[0].defaultValue,
                $name = $.trim($("#uname").val());
              if (!$name || $name === defaultValue) {
                $("#uname").focus();
                $("#tps").show();
                return false;
              }
              relfirend($id, $name);
            },
            cancel: function() {},
            lock: true
          });

        } else {
          relfirend($id);
        }
      }, "jsonp");

    } else {
      alert('登录后才能加好友');
      location.href = 'http://login.csc86.com/?done=' + encodeURIComponent(location.href);
    }
  }).delegate('a[data-e]', 'click', function(event) {
    event.preventDefault();
    var fuid = $(this).data('e');
    if (isLogin['status']) {
      $.post('http://member.csc86.com/public/personal/card', {
        "t": "change",
        "fuid": fuid
      }, function(data) {
        if ("sns_cardchange_000" == data.code) {
          dialog.success("交换成功");
        } else if ("sns_cardchange_003" == data.code) {
          dialog.success("名片已收");
        } else if ("login_fail" == data.code) {
          alert('登录后才能换名片');
          location.href = 'http://login.csc86.com/?done=' + encodeURIComponent(location.href);
        } else {
          dialog.alert("操作失败,请重试");
        }
      }, 'jsonp');
    } else {
      alert('登录后才能换名片');
      location.href = 'http://login.csc86.com/?done=' + encodeURIComponent(location.href);
    }
  });


});