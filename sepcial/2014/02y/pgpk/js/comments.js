define(function(require, exports, module){
	//对外提供接口
	module.exports = {
		get: function(elem,topicId,start){
			start=start || 0;
			if($(elem).is(".contresult01 ul")){
				topicId = topicId || 'd6805ade-f085-4a64-ba0b-05e227c73a0d';
			}else{
				topicId = topicId || 'd831fab6-b39a-4a0c-a065-a49a1678b529';
			}
			$.get('http://quan.csc86.com/api/comment/thread/'+topicId+'?api=topiccomment&id='+topicId+'&start='+start+'&pn=4&_=1393296028431', function(data){
				var i, j, html = '';
				for(i = 0; i < data.data.list.length; i++){
					var _comment = (data.data.list[i].commentContent || '').replace(/\[em\_(\d+)\]/gi,'<img border="0" src="http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/$1.gif">');
					var img=data.data.list[i].head.split("/");
					var image=img[img.length-1];
					var head;
					if(image.indexOf(".")<0){
						head="http://res.csc86.com/image/c/membercenter/photo-male-small.jpg";
					}else{
						head=data.data.list[i].head;	
					}
					html += '<li class="clearfix">'+
							'<div class="img-l"><img src="'+head+'"></div>'+
							'<div class="comment-ctn">'+
									'<i>'+data.data.list[i].memberName+'：</i>'+
									'<span>'+data.data.list[i].content+'</span>'+
									'<span class="time">'+data.data.list[i].createTime+'</span>'+
							'</div>'+
							'</li>';
				}
				var page='<div class="page">';
				if(1<data.data.totalPages<20){
					page+='<a herf="javascript:;" title="首页">首页</a>'
					for(var i=1;i<=data.data.totalPages;i++){
						page+='<a herf="javascript:;" title="'+i+'">'+i+'</a>';
					}
					page+='<a herf="javascript:;" title="下一页">下一页</a><a herf="javascript:;" title="尾页">尾页</a>'
				}
				page+='</div>';
				$(elem).html(html);
				$(elem).parent().append(page);
				if(data.data.pageIndex==1){
					$(elem).parent().find(".page").find("a:eq(0)").addClass("cur");
				}else if(data.data.pageIndex>1){
					$(elem).parent().find(".page").find("a:eq(1+"+i+")").addClass("cur");	
				}
			},'jsonp');
		},
		send: function(elem, sub,topicId){
			var curObj = this;
			if($(elem).is(".contresult01 ul")){
				topicId = topicId || 'd6805ade-f085-4a64-ba0b-05e227c73a0d';
			}else{
				topicId = topicId || 'd831fab6-b39a-4a0c-a065-a49a1678b529';
			}
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