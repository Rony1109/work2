define(function(require, exports, module) {
  var dialog = require('dialog');
  var $form = $('form[action="app.floorAreaSave"]');

  $form.on('submit', function(event) {
    event.preventDefault();
    var $name = $form.find('[name="name"]');
    var name = $.trim($name.val());
    var floorId = $form.find('[name="floorId"]').val();
    var isHtml = $form.find(':checked').val();
    var msg;
    var data = [];
    if (name === '') {
      dialog.alert('楼层区域名称不能为空');
      $name.trigger('focus');
      return false;
    }

    $form.find('[name="itemName"]').each(function(index) {
      var name = $.trim(this.value);
      if (name === '') {
        msg = '楼层区域介绍不能为空';
        return false;
      }
      data.push('"name":"' + name + '"');
    });
    if (msg) {
      dialog.alert(msg);
      return false;
    }

    if (isHtml === 'true') {
      $form.find('[name="itemUrl"]').each(function(index) {
        var url = $.trim(this.value);
        if (url === '') {
          msg = '关联网页不能为空';
          return false;
        }
        data[index] += ',"url":"' + url + '"';
      });
    }

    if (msg) {
      dialog.alert(msg);
      return false;
    }

    $.post($form.attr('action'), {
      floorId: floorId,
      venueId: $form.find('[name="venueId"]').val(),
      name: name,
      isHtml: isHtml,
      floorItemData: '[{' + data.join('},{') + '}]'
    }, function(data) {
      if (data.success === 'true') {
        dialog.success(data.msg || '成功');
        setTimeout(function() {
          history.back();
        }, 1800);
      } else {
        dialog.alert(data.msg || '操作失败，请刷新后再试！');
      }
    }, 'json');
  }).on('change', '[name="isHtml"]', function(event) {
    var isHtml = this.value === 'true';
    if (isHtml) {
      $form.find('tr:hidden').show();
    } else {
      $form.find('[name="itemUrl"]').parents('tr').hide();
    }
  }).on('click', '.add-item', function(event) {
    event.preventDefault();
    var $tr = $(this).parents('tr').next();
    var isHtml = $form.find(':checked').val() === 'true' ? '' : ' style="display:none"';
    $tr.after(['<tr>',
      '    <th><i class="star">*</i>楼层区域介绍：</th>',
      '    <td>',
      '        <input type="text" name="itemName" value=""/>',
      '        <a href="javascript:" class="add-item">+</a>',
      '        <a href="javascript:" class="reduce-item">-</a>',
      '    </td>',
      '</tr>',
      '<tr' + isHtml + '>',
      '    <th><i class="star">*</i>关联网页：</th>',
      '    <td>',
      '        <input type="text" name="itemUrl" value=""/>',
      '    </td>',
      '</tr>'
    ].join(''));
  }).on('click', '.reduce-item', function(event) {
    event.preventDefault();
    if ($form.find('.add-item').length === 1) {
      return dialog.alert('最少保留一项');
    }
    var $tr = $(this).parents('tr');
    $tr.next().remove();
    $tr.remove();
  });

});