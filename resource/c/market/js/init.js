/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {

	//顶部登录状态
	$.get('//api.csc86.com/notify/count/all/',function(data){
		if(data.status){
			$('div.top-sign-info').html('进入<a href="//www.csc86.com/" rel="nofollow">华南城网</a>，让世界看见你！ <a href="//member.csc86.com/" target="_blank" id="J_signEd" rel="nofollow">'+data.data.username+'</a>！消息<a href="//member.csc86.com/membercenter/messageall/" target="_blank" class="top-msg-num" rel="nofollow">'+data.data.message+'</a><span class="v-line">|</span><a href="//member.csc86.com/login/logout" rel="nofollow">退出</a>');

		}
	},'jsonp');

	//顶部我的账户 走进华南城
	$('li.top-my-account,li.top-into-group').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});

	var
		$quick = $('ul.quick'),
		$navBdUl = $('div.nav-items-bd ul');
	$('.nav-items').delegate('li a', 'click', function(event) {
		var $t = $(this).parent(),
			i = $t.index();
		if($t.is('.cur')){
			$t.removeClass('cur');
			$navBdUl.eq(i).removeClass('cur').parent().removeClass('nav-items-bd-cur').removeAttr('style');
		}else{
			$t.addClass('cur').siblings('.cur').removeClass('cur');
			$navBdUl.removeClass('cur').eq(i).addClass('cur').parent().addClass('nav-items-bd-cur').css('top',i*40+6);
			if(!-[1,]&&!window.XMLHttpRequest){//ie6
				$navBdUl.siblings('div').height($navBdUl.filter('.cur').height()+2);
			}
		}
	});

	$(document).bind('click',function(event){
		if($(event.target).parents('.J_navMarket').length == 0){
			$('.nav-items li.cur a').trigger('click');
		}
	});


});