define(function(require, exports, module){
	//对外提供接口
	module.exports = {
		get: function(elem,topicId){
			topicId = topicId || 'e72a8a59-9c3d-4354-9da2-017ccbcba776';
			$.get('http://quan.csc86.com/interface/replyList', {topicId:topicId}, function(data){
				var i, j, html = '';

				for(i = 0; i < data.length; i++){
					var _comment = (data[i].commentContent || '').replace(/\[em\_(\d+)\]/gi,'<img border="0" src="http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/$1.gif">');

					html += '<li class="clearfix">'+
							'<div class="img-l"><a href="'+data[i].url+'"><img src="'+data[i].head+'"></a></div>'+
							'<div class="comment-ctn">'+
									'<i>'+data[i].nickName+'：</i>'+
									'<span>'+_comment+'</span>'+
									'<span class="time">'+data[i].commentTime+'</span>'+
							'</div>'+
							'</li>';
				}
				$(elem).html(html);

			},'jsonp');
			/*$.ajax({
				url: 'http://quan.csc86.com/interface/replyList',
				data: {topicId:'7f8bb647-2754-4eb4-8b06-088b0303d173'}
			});*/
		},
		send: function(elem, sub,topicId){
			var curObj = this;
			topicId = topicId || 'e72a8a59-9c3d-4354-9da2-017ccbcba776';
			$(sub).on('click', function(){
				if($.trim($(elem).val())){
					$.get('http://quan.csc86.com/interface/submitReply', {topicId:topicId, replyContent: $(elem).val().replace(/\[em\_(\d+)\]/gi,'<img border="0" src="http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/$1.gif">')}, function(data){
						switch(data.code) {
							case 'login_fail':
								alert("请登陆或注册会员后发表评论");
								location.href = 'http://member.csc86.com/login/phone/?done=' + encodeURIComponent(location.href);
							break;
							case 'sns_newComment_000':
								if($(elem).val() == ""){
									alert("请输入评论信息");
									$(elem).focus();
								}
								else{
									alert('评论成功');
									location.reload();
									$(elem).val('');
								}
								
							break;
							default:
								alert('您的评论尚未提交成功，给您带来不遍，谢谢您的光临!');
							break;
						}
					},'jsonp')
				}else{
						alert("请输入评论信息");	
					};
			});
		}
	};

});