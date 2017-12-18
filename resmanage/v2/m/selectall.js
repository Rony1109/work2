define(function(require, exports, module) {
  var $table = $('div.g-list > table');
  $table.delegate('tr :first-child input:checkbox', 'change', function() {
    var $t = $(this);
    var isList = $t.parents('tbody').length > 0;
    var $table = $t.parents('table');
    var $theadCheckbox = $table.find('thead > tr :first-child input:checkbox,tfoot > tr :first-child input:checkbox');
    var isAllChecked = $table.find('tbody > tr :first-child input:not(:checked)').length == 0;
    if (isList) {
      $theadCheckbox.prop('checked', isAllChecked);
      return;
    }
    var $listCheckbox = $table.find('tbody > tr :first-child input:checkbox');
    $listCheckbox.prop('checked', this.checked);
  });

  function checked() {
    var checked = [];
    $table.find('tbody > tr :first-child input:checked').each(function() {
      checked.push(this.value);
    });
    return checked;
  }

  exports.checked = checked;

  exports.checkCheckedLength = function() {
    if (checked().length > 0) {
      return true;
    }
    window.art ? artDialog.alert('请先选择您要操作的项！') : alert('请先选择您要操作的项！');
    return false;
  };
});