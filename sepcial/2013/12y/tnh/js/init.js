define(function(require, exports, module){
	//获取评论
	var comment = require('./comments');
	comment.get('.comment-result ul');
	setInterval(function(){
		comment.get('.comment-result ul');
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


	//
	$('.tabs-ctn').each(function(){
		var o = $(this), div = o.find('>div');
		$.each(div, function(){
			div.eq(0).show().siblings().hide();
		});
	});

	$('.tabs-nav').each(function(){
			var o = $(this),li = o.find(">ul>li");
			$.each(li,function(i){
				var _li = $(li[i]);
				_li.on({
					mouseenter: function(){
						o.attr("class",'tabs-nav g-f-l tab-style'+ i);
						o.parent().siblings('.tabs-ctn').find('>div').eq(i).show().siblings().hide();
					}
				});
			})
	});

	

});