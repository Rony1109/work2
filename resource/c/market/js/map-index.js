define(function(require, exports, module) {
  var template = require('./template');
  var showSuccess;
  var start = 0;
  var page = require('./page');
  $(document).delegate('.hl-page a[data-start]', 'click', function() {
    event.preventDefault();
    start = $(this).data('start');
    list();
  });

  function list() {
    var $form = $('div.help-form');
    $.get('//market.csc86.com/service.html', {
      start: start
    }, function(data) {
      if (data['status']) {
        var html = '<div class="g-h20"></div><div class="help-list">' +
          '  <h2 class="list-hd g-fl">求助列表</h2>' +
          '  <div class="g-fr hl-page top-page">' +
          '      <span>当前共有：' + data['data']['totalRows'] + '条记录</span>' +
          page(start, data['data']['totalRows'], data['data']) +
          '  </div>' +
          '  <div class="g-h15"></div>' +
          '  <ul class="list-bd">';

        var list = data['data']['list'];

        for (var i = 0; i < list.length; i++) {
          html += '    <li class="item">' +
            '      <div class="item-hd g-cf">' +
            '        <div class="g-fl">昵称：' + list[i]['name'] + '　　咨询类别：' + list[i]['typevalue'] + '</div>' +
            '        <div class="g-fr">' + list[i]['time'] + '</div>' +
            '      </div>' +
            '      <div class="g-cf item-q">' +
            '        <span class="g-fl icon"></span>' +
            '        ' + list[i]['q'] + '</div>' +
            (list[i]['a'] ? '      <div class="g-cf item-a">' +
            '        <span class="g-fl icon"></span>' +
            '        <strong>华姐回复：</strong>' +
            '        <p>' + list[i]['a'] + '</p>' +
            '      </div>' : '') +
            '    </li>';
        }

        html += '  </ul>' +
          '  <div class="g-h10"></div>' +
          '</div>';
        $form.nextAll().remove();
        $form.after(html);
      } else {
        alert('加载失败，请稍后重试！');
        location.hash = '';
      }
    }, 'jsonp');
  }
  $(document).delegate('div.help-form form', 'submit', function(event) {
    event.preventDefault();
    var $form = $(this),
      $success = $form.find('div.success'),
      q = $form.find('[name=type]:checked').val(),
      $c = $form.find('textarea'),
      c = $.trim($c.val());
    clearTimeout(showSuccess);
    $success.hide();
    if (q == '5') {
      var $q = $form.find('[name=typevalue]');
      if ($.trim($q.val()).length == 0) {
        $q.addClass('error').trigger('focus');
        return false;
      } else {
        $q.removeClass('error');
      }
    }
    if (c.length == 0) {
      $c.addClass('error').trigger('focus');
      return false;
    } else {
      $c.removeClass('error');
    }
    $.post('//market.csc86.com/api/qa/ask', $form.serializeArray(), function(data) {
      if (data['status'] == false) { //失败
        if (data['isContainBadWord']) {
          alert('内容包含敏感词语！');
        }
        return;
      }
      start = 0;
      list();
      $form.trigger('reset');
      $success.show();
      showSuccess = setTimeout(function() {
        $success.fadeOut();
      }, 3000);
    }, 'jsonp');
  }).delegate('div.help-form [name="type"]', 'change', function(event) {
    var val = $(this).val(),
      $other = $(this).parents('div.hf-val').find('[name=typevalue]');
    if (val == '5') {
      $other.prop('disabled', false).trigger('focus');
    } else {
      $other.prop('disabled', true).removeClass('error');
    }
  }).delegate('div.help-form .error', 'blur', function(event) {
    var $t = $(this);
    if ($.trim($t.val()).length > 0) {
      $t.removeClass('error');
    }
  });
  module.exports = function(params, AMap, mapData) {

    if (params['view'] == 'service') {
      template.$bd.find('div.content-loading').remove();
      $dialog = template.dialog();

      $dialog.html('<a href="#" class="back">返回</a><div class="dialog-scroll"><div class="dialog-scroll-bd"><div class="g-h20"></div><div class="g-cf help-form">' +
        '  <h2 class="list-hd">办事求助</h2>' +
        '  <form action="#!ask" methond="post">' +
        '    <div class="g-ffy success">咨询成功！</div>' +
        '    <ul>' +
        '      <li class="g-cf">' +
        '        <span class="hf-key">咨询类别：</span>' +
        '        <div class="hf-val">' +
        '          <label for="">' +
        '            <input type="radio" name="type" value="1" checked/>找品牌商铺' +
        '          </label>' +
        '          <label for="">' +
        '          <input type="radio" name="type" value="2"/>找促销活动' +
        '          </label>' +
        '          <label for="">' +
        '          <input type="radio" name="type" value="3"/>找吃饭地方' +
        '          </label>' +
        '          <label for="">' +
        '          <input type="radio" name="type" value="4"/>找休闲地方' +
        '          </label>' +
        '          <label for="">' +
        '          <input type="radio" name="type" value="5"/>其他' +
        '          <input type="text" name="typevalue" class="text" value="" maxlength="10" disabled/>' +
        '          </label>' +
        '        </div>' +
        '      </li>' +
        '      <li class="g-cf">' +
        '        <span class="hf-key">咨询内容：</span>' +
        '        <div class="hf-val">' +
        '          <textarea name="content" class="text" style="width:490px;height:110px" maxlength="80"></textarea>' +
        '          <p>请详细描述您的问题，可以输入80字。</p>' +
        '        </div>' +
        '      </li>' +
        '      <li class="g-cf">' +
        '        <span class="hf-key">昵　　称：</span>' +
        '        <div class="hf-val"><input type="text" name="name" class="text" value="" maxlength="10"/></div>' +
        '      </li>' +
        '      <li class="g-cf">' +
        '        <span class="hf-key">联系电话：</span>' +
        '        <div class="hf-val"><input type="text" name="phone" class="text" value="" maxlength="15"/></div>' +
        '      </li>' +
        '      <li class="g-cf">' +
        '        <div class="hf-val"><input type="submit" value="提 交" class="btn"/> <span>也可以直接拨打客服热线：<strong>0755-61862218　400-184-8666</strong></span></div>' +
        '      </li>' +
        '    </ul>' +
        '  </form>' +
        '</div>' +
        '</div>' +
        '</div></div>').parent().addClass('service-dialog');

      list();

      template.dialogScroll($dialog);
    } else {
      $('div.dialog').remove();
    }
    template.$bd.html(mapData.$index);
    template.itemScroll();
  };
});