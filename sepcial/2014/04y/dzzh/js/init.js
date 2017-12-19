define(function(require, exports, module){
	//获取评论
	var comment = require('./comments');
	comment.get('.contresult01 ul');
	setInterval(function(){
		comment.get('.contresult01 ul', 'd6805ade-f085-4a64-ba0b-05e227c73a0d',0);
	}, 180000);
	comment.send('#saytext1', '.pl-l .comment input.sub_btn','d6805ade-f085-4a64-ba0b-05e227c73a0d');
	
	comment.get('.contresult02 ul');
	setInterval(function(){
		comment.get('.contresult02 ul','d831fab6-b39a-4a0c-a065-a49a1678b529',0);
	}, 180000);
	comment.send('#saytext2', '.pl-r .comment input.sub_btn','d831fab6-b39a-4a0c-a065-a49a1678b529');
	
	
	//QQ表情
	require('./jquery.qqFace');
	require('http://res.csc86.com/js/m/emoticons.js');
	$('.em01').qqFace({
		id : 'facebox', //表情盒子的ID
		assign:'saytext1', //给那个控件赋值
		path:'http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/' //表情存放的路径
	});
	$('.em02').qqFace({
		id : 'facebox', //表情盒子的ID
		assign:'saytext2', //给那个控件赋值
		path:'http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/' //表情存放的路径
	});
	
	
	require('./jquery.limitTextarea');
	$('#saytext1,#saytext2').one('focus',function(){
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
	
	//$(function(){
		  
	
		$(".contresult02 .page:eq(0) a").live("click",function(){
				var tit=$(this).attr("title");
				var leng;
				var ne=$(".contresult02 .page:eq(0) a").length;
				if($(this).not(".cur")){
					if(tit=="首页"){
						$(".contresult02 .page:eq(0) a").removeClass("cur");
						$(this).addClass("cur");
						leng=0;
					}else if(tit=="下一页"){
						if($(".contresult02 .page:eq(0) a.cur").attr("title")=="首页"){
							$(".contresult02 .page:eq(0) a").removeClass("cur");
							$(".contresult02 .page:eq(0) a:eq(1)").addClass("cur");
							leng=2;
						}else if($(".contresult02 .page:eq(0) a.cur").attr("title")=="尾页"){
							leng=$(".contresult02 .page:eq(0) a").length;
							leng=parseInt(leng)-2;
						}else if($(".contresult02 .page:eq(0) a.cur").index()==(ne-3)){
						}else{
							var ind=$(".contresult02 .page:eq(0) a.cur").index();
							$(".contresult02 .page:eq(0) a").removeClass("cur");
							$(".contresult02 .page:eq(0) a:eq("+(ind+1)+")").addClass("cur");
							leng=$(".contresult02 .page:eq(0) a.cur").attr("title");
						}
					}else if(tit=="尾页"){
						$(".contresult02 .page:eq(0) a").removeClass("cur");
						$(this).addClass("cur");
						leng=$(".contresult02 .page:eq(0) a").length;
						leng=parseInt(leng)-2;
					}else{
						$(".contresult02 .page:eq(0) a").removeClass("cur");
						$(this).addClass("cur");
						leng=parseInt(tit)+1;
					}
					pagenu('.contresult02 ul', 'd831fab6-b39a-4a0c-a065-a49a1678b529',leng);
				}	
		})	   
	
	
	$(".contresult01 .page:eq(0) a").live("click",function(){
			var tit=$(this).attr("title");
			var leng;
			var ne=$(".contresult01 .page:eq(0) a").length;
			if($(this).not(".cur")){
					if(tit=="首页"){
						$(".contresult01 .page:eq(0) a").removeClass("cur");
						$(this).addClass("cur");
						leng=0;
					}else if(tit=="下一页"){
						if($(".contresult01 .page:eq(0) a.cur").attr("title")=="首页"){
							$(".contresult01 .page:eq(0) a").removeClass("cur");
							$(".contresult01 .page:eq(0) a:eq(1)").addClass("cur");
							leng=2;
						}else if($(".contresult01 .page:eq(0) a.cur").attr("title")=="尾页"){
							leng=$(".contresult01 .page:eq(0) a").length;
							leng=parseInt(leng)-2;
						}else if($(".contresult01 .page:eq(0) a.cur").index()==(ne-3)){
						}else{
							var ind=$(".contresult01 .page:eq(0) a.cur").index();
							$(".contresult01 .page:eq(0) a").removeClass("cur");
							$(".contresult01 .page:eq(0) a:eq("+(ind+1)+")").addClass("cur");
							leng=$(".contresult01 .page:eq(0) a.cur").attr("title");
						}
					}else if(tit=="尾页"){
						$(".contresult01 .page:eq(0) a").removeClass("cur");
						$(this).addClass("cur");
						leng=$(".contresult01 .page:eq(0) a").length;
						leng=parseInt(leng)-2;
					}else{
						$(".contresult01 .page:eq(0) a").removeClass("cur");
						$(this).addClass("cur");
						leng=parseInt(tit)+1;
					}
				pagenu('.contresult01 ul', 'd6805ade-f085-4a64-ba0b-05e227c73a0d',leng);
			}	
	})
	
	
	
	
	
});



function pagenu(elem,topicId,start){
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
					page+='<a herf="javascript:;" tilit="首页">首页</a>'
					for(var k=1;k<=data.data.totalPages;k++){
						page+='<a herf="javascript:;" title="'+k+'">'+k+'</a>';
					}
					page+='<a herf="javascript:;" tilit="下一页">下一页</a><a herf="javascript:;" tilit="尾页">尾页</a>'
				}
				page+='</div>';
				$(elem).html(html);
				$(elem).parent().append(page);
			},'jsonp');
}