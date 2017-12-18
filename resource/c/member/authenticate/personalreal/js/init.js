/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  require('l/jqueryfileupload/js/vendor/jquery.ui.widget.js');
  require('l/jqueryfileupload/js/jquery.iframe-transport.js');
  require('l/jqueryfileupload/js/jquery.fileupload.js');
  var dialog = require('//res.csc86.com/v2/m/dialog/js/init');


  var $form = $('form[action="personSave"]');
  var $cardA = $form.find('input[name="idCardAImg"]');
  var $cardB = $form.find('input[name="idCardBImg"]');
  var loading;
  var opt = {
    dataType: 'json',
    progressall: function() {
      loading = dialog.loading('图片正在上传中，请稍后……');
    },
    add: function(e, data) {
      var fileInfo = data.files[0];
      var regx = /\.(jpe?g|png)$/i;
      if (!regx.test(fileInfo.name)) {
        dialog.tip("仅支持jpg、png格式图片，请选择正确的图片格式！", 2.5);
        return;
      }
      if (fileInfo.size > 1024 * 200) {
        dialog.tip("图片大小不得超过200KB！", 2.5);
        return;
      }
      data.submit();
    },
    done: function(e, data) {
      loading.close();
      var result = data.result;
      if (result.result == "success") {
        var $div = $(e.target).next().val(result.key).parent('div');
        $div.find('img').attr('src', '//img.csc86.com' + result.key);
      } else {
        dialog.tip(result.msg);
      }
    },
    fail: function(e, data) {
      loading.close();
      dialog.tip('上传失败，请稍后重试！');
    }
  };
  $('#upCardA').fileupload($.extend(opt, {}));
  $('#upCardB').fileupload($.extend(opt, {}));


  $form.bind('submit', function() {
    var $name = $form.find('[name="name"]');
    var $no = $form.find('[name="idCardNo"]');
    var $phone = $form.find('[name="telephone"]');

    if ($name.val() == '') {
      dialog.tip('姓名不能为空！');
      return false;
    }

    if ($name.val().length < 2 || $name.val().length > 8) {
      dialog.tip('姓名长度在2-8个字之间！');
      return false;
    }

    if ($no.val() == '') {
      dialog.tip('身份证号码不能为空！');
      return false;
    }

    if (!/^[1-9]\d{13}(\d{3})?[\dx]$/i.test($no.val())) {
      dialog.tip('身份证号码只能为15或18位数字和字母x，且只能最后一位为字母x！');
      return false;
    }

    if ($phone.val() != '' && !/^1\d{10}$/.test($phone.val())) {
      dialog.tip('手机号码只能为1开头的11位数字！');
      return false;
    }

    if ($cardA.val() == '') {
      dialog.tip('身份证正面图像不能为空！');
      return false;
    }

    if ($cardB.val() == '') {
      dialog.tip('身份证反面图像不能为空！');
      return false;
    }

  });

  $('a[href="personUndo"]').bind('click', function(event) {
    event.preventDefault();
    dialog.confirm('确认撤消本次认证申请', function() {
      location.href = 'personUndo';
    });
  });


});