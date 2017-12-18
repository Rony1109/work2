define(function(require, exports, module) {

  var selectall = require('selectall');
  var $opt = $('.operation-l');
  var $list = $('.g-list');
  var dialog = require('dialog');

  function del(ids) {
    dialog.confirm('删除后不可恢复，确认删除？', function() {
      ids = $.isArray(ids) ? ids : [ids];
      $.post('app.floorAreaDelete', {
        ids: '["' + ids.join('","') + '"]'
      }, function(data) {
        if (data.success === 'true') {
          dialog.success('删除成功！');
          setTimeout(function() {
            location.href = location.href;
          }, 1800);
        } else {
          dialog.alert(data.msg || '删除失败，请刷新后再试！');
        }
      }, 'json');
    });
  }

  function sort(data) {
    $.post('app.floorAreaUpdateSort', data, function(data) {
      if (data.success === 'true') {
        dialog.success('排列成功！');
        setTimeout(function() {
          location.href = location.href;
        }, 1800);
      } else {
        dialog.alert(data.msg || '排列失败，请刷新后再试！');
      }
    }, 'json');
  }


  $list.on('click', 'a.up', function(event) {
    event.preventDefault();
    var $t = $(this);
    var $tr = $t.parents('tr');
    var data = {};
    if ($tr.is(':first-child')) return alert('已经是第一个');
    var downSort = parseInt($tr.find('td:eq(3)').text(), 10);
    data.upFloorId = $tr.data('id');
    data.upSort = downSort - 1;
    data.downSort = downSort;
    data.downFloorId = $tr.prev().data('id');
    sort(data);
  }).on('click', 'a.down', function(event) {
    event.preventDefault();
    var $t = $(this);
    var $tr = $t.parents('tr');
    if ($tr.is(':last-child')) return alert('已经是最后一个');
    $tr.next().find('a.up').trigger('click');
  }).on('click', 'a.ico-del', function(event) {
    event.preventDefault();
    del($(this).parents('tr').data('id'));
  });

  $opt.on('click', 'input:button:not([onclick])', function(event) {
    event.preventDefault();
    if (selectall.checkCheckedLength()) {
      del(selectall.checked());
    }
  });

});