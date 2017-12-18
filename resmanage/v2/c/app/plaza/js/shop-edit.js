define(function(require, exports, module) {
  var $form = $('form[action="app.shopAreaSave"]');
  var dialog = require('dialog');

  $form.on('submit', function(event) {
    event.preventDefault();
    var name = $.trim($form.find('[name="name"]').val());
    if (name === '') {
      dialog.alert('楼层区域名称不能为空');
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