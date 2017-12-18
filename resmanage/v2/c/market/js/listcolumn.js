define(function(require, exports, module) {
  function del(ids) {
    artDialog.confirm('删除后不可恢复，确认删除？', function() {
      $.post('guang.deleteColumn', {
        ids: ids
      }, function(data) {
        if (data['status'] == 1) {
          artDialog('删除成功！');
          setTimeout(function() {
            location.reload();
          }, 1800);
        } else {
          artDialog.alert((data['info'] || '删除失败，请刷新后再试！'));
        }
      }, 'jsonp');
    });
  }

  var selectAll = require('selectall');
  $('.operation-l').delegate(':button:first', 'click', function(event) {
    if (selectAll.checkCheckedLength()) {
      del(selectAll.checked().join());
    }
  });
  $('div.g-list').delegate('a.ico-del', 'click', function(event) {
    event.preventDefault();
    del($(this).parents('tr').find(':first-child :checkbox').val());
  });
});