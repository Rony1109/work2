define(function(require, exports, module) {
  require('WdatePicker');
  require('autocomplete')(); //自动填充搜索项
  require('page').init();
  $('form[data-autocomplete]').bind('submit', function(event) {
    var $f = $(this),
      start = $f.find('input[name="startTime"]').val(),
      end = $f.find('input[name="endTime"]').val();
    if ((start + end).length === 10) {
      alert((start.length === 0 ? '开始' : '结束') + '时间不能为空！');
      return false;
    }
    var verify = true;
    $f.find('select[name^="sel_"]').each(function() {
      var $s = $(this);
      var name = $s.attr('name').substr(-2);
      var $min = $('input[name="min' + name + '"]');
      var $max = $('input[name="max' + name + '"]');
      if ($s.val() !== '') {
        if (name === '_1') {
          if (/^\d+$/.test($min.val()) === false) {
            alert($s.find(':selected').text() + '的开始值只能为正整数！');
            verify = false;
            $min.trigger('focus');
            return false;
          }

          if (/^\d+$/.test($max.val()) === false) {
            alert($s.find(':selected').text() + '的结束值只能为正整数！');
            verify = false;
            $max.trigger('focus');
            return false;
          }
        }

        if (name === '_2') {
          if (/^\d+(\.\d{1,2})?$/.test($min.val()) === false) {
            alert($s.find(':selected').text() + '的开始值只能为数字，且小数点长度不能超过2位！');
            verify = false;
            $min.trigger('focus');
            return false;
          }

          if (/^\d+(\.\d{1,2})?$/.test($max.val()) === false) {
            alert($s.find(':selected').text() + '的结束值只能为数字，且小数点长度不能超过2位！');
            verify = false;
            $max.trigger('focus');
            return false;
          }
        }

        if (parseFloat($min.val()) > parseFloat($max.val())) {
          alert($s.find(':selected').text() + '开始值不能大于结束值！');
          verify = false;
          $min.trigger('focus');
          return false;
        }

      }
    });
    if ($f.find('input[name="currpage"]').length > 0) {
      $f.find('input[name="currpage"]').val(1);
    }
    return verify;
  }).delegate('input[name$="Time"]','click',function(){
    $(this).next().trigger('click');
  }).find('select').bind('change', function() {
    var $s = $(this);
    var name = $s.attr('name').substr(-2);
    var $input = $('input[name$="' + name + '"]');
    if ($s.val() !== '') {
      $input.prop('disabled', false);
    } else {
      $input.val('').prop('disabled', true);
    }
  }).trigger('change');
});