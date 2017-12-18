/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
  var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');
  if(!isLogin){isLogin={"status":false,"data":{"id":"","userkinds":"CG","username":"unknow","message":0}};console.log('api接口异常，登陆错误');}
  var $topNav = $('div.top_nav');
  var $jMmbr=$topNav.find('.J_member');
  var $hyzxMenu=$topNav.find('.hyzxsp .dorp_menu');
  var $saller=$hyzxMenu.find('.right');//会员中心下拉处我是卖家容器
  var $sallerClone=$saller.clone();
  var ucUrl='//i.csc86.com';
  //登录前会员中心下拉处只显示我是买家（我是卖家隐藏），登录后若为供应商则需同时显示我是买家和我是卖家
  $saller.remove();
  $hyzxMenu.width(70);
  if(isLogin.status&&isLogin.data.userkinds=='GY'){
    $hyzxMenu.append($sallerClone);
    $hyzxMenu.find('.right').show();
    $hyzxMenu.width(160);
    ucUrl='//i.csc86.com/#mem_Seller';
  }

  !/MSIE.6/.test(navigator.userAgent) || $topNav.find('.hoverMnu').on('mouseenter', function() {
    $(this).addClass('hoverMnu-hover');
  }).on('mouseleave', function() {
    $(this).removeClass('hoverMnu-hover');
  });
  if (isLogin.status && $jMmbr.hasClass('g-dn')) {
    $topNav.find('.J_guest').addClass('g-dn');
    $jMmbr.removeClass('g-dn').prepend('您好， <a class="g-e username" href="'+ucUrl+'" target="_blank">' + isLogin.data.username + ' ！</a><a href="//i.csc86.com/user/message" target="_blank"><span class="usermsg">消息</span><span class="msg">' + isLogin.data.message+'</span></a><i class="v-line">|</i><a href="//login.csc86.com/signout" class="top-signout">退出</a><i class="v-line">|</i>');
    //$topNav.find('.hyzxsp').css("display","inline-block");
  }

  module.exports=isLogin;

});