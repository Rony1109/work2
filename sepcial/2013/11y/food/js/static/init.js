define(function(require, exports, module){
	//判断是否登录
	require('http://industry.csc86.com/statics/js/industry/m/islogin.js');
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

	//兼容处理
	if($.browser.msie) {
		$('span.emotion').css('background-position-y', '0');
	}
	if($.browser.webkit) {
		$('span.emotion').css('background-position-y', '-30px');
	}

	var scroll = require('./scroll');
	scroll('.fixed-nav');

	$('.ctn9-article .article-l .slide').hover(function(){
		$('a.prev').fadeIn();
		$('a.next').fadeIn();
	}, function(){
		$('a.prev').fadeOut();
		$('a.next').fadeOut();
	});

	var slide = require('./slide');

	$('.slide-wrapper ul li:last').css('margin-right','0');
	new slide(".slide-wrapper ul",".slide-wrapper ul>li",{
		slideWidth: 206,
		slideHeight:280, 
		slideDirection: 0,
		slides_xssm:3,
		slideButs_bindsj: "click",
		slides_to_l:'.slide a.prev',//前一个事件绑定对象
		slides_to_r:'.slide a.next'//后一个事件绑定对象
	});

	$('.ctn9-article .article-r ol li').each(function(){
		$(this).find('a').on('click', function(){
			var img_path = $(this).attr('href');
			var img_info = $(this).attr('data-info');
			$(this).parent().addClass('cur').siblings().removeClass('cur');
			$('.ctn9-article .article-r .main-img').find('img').attr('src',img_path);
			$('.ctn9-article .main-img b').addClass('cur').html(img_info);
			return false;
		})
	});

	require('./jquery.limitTextarea');
	$('#saytext').limitTextarea({
		onOk: function(){
			$('.comment').find('input.sub_btn').removeClass('sub_btn_hover').attr('disabled',false);
		},
		onOver: function(){
			$('.comment').find('input.sub_btn').addClass('sub_btn_hover').attr('disabled',true);
		}
	});


	//


});