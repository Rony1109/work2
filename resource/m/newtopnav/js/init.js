/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');	
//window.onerror=function(){return true;} 	
	if(!isLogin){isLogin={"status":false,"data":{"id":"","username":"unknow","message":0}};console.log('api接口异常，登陆错误');}
  var $topNav = $('div.top_nav');
  var $jMmbr=$topNav.find('.J_member');
  !/MSIE.6/.test(navigator.userAgent) || $topNav.find('.hoverMnu').on('mouseenter', function() {
    $(this).addClass('hoverMnu-hover');
  }).on('mouseleave', function() {
    $(this).removeClass('hoverMnu-hover');
  });
  if (isLogin.status && $jMmbr.hasClass('g-dn')) {
    $topNav.find('.J_guest').addClass('g-dn');
    $jMmbr.removeClass('g-dn').prepend('您好， <a class="g-e username" href="//i.csc86.com" target="_blank">' + isLogin.data.username + '</a>！消息<a href="//i.csc86.com/user/message" target="_blank" class="msg">' + isLogin.data.message+'</a><i class="v-line">|</i><a href="//login.csc86.com/signout" class="top-signout">退出</a><i class="v-line">|</i>');
  }
  
  module.exports=isLogin;

});