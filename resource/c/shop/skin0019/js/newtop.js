/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');
  var $topNav = $('div.top_nav');
  var $jMmbr=$topNav.find('.J_member');
  !/MSIE.6/.test(navigator.userAgent) || $topNav.find('.hoverMnu').on('mouseenter', function() {
    $(this).addClass('hoverMnu-hover');
  }).on('mouseleave', function() {
    $(this).removeClass('hoverMnu-hover');
  });
  if (isLogin.status) {
     $topNav.find('.login_bfr').addClass('g-dn').end().find('.login_cmp').removeClass('g-dn');
    $('.login_cmp').find('.member em').text(isLogin.data.username);
    if(isLogin.data.message == 0){
       $('.login_cmp').find('.msg em').remove();
       $('.aside_tools').find('.aside_msg em').remove();
    }else{
	     $('.login_cmp').find('.msg em').text(isLogin.data.message);
	     $('.aside_tools').find('.aside_msg em').text(isLogin.data.message);
	   }
  }

$('.top_search form').on('submit',function(){
  var $this=$(this);
  var keyword=$this.find('input[name=keyword]').val();
  if(keyword){
    cscga('create', 'SU-10001-1', 'auto','searchTracker');
    cscga('searchTracker.require', 'cscplugin',{
      searchKeyWord:keyword,
      eventAction:'searchSuccess'
    });
    cscga('searchTracker.cscplugin:searchInit');
  }
});

  module.exports=isLogin;

});