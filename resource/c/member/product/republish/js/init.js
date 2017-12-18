/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  var dialog = require('//res.csc86.com/v2/m/dialog/js/init');
  var $bd = $('.af-bd');
  var $ul = $('.rep-list');
  var prevBatch;

  function editBatch(id) {
    var $li = $(id).parents('li');
    prevBatch = $li.clone();
    $li.addClass('item-edit').removeClass('item-dis');
  }

  $bd.on('click', '.btn-add-rep', function addRep() { //新加批次
    if ($ul.length === 0) {
      dialog.alert('<span>只有城商通会员才能享受该服务，点击<a target="_blank" href="//cncms.csc86.com/special/yunyingguanli/cst/">开通城商通</a>！</span> ');
      return;
    }
    if ($bd.find('.item-edit').length > 0) {
      dialog.alert('同一时间内只能操作新增或者修改');
      return;
    }
    var $t = $(this);
    if ($t.data('lodaing')) return;
    $t.data('lodaing', true);
    $.get($t.data('url'), function(data) {
      $t.removeData('lodaing');
      if (data.status === '1') {
        $bd.find('.empty-republish').remove();
        var batch = ($ul.data('total') || 0) + 1;
        $ul.prepend(['<li class="item item-new item-edit" data-batch="' + batch + '"><form>',
          '        <div class="g-cf item-hd">',
          '          <div class="g-fl item-no">批次：' + batch + '</div>',
          '          <div class="g-fl item-type">',
          '            <label><input type="radio" name="type" value="0" checked/>单次发布</label>',
          '          </div>',
          '<div class="g-fl item-once">',
          '  发布时间：',
          '  <input name="releaseTime" type="text" class="date" value=""/>',
          '</div>',
          '          <a href="javascript:" class="g-fr rep-ico item-close"></a>',
          '        </div>',
          '        <div class="item-bd">',
          '          <table width="100%">',
          '            <thead>',
          '              <tr>',
          '                <td width="140"></td>',
          '                <td>产品信息</td>',
          '                <td width="100">发布时间</td>',
          '                <td width="160" class="g-tc">在线交易</td>',
          '                <td width="120">操作</td>',
          '              </tr>',
          '            </thead>',
          '            <tbody>',
          '            </tbody>',
          '          </table>',
          '        </div>',
          '        <div class="g-cf g-tr item-ft">',
          '          <a href="javascript:" class="btn-repadd"  data-url="/product/sell/selectProduct.html">添加产品</a>',
          '          <a href="javascript:" class="btn-repsave" data-url="/product/sell/rePublish.html" data-add="true" style="display:none">保存</a>',
          '        </div>',
          '      </form></li>'
        ].join(''));
      } else {
        dialog.alert(data.error || '不能添加批次');
      }
    }, 'json');
  }).on('click', '.btn-repadd', function() { //选择产品
    var $t = $(this);
    var $li = $t.parents('li');
    var productIds = [];
    $li.find('tbody tr').each(function() {
      productIds.push($(this).data('pid'));
    });

    dialog.open($t.data('url') + '?productIds=' + productIds.join(), {
      title: '选择产品',
      width: 780,
      height: 450,
      fixed: true,
      lock: true,
      padding: 0,
      opacity: .3,
      drag: false,
      init: function() {
        window.selectDialog = this;
        window.$wrap = $li;
      }
    });
  }).on('click', '.btn-repedit', function() { //编辑效果
    $bd.find('.item-new').remove();
    var $edit = $bd.find('.item-edit');
    var t = this;
    if ($edit.length > 0) {
      dialog.confirm('<span class="g-fs14">当前修改未保存，是否放弃保存？</span>', function() {
        $edit.find('.btn-repcancel').trigger('click');
        editBatch(t);
      });
    } else {
      editBatch(t);
    }
  }).on('click', '.btn-repcancel', function() { //取消编辑效果
    var $li = $(this).parents('li');
    $li.after(prevBatch);
    $li.remove();
  }).on('click', '.btn-repsave', function() {
    var $t = $(this);
    var $li = $t.parents('li');
    if ($t.data('lodaing')) return;
    $t.data('lodaing', true);
    $.post($t.data('url'), $t.parents('form').serializeArray(), function(data) {
      if (data.status === '1') {
        dialog.success('保存成功！', 2, function() {
          location.href = $t.data('add') ? location.pathname : location.href;
        });
      } else {
        $.type(data.error) === 'string' ? dialog.alert(data.error || '保存失败，请稍后重试！') : $.each(data.error, function(k, v) {
          if (v) {
            dialog.alert(v);
            return false;
          }
        });
        if (data.ids) {
          $.each(data.ids, function(k, v) {
            $li.find('tr[data-pid="'+v+'"]').addClass('exist');
          });
        }
      }
      $t.removeData('lodaing');
    }, 'json');
  }).on('click', '.item-edit .opt-del', function() { //删除产品
    var $tr = $(this).parents('tr');
    var $tbody = $tr.parent();
    dialog.confirm('<span class="g-fs14">确定要取消发布吗？</span>', function() {
      $tr.fadeOut(400, function() {
        $tr.remove();
        if ($tbody.find('tr').length === 0) {
          $tbody.parents('li').find('.btn-repsave').hide();
        }
      });
    });
  }).on('click', '.item-close', function() {
    var $t = $(this);
    if ($t.data('lodaing')) return;
    $t.data('lodaing', true);
    dialog.confirm('<span class="g-fs14">是否确定删除该批次？</span>', function() {
      if (!$t.data('url')) {
        dialog.success('删除成功！', 2, function() {
          location.href = location.href;
        });
        return;
      }
      $.get($t.data('url'), function(data) {
        if (data.status === '1') {
          dialog.success('删除成功！', 2, function() {
            location.href = location.href;
          });
        } else {
          dialog.alert(data.error || '删除失败，请稍后重试！');
        }
        $t.removeData('lodaing');
      }, 'json');
    }, function() {
      $t.removeData('lodaing');
    });
  });


  function selectDate() {
    $ul.on('click', '.date', function() {
      WdatePicker({
        minDate: '%y-%M-%d'
      });
    });
  }

  if (window.WdatePicker) {
    selectDate();
  } else {
    require.async('//res.csc86.com/v2/l/My97DatePicker/4.8/WdatePicker.js', selectDate);
  }
});