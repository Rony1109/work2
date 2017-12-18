/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  //设置首页及添加收藏
  var $f = $('.frie-links');
  var $dd = $f.find('dd');
  $f.on('click', '.more span', function(event) {
    var $t = $(this);
    if ($t.is('.s1')) {
      $t.removeClass('s1');
      $dd.addClass('hide');
    } else {
      $t.addClass('s1');
      $dd.removeClass('hide');
    }
  });
});