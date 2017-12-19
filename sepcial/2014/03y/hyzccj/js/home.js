$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-sign-info").find("span.bd").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");
	
});
//复制
var clip = null;
		function _copy() {
            ZeroClipboard.setMoviePath( 'js/ZeroClipboard.swf' )
			clip = new ZeroClipboard.Client();//创建对象
			clip.setHandCursor( true );//鼠标手型
			$('a.w98').mouseover( function() {
				var me=$(this)
				clip.setText($(".fe_text").val());//设置复制的内容
				if (clip.div) {
					clip.receiveEvent('mouseout', null);
					clip.reposition(this);
				}//如果已经存在flash，那么重新定位
				else clip.glue(this);
				clip.receiveEvent('mouseover', null);
			});
			clip.addEventListener("complete",function(){
				alert("复制成功！")
			})
		}
