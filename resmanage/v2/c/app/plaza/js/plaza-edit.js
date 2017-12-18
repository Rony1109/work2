define(function(require, exports, module) {
  var $form = $('form[action="app.venueSave"]');
  var $hasfloor = $form.find('[name="has_floor"]');
  var $url = $hasfloor.parents('tr').next();
  var dialog = require('dialog');
  $hasfloor.on('change', function(event) {
    $url[this.value === 'true' ? 'hide' : 'show']();
  });

  $form.on('submit', function(event) {
    event.preventDefault();
    var name = $.trim($form.find('[name="name"]').val());
    var img = $.trim($form.find('[name="imgKey"]').val());
    if (name === '') {
      dialog.alert('广场名称不能为空');
      return false;
    }
    if (img === '') {
      dialog.alert('图片不能为空');
      return false;
    }
    $.post($form.attr('action'), $form.serializeArray(), function(data) {
      if (data.success === 'true') {
        dialog.success(data.msg || '成功');
        setTimeout(function() {
          history.back();
        }, 1800);
      } else {
        dialog.alert(data.msg || '操作失败，请刷新后再试！');
      }
    }, 'json');
  });

});