/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  var dialog = require('//res.csc86.com/v2/m/dialog/js/init');
  var $bd = $('.af-bd');
  var $ul = $('.rec-list');
  var prevBatch;
  var t = new Date();
  var month = t.getMonth() + 1;
  month = month > 9 ? month : ('0' + month);
  var date = t.getFullYear() + '-' + month + '-' + t.getDate();

  function updateTbody($tbody) {
    var $tr = $tbody.find('tr');
    $tr.each(function(index) {
      var $t = $(this);
      index = index + 1;
      $t.find('td:first').html(index + '<input type="hidden" name="displayOrder[]" value="' + index + '"/>');
      $t.find('.rec-sort').html('<a href="javascript:" class="opt-up">上移</a><a href="javascript:" class="opt-down">下移</a>');
    });
    $tr.filter(':first').find('.rec-sort').prepend('<span class="opt-up">上移</span>').find('a.opt-up').remove();
    $tr.filter(':last').find('.rec-sort').append('<span class="opt-down">下移</span>').find('a.opt-down').remove();
  }

  function editBatch(id) {
    var $li = $(id).parents('li');
    prevBatch = $li.clone();
    $li.addClass('item-edit').removeClass('item-dis');
  }

  $bd.on('click', '.btn-add-rec', function addRec() { //新加推荐
	var $t = $(this);
    if ($bd.find('.item-edit').length > 0) {
      dialog.alert('同一时间内只能操作新增或者修改');
      return;
    }
    if ($t.data('lodaing')) return;
    $t.data('lodaing', true);
    $.get($t.data('url'), function(data) {
      $t.removeData('lodaing');
      if (data.status === '1') {
        $bd.find('.empty-recommend').remove();
        var batch = ($ul.data('total') || 0) + 1;
        $ul.prepend(['<li class="item item-new item-edit" data-batch="' + batch + '"><form>',
          '        <div class="g-cf item-hd">',
          '          <div class="g-fl item-no">批次：' + batch + '</div>',
          '          <div class="g-fl item-type">',
          '            <label><input type="radio" name="recommendType" value="0" checked/>单次推荐</label>',
          '            <label><input type="radio" name="recommendType" value="1"/>循环推荐</label>',
          '          </div>',
          '          <div class="g-fl item-once">',
          '            <input type="text" name="singleStart[0]" class="date" value="' + date + '"/><input type="text" name="singleStart[1]" class="time" value="00:00"/><span class="time-c"><a href="javascript:" class="u-time"><i></i></a><a href="javascript:" class="d-time"><i></i></a></span>~<input type="text" name="singleEnd[0]" class="date" value="' + date + '"/><input type="text" name="singleEnd[1]" class="time" value="23:59"/><span class="time-c"><a href="javascript:" class="u-time"><i></i></a><a href="javascript:" class="d-time"><i></i></a></span>',
          '          </div>',
          '          <div class="g-fl item-times g-dn">',
          '            <select name="circleWeek">',
          '              <option value="">选择循环周期</option>',
          '              <option value="MON">每周一</option>',
          '              <option value="TUE">每周二</option>',
          '              <option value="WED">每周三</option>',
          '              <option value="THU">每周四</option>',
          '              <option value="FRI">每周五</option>',
          '              <option value="SAT">每周六</option>',
          '              <option value="SUN">每周日</option>',
          '            </select>',
          '            <input type="text" name="circleStart" class="time" value="00:00"/><span class="time-c"><a href="javascript:" class="u-time"><i></i></a><a href="javascript:" class="d-time"><i></i></a></span>~<input type="text" name="circleEnd" class="time" value="23:59"/><span class="time-c"><a href="javascript:" class="u-time"><i></i></a><a href="javascript:" class="d-time"><i></i></a></span>',
          '          </div>',
          '          <a href="javascript:" class="g-fr rec-ico item-close"></a>',
          '        </div>',
          '        <div class="item-bd">',
          '          <table width="100%">',
          '            <thead>',
          '              <tr>',
          '                <td width="70" class="g-tc">序号</td>',
          '                <td width="120" class="rec-thumb">缩略图</td>',
          '                <td>信息标题</td>',
          '                <td width="170" class="rec-sort">排序</td>',
          '                <td width="120">操作</td>',
          '              </tr>',
          '            </thead>',
          '            <tbody>',
          '            </tbody>',
          '          </table>',
          '        </div>',
          '        <div class="g-cf g-tr item-ft">',
          '<div class="edit-btn">',
          '          <a href="javascript:" class="btn-recadd" data-url="/shop/product.html">添加产品</a>',
          '          <a href="javascript:" class="btn-recsave" data-url="/shop/showcaseRecommend.html" data-add="true" style="display:none">保存</a>',
          '</div>          <div class="show-btn">',
          '          <a href="javascript:" class="btn-recedit">修改</a></div>',
          '        </div>',
          '      </form></li>'
        ].join(''));
      } else {
        dialog.alert(data.error || '不能添加批次');
      }
    }, 'json');
  }).on('change', '[name="recommendType"]', function() { //推荐类型
    var val = this.value;
    var $wrap = $(this).parents('.item-hd');
    $wrap.find('.item-' + (val === '0' ? 'once' : 'times')).removeClass('g-dn');
    $wrap.find('.item-' + (val === '0' ? 'times' : 'once')).addClass('g-dn');
  }).on('click', '.time-c a', function() { //时间选择
    var $t = $(this);
    var action = $t.attr('class') === 'u-time' ? 1 : -1;
    var $timeC = $t.parents('span.time-c');
    var $time = $timeC.prev();
    if ($time.val() === '') return;
    var time = $time.val().split(':');

    time[0] = parseInt(time[0], 10);
    time[1] = parseInt(time[1], 10);

    time[1] = time[1] + action;

    if (time[1] === -1) {
      time[1] = 59;
      time[0] -= 1;
    }

    if (time[1] === 60) {
      time[1] = 00;
      time[0] += 1;
    }

    if (time[0] === -1) {
      time[0] = 23
    }
    if (time[0] === 24) {
      time[0] = 0
    }

    if (time[0] < 10) {
      time[0] = '0' + time[0];
    }

    if (time[1] < 10) {
      time[1] = '0' + time[1];
    }


    $time.val(time.join(':'));
  }).on('blur', '.time', function() { //离开时验证时间格式
    var $t = $(this);
    var time = $(this).val();

    if (time === '') return;

    if (!/^\d{1,2}\:\d{1,2}$/.test(time)) {
      alert('请输入正确的时间格式！');
      $t.trigger('select');
      return;
    }
    time = time.split(':');
    time[0] = parseInt(time[0], 10);
    time[1] = parseInt(time[1], 10);

    if (time[0] > 23 || time[1] > 59) {
      alert('请输入正确的时间格式！');
      $t.trigger('select');
      return;
    }

    if (time[0] < 10) {
      time[0] = '0' + time[0];
    }

    if (time[1] < 10) {
      time[1] = '0' + time[1];
    }

    $t.val(time.join(':'));
  }).on('click', '.btn-recadd', function() { //选择产品
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
  }).on('click', '.btn-recedit', function() { //编辑效果
    $bd.find('.item-new').remove();
    var $edit = $bd.find('.item-edit');
    var t = this;
    if ($edit.length > 0) {
      dialog.confirm('<span class="g-fs14">当前修改未保存，是否放弃保存？</span>', function() {
        $edit.find('.btn-reccancel').trigger('click');
        editBatch(t);
      });
    } else {
      editBatch(t);
    }
  }).on('click', '.btn-reccancel', function() { //取消编辑效果
    var $li = $(this).parents('li');
    $li.after(prevBatch);
    $li.remove();
  }).on('click', '.item-edit .opt-del', function() { //删除产品
    var $tr = $(this).parents('tr');
    var $tbody = $tr.parent();
    dialog.confirm('<span class="g-fs14">确定要取消推荐吗？</span>', function() {
      $tr.fadeOut(400, function() {
        $tr.remove();
        updateTbody($tbody);
        if ($tbody.find('tr').length === 0) {
          $tbody.parents('li').find('.btn-recsave').hide();
        }
      });
    });
  }).on('click', '.item-edit a.opt-up', function() { //上移产品
    var $tr = $(this).parents('tr');
    var $tbody = $tr.parent();
    $tr.insertBefore($tr.prev());
    updateTbody($tbody);
  }).on('click', '.item-edit a.opt-down', function() { //下移产品
    var $tr = $(this).parents('tr');
    var $tbody = $tr.parent();
    $tr.insertAfter($tr.next());
    updateTbody($tbody);
  }).on('click', '.btn-recsave', function() {
    var $t = $(this);
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
      }
      $t.removeData('lodaing');
    }, 'json');
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
      var config = {
        minDate: '%y-%M-%d'
      };
      var $t = $(this);
      var $once = $t.parent();
      var $s = $once.find('.date:first');
      var $e = $once.find('.date:last');
      var s = $s.val();
      var e = $e.val();
      if ($t.is($s)) {
        if (e) {
          config.maxDate = e;
        }

      }
      if ($t.is($e)) {
        if (s) {
          config.minDate = s;
        }
      }
      WdatePicker(config);
    });
  }

  if (window.WdatePicker) {
    selectDate();
  } else {
    require.async('//res.csc86.com/v2/l/My97DatePicker/4.8/WdatePicker.js', selectDate);
  }

	// 新手引导  2015/8/3 and by guoeng
	require("//res.csc86.com/v2/l/bootstrap-tour/css/bootstrap-tour-standalone.css");
	require("//res.csc86.com/v2/l/bootstrap-tour/js/bootstrap-tour-standalone.js");
	var tour;
    var step2 = '<ul id="showcaseRecommend-step-2"class="rec-list"><li class="item item-new item-edit"data-batch="1"><form><div class="g-cf item-hd"><div class="g-fl item-no">批次：1</div><div class="g-fl item-type"><label><input type="radio"name="recommendType"value="0"checked="">单次推荐</label><label><input type="radio"name="recommendType"value="1">循环推荐</label></div><div class="g-fl item-once"><input type="text"name="singleStart[0]"class="date"value="2015-08-4"><input type="text"name="singleStart[1]"class="time"value="00:00"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span>~<input type="text"name="singleEnd[0]"class="date"value="2015-08-4"><input type="text"name="singleEnd[1]"class="time"value="23:59"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span></div><div class="g-fl item-times g-dn"><select name="circleWeek"><option value="">选择循环周期</option><option value="MON">每周一</option><option value="TUE">每周二</option><option value="WED">每周三</option><option value="THU">每周四</option><option value="FRI">每周五</option><option value="SAT">每周六</option><option value="SUN">每周日</option></select><input type="text"name="circleStart"class="time"value="00:00"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span>~<input type="text"name="circleEnd"class="time"value="23:59"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span></div><a href="javascript:"class="g-fr rec-ico item-close"></a></div><div class="item-bd"><table width="100%"><thead><tr><td width="70"class="g-tc">序号</td><td width="120"class="rec-thumb">缩略图</td><td>信息标题</td><td width="170"class="rec-sort">排序</td><td width="120">操作</td></tr></thead><tbody></tbody></table></div><div class="g-cf g-tr item-ft"><div class="edit-btn"><a href="javascript:"class="btn-recadd"data-url="/shop/product.html">添加产品</a><a href="javascript:"class="btn-recsave"data-url="/shop/showcaseRecommend.html"data-add="true"style="display:none">保存</a></div><div class="show-btn"><a href="javascript:"class="btn-recedit">修改</a></div></div></form></li></ul>';
	var step3 = '<ul id="showcaseRecommend-step-3"class="rec-list"><li class="item item-new item-edit"data-batch="1"><form><div class="g-cf item-hd"><div class="g-fl item-no">批次：1</div><div class="g-fl item-type"><label><input type="radio"name="recommendType"value="0"checked="">单次推荐</label><label><input type="radio"name="recommendType"value="1">循环推荐</label></div><div class="g-fl item-once"><input type="text"name="singleStart[0]"class="date"value="2015-08-4"><input type="text"name="singleStart[1]"class="time"value="00:00"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span>~<input type="text"name="singleEnd[0]"class="date"value="2015-08-4"><input type="text"name="singleEnd[1]"class="time"value="23:59"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span></div><div class="g-fl item-times g-dn"><select name="circleWeek"><option value="">选择循环周期</option><option value="MON">每周一</option><option value="TUE">每周二</option><option value="WED">每周三</option><option value="THU">每周四</option><option value="FRI">每周五</option><option value="SAT">每周六</option><option value="SUN">每周日</option></select><input type="text"name="circleStart"class="time"value="00:00"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span>~<input type="text"name="circleEnd"class="time"value="23:59"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span></div><a href="javascript:"class="g-fr rec-ico item-close"></a></div><div class="item-bd"><table width="100%"><thead><tr><td width="70"class="g-tc">序号</td><td width="120"class="rec-thumb">缩略图</td><td>信息标题</td><td width="170"class="rec-sort">排序</td><td width="120">操作</td></tr></thead><tbody><tr data-pid="f6325639-a136-4f35-b658-28fd33a717b7"><td class="g-tc">1<input name="displayOrder[]"type="hidden"value="1"></td><td class="rec-thumb g-ivm"><div class="ibox g-fl"><a href="//szgeko.csc86.com/product/f6325639-a136-4f35-b658-28fd33a717b7.html"target="_blank"class="i"><img src="//img.csc86.com/product/2015/06/17/thumbs/201506175498380_t0.jpeg"data-max="60"></a></div></td><td><a href="//szgeko.csc86.com/product/f6325639-a136-4f35-b658-28fd33a717b7.html"target="_blank">fdafda</a></td><td class="rec-sort"><span class="opt-up">上移</span><a href="javascript:"class="opt-down">下移</a></td><td class="rec-opt"><a href="javascript:"class="opt-del">取消推荐</a><input name="productID[]"type="hidden"value="f6325639-a136-4f35-b658-28fd33a717b7"></td></tr><tr data-pid="b331ab0c-1bd6-4c64-9d6e-736753ee29b0"><td class="g-tc">2<input name="displayOrder[]"type="hidden"value="2"></td><td class="rec-thumb g-ivm"><div class="ibox g-fl"><a href="//szgeko.csc86.com/product/b331ab0c-1bd6-4c64-9d6e-736753ee29b0.html"target="_blank"class="i"><img src="//img.csc86.com/product/2015/06/17/thumbs/201506175498380_t0.jpeg"data-max="60"></a></div></td><td><a href="//szgeko.csc86.com/product/b331ab0c-1bd6-4c64-9d6e-736753ee29b0.html"target="_blank">进口阀门进口GEKO止回阀盖科止回阀</a></td><td class="rec-sort"><a href="javascript:"class="opt-up">上移</a><a href="javascript:"class="opt-down">下移</a></td><td class="rec-opt"><a href="javascript:"class="opt-del">取消推荐</a><input name="productID[]"type="hidden"value="b331ab0c-1bd6-4c64-9d6e-736753ee29b0"></td></tr><tr data-pid="5c236dbe-80be-4ba6-8350-9ef3e13348b0"><td class="g-tc">3<input name="displayOrder[]"type="hidden"value="3"></td><td class="rec-thumb g-ivm"><div class="ibox g-fl"><a href="//szgeko.csc86.com/product/5c236dbe-80be-4ba6-8350-9ef3e13348b0.html"target="_blank"class="i"><img src="//img.csc86.com/product/2015/06/17/thumbs/201506175498380_t0.jpeg"data-max="60"></a></div></td><td><a href="//szgeko.csc86.com/product/5c236dbe-80be-4ba6-8350-9ef3e13348b0.html"target="_blank">8888888888888</a></td><td class="rec-sort"><a href="javascript:"class="opt-up">上移</a><span class="opt-down">下移</span></td><td class="rec-opt"><a href="javascript:"class="opt-del">取消推荐</a><input name="productID[]"type="hidden"value="5c236dbe-80be-4ba6-8350-9ef3e13348b0"></td></tr></tbody></table></div><div class="g-cf g-tr item-ft"><div class="edit-btn"><a href="javascript:"class="btn-recadd"data-url="/shop/product.html">添加产品</a><a href="javascript:"class="btn-recsave"data-url="/shop/showcaseRecommend.html"data-add="true">保存</a></div><div class="show-btn"><a href="javascript:"class="btn-recedit">修改</a></div></div></form></li></ul><div style="position:absolute;z-index: 1101;color: #f00;left: 0;top: 61px;width: 100%;height: 365px;background-color: #000;opacity: 0.5;filter:alpha(opacity=50);"></div><div class="item-ft" style="position: absolute;z-index: 1101;background-color: #fff;padding: 5px;right: 37px;bottom: 17px;"><a style="margin-left:0;" href="javascript:;">保存</a></div>';
	var step4 = '<ul id="showcaseRecommend-step-4"class="rec-list"data-total="1"><li class="item item-dis"data-batch="1"><form><div class="g-cf item-hd"><div class="g-fl item-no">批次：1</div><div class="item-hd-edit"><div class="g-fl item-type"><label><input name="recommendType"value="0"type="radio"checked="">单次推荐</label><label><input name="recommendType"value="1"type="radio">循环推荐</label></div><div class="g-fl item-once "><input type="text"class="date"name="singleStart[0]"value="2015-08-04"><input type="text"class="time"name="singleStart[1]"value="16:00"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span>~<input type="text"class="date"name="singleEnd[0]"value="2015-08-04"><input type="text"class="time"name="singleEnd[1]"value="23:59"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span></div><div class="g-fl item-times g-dn"><select name="circleWeek"><option value="">选择循环周期</option><option value="MON">每周一</option><option value="TUE">每周二</option><option value="WED">每周三</option><option value="THU">每周四</option><option value="FRI">每周五</option><option value="SAT">每周六</option><option value="SUN">每周日</option></select><input name="circleStart"type="text"class="time"value="00:00"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span>~<input name="circleEnd"type="text"class="time"value="23:59"><span class="time-c"><a href="javascript:"class="u-time"><i></i></a><a href="javascript:"class="d-time"><i></i></a></span></div></div><div class="item-hd-show"><div class="g-fl item-type"><label><input type="radio"checked=""disabled="">单次推荐</label><label><input type="radio"disabled="">循环推荐</label></div><div class="g-fl item-once">2015-08-04 16:00&nbsp;~&nbsp;2015-08-04 23:59</div></div><a href="javascript:"data-url="/shop/deleteRecommend.html?recommendId=7ac6ca72-cf0c-40c3-8b60-6a80e3a17663"class="g-fr rec-ico item-close"></a><div class="g-fr item-status">状态：待推荐</div></div><div class="item-bd"><table width="100%"><thead><tr><td width="70"class="g-tc">序号</td><td width="120"class="rec-thumb">缩略图</td><td>信息标题</td><td width="170"class="rec-sort">排序</td><td width="120">操作</td></tr></thead><tbody><tr data-pid="f6325639-a136-4f35-b658-28fd33a717b7"><td class="g-tc">1<input name="displayOrder[]"type="hidden"value="1"></td><td class="rec-thumb g-ivm"><div class="ibox g-fl"><a href="//szgeko.csc86.com/product/f6325639-a136-4f35-b658-28fd33a717b7.html"target="_blank"class="i"><img src="//img.csc86.com/product/2015/06/17/thumbs/201506175498380_t0.jpeg"data-max="60"></a></div></td><td><a href="//szgeko.csc86.com/product/f6325639-a136-4f35-b658-28fd33a717b7.html"target="_blank">fdafda</a></td><td class="rec-sort"><span class="opt-up">上移</span><a href="javascript:"class="opt-down">下移</a></td><td class="rec-opt"><a href="javascript:"class="opt-del">取消推荐</a><input name="productID[]"type="hidden"value="f6325639-a136-4f35-b658-28fd33a717b7"></td></tr><tr data-pid="5c236dbe-80be-4ba6-8350-9ef3e13348b0"><td class="g-tc">2<input name="displayOrder[]"type="hidden"value="2"></td><td class="rec-thumb g-ivm"><div class="ibox g-fl"><a href="//szgeko.csc86.com/product/5c236dbe-80be-4ba6-8350-9ef3e13348b0.html"target="_blank"class="i"><img src="//img.csc86.com/product/2015/06/17/thumbs/201506175498380_t0.jpeg"data-max="60"></a></div></td><td><a href="//szgeko.csc86.com/product/5c236dbe-80be-4ba6-8350-9ef3e13348b0.html"target="_blank">8888888888888</a></td><td class="rec-sort"><a href="javascript:"class="opt-up">上移</a><a href="javascript:"class="opt-down">下移</a></td><td class="rec-opt"><a href="javascript:"class="opt-del">取消推荐</a><input name="productID[]"type="hidden"value="5c236dbe-80be-4ba6-8350-9ef3e13348b0"></td></tr><tr data-pid="fd610cf5-a7b0-406f-8875-e84c106947b6"><td class="g-tc">3<input name="displayOrder[]"type="hidden"value="3"></td><td class="rec-thumb g-ivm"><div class="ibox g-fl"><a href="//szgeko.csc86.com/product/fd610cf5-a7b0-406f-8875-e84c106947b6.html"target="_blank"class="i"><img src="//img.csc86.com/product/2015/06/17/thumbs/201506175498380_t0.jpeg"data-max="60"></a></div></td><td><a href="//szgeko.csc86.com/product/fd610cf5-a7b0-406f-8875-e84c106947b6.html"target="_blank">88888888888888</a></td><td class="rec-sort"><a href="javascript:"class="opt-up">上移</a><span class="opt-down">下移</span></td><td class="rec-opt"><a href="javascript:"class="opt-del">取消推荐</a><input name="productID[]"type="hidden"value="fd610cf5-a7b0-406f-8875-e84c106947b6"></td></tr></tbody></table></div><div class="g-cf g-tr item-ft"><div class="edit-btn"><a href="javascript:"class="btn-recadd"data-url="/shop/product.html">添加产品</a><a href="javascript:"class="btn-recsave"data-url="/shop/showcaseRecommend.html?recommendId=7ac6ca72-cf0c-40c3-8b60-6a80e3a17663">保存</a><a href="javascript:"class="btn-reccancel">取消</a></div><div class="show-btn"><a href="javascript:"class="btn-recedit">修改</a></div></div></form></li></ul>';
	var Model = {
		intro: function () {
			tour = new Tour({
			  name: "showcaseRecommend",
			  placement: 'right',
			  steps: [
				  {
					element: "#showcaseRecommend-step-1",
					title: "",
					content: "设置橱窗推荐，让更多的买家找到您，点击此处开始设置。"
				  }			
			   ],
				debug: false,
				backdrop: true,
				template: function (i, step) {
				    var c = 1, a = 1;
					if ( i === 0 ) {
						a = 1;
						c = 1;
					} else if ( i === 1 ) {
						c = 4;
					} else if ( i === 2 ) {
						c = 5;
						a = 2;
					} else if ( i === 3 ) {
						a = 2;
						c = 6;
					}
					var html = '<div class="intro-wrap popover">' + 
						  ( i !== 1 ? '<div class="intro-arrow'+ a +'"></div>'  : '') +
						  '<div class="intro-desc">' +
				          '<div class="fs30 fb c-7c2c00 popover-title"></div>' +
						  '<div class="fs26 fb lh_d g-tl g-mt20 c-7c2c00 popover-content"></div>' +
				          '<div class="g-mt30 g-cf g-pr"><ul class="intro-process"><li class="hover"></li><li></li><li></li><li></li></ul><div style="margin-right:54px;" class="popover-navigation g-fr">' + 
						  (i === 3 ? '<a href="javascript:;" title="我知道了" class="intro-btn" data-role="end">我知道了</a>' : '<a href="javascript:;" title="下一步" class="intro-btn" data-role="next">下一步</a>') + '</div></div>' +
				          '</div>' +
				          '<div class="intro-fg'+c+'"></div>' +
					      '</div>';
					return html;
				},
				onShown: function ( tour ) {
					var el = $( ".popover" );
					// el.find("a[data-role='end']").addClass("g-dn");
					el.find('.intro-process').children().removeClass("hover").eq(tour._current).addClass("hover");
					
					$( ".tour-step-background" ).css("background", "#fff");
					if ( tour._current === 0 ) {
						$( ".tour-step-background" ).css("background", "#fc8844");
						el.css({
							'left': el.position().left - 340,
							'top': el.position().top + 130
						});
					} else if ( tour._current === 1 ) {
						el.css({
							'left': el.position().left - 340,
							'top': el.position().top + 190
						});
					} else if ( tour._current === 2 ) {
						el.css({
							'left': el.position().left - 370,
							'top': el.position().top + 52
						});
						el.find(".intro-desc").css('padding', '60px');
					} else if ( tour._current === 3 ) {
						el.css({
							'left': el.position().left - 360,
							'top': el.position().top + 55
						});
						//el.find("a[data-role='end']").removeClass("g-dn");
						// el.find("a[data-role='next']").addClass("g-dn");
					}
				},
				onNext: function  ( tour ) {
					var $d = $( "#showcaseRecommend-step-2" ),
						current = tour._current;
					$d.before('<div id="showcaseRecommendWrap" style="position:relative;">');
					$d.hide();
					var p = $( "#showcaseRecommendWrap" );
					
					if ( current === 0 ) {
						p.empty().append(step2);
						tour.addStep({
							element: "#showcaseRecommend-step-2",
							title: "",
							content: '<p style="height:100px;">你可以在这里为橱窗添加产品！</p>'
						});
						tour.goTo(1);
					} else if ( current === 1 ) {
						p.empty().append(step3);
						tour.addStep({
							element: "#showcaseRecommend-step-3",
							title: "",
							content: '<div style="margin-left:36px;"><p>1、请注意设置推荐方式和时间。</p><p>2、完成后 , 点击保存 , 你将拥有一条橱窗推荐 !</p></div>'
						});
						tour.goTo(2);
					} else if ( current === 2 ) {
						p.empty().append(step4);
						tour.addStep({
							element: "#showcaseRecommend-step-4",
							title: "",
							content: "这个就是刚添加的橱窗推荐，您可以在此修改。"
						});
						tour.goTo(3);
					}
				},
				onEnd: function ( tour ) {
					$( "#showcaseRecommendWrap" ).remove();
					$( "#showcaseRecommend-step-2" ).show();
				}
			});

			// 初始化
			tour.init();
			// 开始
			tour.start();
		}
	}
	Model.intro();
});