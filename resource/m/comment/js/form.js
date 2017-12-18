/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	require('//res.csc86.com/v2/c/member/common/js/alertDialog');//按钮弹窗组件
	var $form;

	function init(id,$id){
		//第三个参数可选，入股share的值为false不显示分享
		var obj = arguments[2] || {},
			oHtml = obj['share'] === false ? '' : '<div class="g-fr g-comment-share"><div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a></div><script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script></div>',
			oDom = '<div class="g-cf g-comment-top">' +
			'<div class="g-fr g-comment-like">' +
			'<span>回复(<strong class="J_reply">0</strong>)</span>' +
			'</div>' + oHtml +
			'</div>' +
			'<div class="g-cf g-comment-form"></div>';
		if ($id.find('div.g-comment-form').length < 1) {
			$id.append(oDom);
			$form = $id.find('div.g-comment-form');
			createForm(id, $id);
		}
	}
	function createForm(id,$id){
		// $.get('//quan.csc86.com/interface/hldlikeCount',{topicId:id},function(data){//更新赞数量
		// 	$id.find('.J_like').html(data['code']);
		// },'jsonp');
		$.get('//api.csc86.com/member/isLogin.html',function (data){
			if(data.status){//登录状态创建评论表单
				$form.html('<img src="//res.csc86.com/image/c/membercenter/photo-male-small.jpg" alt="'+data['data']['userName']+'" width="60" height="60" class="g-fl"/><div class="g-comment-form-bd"><form action="//quan.csc86.com/interface/submitReply" methon="get"><input type="hidden" name="topicId" value="'+id+'" /><textarea name="replyContent" class="g-comment-textarea" id="JSayText"></textarea><div class="g-tr"><a href="javascript:" class="g-comment-emoticons"></a><span class="g-comment-let">还可以输入<strong>140</strong>个字</span><button type="submit" class="g-dib g-comment-btn g-comment-btn-dis" disabled>回复</button></div></form></div>');
				var $JSayText=$('#JSayText');
				$.get('//quan.csc86.com/api/member/'+data['data']['memberId'],function(data){//当前登录会员信息 更新会员图像
					if(data['status'] && /^\//.test(data['head'])){
						$form.find('img').attr({
							src:'//img.csc86.com'+data['data']['head'],
							title:data['data']['sign']
						});
					}
				},'jsonp');

				var $btn = $form.find('button');

				require('./jquery.qqFace');//表情处理
				$('.g-comment-emoticons').qqFace({
					id : 'facebox', //表情盒子的ID
					assign:'JSayText', //给那个控件赋值
					showClass:'g-comment-emoticons-show',
					path:'//res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/' //表情存放的路径
				});

				require('./jquery.limitTextarea');
				$JSayText.limitTextarea({
					onOk: function(){
						$btn.removeClass('g-comment-btn-dis').prop('disabled',false);
					},
					onOver: function(){
						$btn.addClass('g-comment-btn-dis').prop('disabled',true);
					}
				});

				$form.find('form').on('submit',function(){
					var $t = $(this),
						content = $.trim($JSayText.val());
					if(content.length < 1){
						alert('请输入评论内容！');
						return false;
					}
					$btn.prop('disabled',true);//禁用按钮防止多次提交
					$.get($t.attr('action'),{topicId:id,replyContent:content.replace(/\[em\_(\d+)\]/gi,'<img border="0" src="//res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/$1.gif">')},function(data){
						var msg=data.msg;
						switch(msg) {
							case 'login_fail':
							$.tip({
								content:'请登陆或注册会员后发表评论！',
								closeTime: 3,
								closeCallback:function(){
									window.location.href = '//login.csc86.com/?done=' + encodeURIComponent(location.href);
								}
							});
							break;
							case 'sns_newComment_000':
							$.tip({
								content:'评论成功！',
								closeTime: 3,
								closeCallback:function(){
									//清空评论内容，并触发列表刷新事件
									$JSayText.val('').trigger('focus').trigger('refresh');
								}
							});		
							break;
							case 'sns_fail':
							$.tip({
								content:'操作失败，请联系管理员！',
								closeTime: 3,
								closeCallback:function(){
									$btn.prop('disabled',false);
								}
							});	
							break;
							default:
							if(msg==='sns_disable_word'){
								artDialog({
									id:'errorTip',
									title:false,
									content:'<h2 style="font-size:16px;">对不起，您回复的内容不规范！</h2><p><strong>评论</strong>&nbsp;中的“'+data.data.replyContent+'”,属于违禁词或敏感词,请修改!</p>',
									fixed: true,
									lock:true,
									width:380,
									opacity:0.2,
									icon:'mem-n',
									ok:true,
									close:function(){
										$JSayText.focus();
										$btn.prop('disabled',false);
									}
								});
							}
							break;
						}

					},'jsonp');
					return false;
				}).bind('keypress',function(e){//ctrl+回车提交评论
					if(e.ctrlKey && (10 == e.which || 13 == e.which)){
						$(this).triggerHandler("submit");
					}
				});
			}else{
				$form.html('<img src="//res.csc86.com/image/c/membercenter/photo-male-small.jpg" alt="" width="60" height="60" class="g-fl"/><div class="g-comment-form-bd"><div class="g-comment-login"><a href="//login.csc86.com/" class="J_login">登录</a>后发表评论，或<a href="//member.csc86.com/register/phonereg" target="_blank">注册</a></div><div class="g-tr"><span class="g-dib g-comment-btn">回复</span></div></div>');
				// $form.find('a.J_login').bind('click',function(event){
				// 	if(window.csc){
				// 		$(document).bind('cscSignEd',function(){//多个jquery版本问题
				// 			location.reload();
				// 		});
				// 		seajs.use('//res.csc86.com/f=js/m/sign',function(){
				// 			csc.checkSign();
				// 		});
				// 	}else{
				// 		seajs.use('//res.csc86.com/js/',function(){
				// 			$(document).bind('cscSignEd',function(){//多个jquery版本问题
				// 				location.reload();
				// 			});
				// 			seajs.use('//res.csc86.com/f=js/m/sign',function(){
				// 				csc.checkSign();
				// 			});
				// 		});
				// 	}
				// 	event.preventDefault();
				// });
			}
		},"jsonp");
	}
	exports.init = init;

});