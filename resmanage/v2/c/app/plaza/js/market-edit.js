define(function(require, exports, module) {
  var $form = $('form[action="app.professionMarketSave"]');
  var dialog = require('dialog');

  $form.on('submit', function(event) {
    event.preventDefault();
    var name = $.trim($form.find('[name="name"]').val());
    var description = $.trim($form.find('[name="description"]').val());
    var img = $.trim($form.find('[name="imgKey"]').val());
    if (name === '') {
      dialog.alert('专业市场名称不能为空');
      return false;
    }
    if (description === '') {
      dialog.alert('描述不能为空');
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