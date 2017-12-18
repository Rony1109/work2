define(function(require, exports, module){
	module.exports = function(){
		$.ajax({
			url: '//api.csc86.com/notify/count/all/',
			dataType: 'jsonp',
			type: 'get',
			success: function(dataMsg){
				//console.log(dataMsg.data.username + '\nmes: ' + dataMsg.data.message + '\nstatus: ' + dataMsg.status);
				// 判断用户是否登录
				if(dataMsg.status) {
					$("div.top-sign-info").find("span.bd").html('<a href="//i.csc86.com" target="_blank" rel="nofollow">'+dataMsg.data.username+'</a>！消息<a class="top-msg-num login" href="//i.csc86.com/user/message" target="_blank" rel="nofollow">'+dataMsg.data.message+'</a><span class="v-line"></span><a href="//login.csc86.com/signout" rel="nofollow">退出</a>');
				}
				// else {
				// 	$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="//member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="//member.csc86.com/register/phonereg">免费注册</a>');
				// }
			}
		});
	};
});