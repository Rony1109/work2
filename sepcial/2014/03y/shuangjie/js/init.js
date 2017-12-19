define(function(require, exports, module){
	//获取评论
	var comment = require('./comments');
	comment.get('.comment-result ul');
	setInterval(function(){
		comment.get('.comment-result ul', '7cec6398-3597-4eb0-923e-1fe4437afc95');
	}, 180000);
	comment.send('#saytext', '.comment input.sub_btn');
	//QQ表情
	require('./jquery.qqFace');
	require('http://res.csc86.com/js/m/emoticons.js');
	$('.emotion').qqFace({
		id : 'facebox', //表情盒子的ID
		assign:'saytext', //给那个控件赋值
		path:'http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/' //表情存放的路径
	});
	
	
	//赞
	$("a.like[data-topic]").each(function(index, element){
		var o = $(this),id=o.attr("data-topic") || "000";
		$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":id},function(data){
			o.text(data.code);
		},"jsonp");
		o.on("click",function(){
			$.get(csc.url("quan","/likeB.html?topicId="+id),function(data){
				if("sns_likeTopic_000"==data.code){
					o.text(data.desc);
				}else if("login_fail"==data.code){
					seajs.use(csc.url("res","/f=js/m/sign"),function(){
						csc.checkSign("location.reload()");
					});
				}else if("sns_likeTopic_001"==data.code){
					csc.useDialog(function(){csc.alert("赞过了！");});
				}else{
					csc.useDialog(function(){csc.alert(data.desc);});
				}
			},"jsonp");
		})
	})
	
	require('./jquery.limitTextarea');
	$('#saytext').one('focus',function(){
		$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(!data.status){
				alert("请登陆或注册会员后发表评论");
				location.href = 'http://member.csc86.com/login/phone/?done=' + encodeURIComponent(location.origin + location.pathname) + '#ji';
			}
		},"jsonp");
	}).limitTextarea({
		onOk: function(){
			$('.comment').find('input.sub_btn').removeClass('sub_btn_hover').attr('disabled',false);
		},
		onOver: function(){
			$('.comment').find('input.sub_btn').addClass('sub_btn_hover').attr('disabled',true);
		}
	});
});