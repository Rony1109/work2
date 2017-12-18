var editor;
$(function(){
	showTopic();
});

$(function(){
	//话题列表滑过加背景
	$(".tpc-list-all").live("mouseenter",function(){
		$(".tpc-list-all").removeClass("tpc-all-bg");		//$.trim($(this).find(".tc-t1").html())=="查看"								  
		if(($.trim($(this).find(".tpc-la-t2").children("a").html())=="展开内容"||$(this).find(".tpc-la-t2").children("a:hidden"))&&($(this).find(".tc-t13").css("display")=="none")){
			$(this).addClass("tpc-all-bg");	
		}else{
			$(this).removeClass("tpc-all-bg");
		}
	}).live("mouseleave",function(){
			$(this).removeClass("tpc-all-bg");
	});
	//回复删除
	$("ul.tpc-ra-r1").live("mouseenter",function(){
		$(this).find(".tpc-re-del").css("display","inline-block");
	}).live("mouseleave",function(){
		$(this).find(".tpc-re-del").css("display","none");
	});
	//话题列表图片点击展开效果
	var dpimg=false;
	$("div.plist-img-i1 p").live("click",function(){
		var $th=$(this);
		if($th.parent(".plist-img-i1").siblings(".topic-c-all").html()==""){
			if(!dpimg){
				var loding=loading_box();
				$.get("topicDetail.html?topicId="+$th.closest(".tpc-list-all").attr("data-topicid"),function(data){
					if(loding){loding.close();}
					if("000"==data.code){
						$th.parent(".plist-img-i1").siblings(".topic-c-all").html(data.desc);
						$("div.topic-c-all").css("display","none");
						$(".topic-c-sig,div.plist-img-i1").css("display","block");
						$(".tpc-la-t2 a").html("展开内容");
						$th.parent().siblings(".topic-c-all").css("display","block").siblings(".topic-c-sig,.plist-img-i1").css("display","none");
						$th.parent().parent(".tp-content").siblings(".tpc-la-t2").find("a").html("收起内容");	
					}else{
						csc.alert(data.desc);
					}
				},"json");	
			}
		}else{
			$("div.topic-c-all").css("display","none");
			$(".topic-c-sig,div.plist-img-i1").css("display","block");
			$(".tpc-la-t2 a").html("展开内容");
			$th.parent().siblings(".topic-c-all").css("display","block").siblings(".topic-c-sig,.plist-img-i1").css("display","none");
			$th.parent().parent(".tp-content").siblings(".tpc-la-t2").find("a").html("收起内容");	
		}
	});
	//话题列表图片点击收起效果
	$("ul.tpc-list-all div.topic-c-all img.list-img5").live("click",function(){
		var $th=$(this);
		$th.closest("div.topic-c-all").css("display","none").siblings(".topic-c-sig,.plist-img-i1").css("display","block");
		$th.closest("div.topic-c-all").parent(".tp-content").siblings(".tpc-la-t2").find("a").html("展开内容");		
	});
	//$("div.topic-c-all img[title=csc86]").css("cursor","pointer"); 
	
	//话题回复展开
	var hth=false;
	$('span.tal-t41 .tc-t12').live("click",function(){
		if(!$("div.tpc-reply-all").is(":animated")){
			if (editor) {
				editor.remove();
				editor = null;
			}
			var $th=$(this);
			if(!hth){
				hth=true;
				ajaxRe($th.attr("data-url"),$th.attr("data-box"),function(){
					$('span.tal-t41 .tc-t13').css("display","none");	
					$('span.tal-t41 .tc-t12').css("display","inline");
					$(".tpc-reply-all").slideUp("slow");
					$th.siblings(".tc-t13").css("display","inline");
					$th.css("display","none");
					$th.closest(".tcp-al-t3").siblings(".tpc-reply-all").slideDown(200);
					var sixeFont=$th.closest(".tcp-al-t3").siblings(".tpc-reply-all").find(".rep-font-nu");
					$.get("/interface/islogin",function(data){
						if(data.islogin==1){
							$.getScript('//res.csc86.com/js/p/kindeditor/4.1.2/kindeditor-min.js', function() {
								KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
								editor = KindEditor.create($th.closest(".tcp-al-t3").siblings(".tpc-reply-all").find(".rep-text"), {
									themeType : 'qq',
									pasteType : 1,
									items : ['emoticons'],
									newlineTag:'br',
									afterChange : function() {
										var v='还可以输入<b class="chLeft">500</b>个字';
										if(this.count('text')==0){
											KindEditor('.class45').html('<input type="button" value="回复" class="g-f-r r2-btn1">');
										}else if(this.count('text')>500){
											v='<b class="chLeft">已超出'+(this.count('text')-500)+'个字</b>';
											KindEditor('.class45').html('<input type="button" value="回复" class="g-f-r r2-btn1">');
										}else if(1<this.count('text')<500){
											v='还可以输入<b class="chLeft">'+(500-this.count('text'))+'</b>个字';
											KindEditor('.class45').html('<input type="button" value="回复" class="g-f-r r2-btn">');
										}
										KindEditor(sixeFont).html(v);
									}
								});
							});
						}else{
							$.getScript('//res.csc86.com/js/p/kindeditor/4.1.2/kindeditor-min.js', function() {
								KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
								editor = KindEditor.create($th.closest(".tcp-al-t3").siblings(".tpc-reply-all").find(".rep-text"), {
									themeType : 'qq',
									pasteType : 1,
									items : ['emoticons'],
									newlineTag:'br',
									afterChange : function() {
										var v='还可以输入<b class="chLeft">500</b>个字';
										if(this.count('text')==0){
											KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
										}else if(this.count('text')>500){
											v='<b class="chLeft">已超出'+(this.count('text')-500)+'个字</b>';
											KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
										}else if(1<this.count('text')<500){
											v='还可以输入<b class="chLeft">'+(500-this.count('text'))+'</b>个字';
											KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn">');
										}
										KindEditor(sixeFont).html(v);
									},
									readonlyMode : true
								});
							});	
						}		  
					},"json");
					
					
					
				});
				var time=setInterval(function(){
					hth=false;
					clearInterval(time);
				},400);
			}
		
		}
	});
	
	
	//话题回复收起
	$('span.tal-t41 .tc-t13').live("click",function() {
		$th=$(this);
		$th.siblings(".tc-t12").css("display","inline");
		$th.css("display","none");
		$th.closest(".tcp-al-t3").siblings(".tpc-reply-all").slideUp(200);
		if (editor) {
			editor.remove();
			editor = null;
		}
	});
	
	//话题详情分享
	$('div.jiathis-to,div..jiathis-to1').live("mouseenter",function() {
		$(this).children(".jt-t1").addClass("jt-t2");
		$(this).children(".jiathis_style").css("display","inline-block");
		$(this).children(".jiathis_style").addClass("jt-th1");
	}).live("mouseleave",function(){
		$(this).children(".jt-t1").removeClass("jt-t2");
		$(this).children(".jiathis_style").css("display","none");
		$(this).children(".jiathis_style").removeClass("jt-th1");
	});
});

//圈子回复话题
var CircleTopicReply=function(tmp){
	var obj = $(tmp), Reing_B = obj.attr("Reing") || "0";
	//var $rct=decodeURIComponent(editor.text());
	var circleId=obj.attr("data-circleid"),
	tid=obj.attr("data-topicid"),
	tab=obj.attr("data-tab");
	//var $rct=decodeURIComponent(editor.html().replace(/<(?!img|IMG)[^\<\>]*>/g,"").replace(/\&nbsp;/,""));
	var $rct=editor.html().replace(/<(?!img|IMG)[^\<\>]*>/g,"").replace(/\&nbsp;/,"");
	csc.useDialog(function(){
		if($rct==""){
			//csc.alert("回复内容不能为空！")  
			return false;
		}else if(obj.closest(".trr-21-1").siblings(".rep-font-nu").html().indexOf("已超出")>0){
			return false;
		}else{
			if(Reing_B == 0){
				obj.css("color","#DDD").attr("Reing","1");
				var _url = '/doCircle?t=replyTopic&topicId='+tid+ "&circleId="+circleId+"&tab="+tab,
					_data = {"replyContent":$rct};
				$.post('/doCircle?t=replyTopic&topicId='+tid+ "&circleId="+circleId+"&tab="+tab,{"replyContent":$rct},function(data){		
					var status=data.success,
						msg=data.msg;
					if(status==='true'){//提交成功;
						var repVal=obj.closest(".tpc-reply-all");
						if(tab=="topic"){
								ajaxRe('/topicReplyList.html?topicId='+tid+'&circleId='+circleId+"&tab="+tab,tid+"_TPBox",function(){
									obj.css("color","#FFF").attr("Reing","0");
									if (editor) {
										editor.remove();
										editor = null;
									}
									$.get("/interface/islogin",function(data){
									if(data.islogin==1){
										$.getScript('//res.csc86.com/js/p/kindeditor/4.1.2/kindeditor-min.js', function() {
											KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
											editor = KindEditor.create(repVal.find("textarea[name=replyContent]"), {
												themeType : 'qq',
												pasteType : 1,
												items : ['emoticons'],
												newlineTag:'br',
												afterChange : function() {
													var v='还可以输入<b class="chLeft">500</b>个字';
													if(this.count('text')==0){
														KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
													}else if(this.count('text')>500){
														v='<b class="chLeft">已超出'+(this.count('text')-500)+'个字</b>';
														KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
													}else if(1<this.count('text')<500){
														v='还可以输入<b class="chLeft">'+(500-this.count('text'))+'</b>个字';
														KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn">');
													}
													KindEditor(".rep-font-nu").html(v);
												}
											});
										});
									}else{
										$.getScript('//res.csc86.com/js/p/kindeditor/4.1.2/kindeditor-min.js', function() {
											KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
											editor = KindEditor.create(repVal.find("textarea[name=replyContent]"), {
												themeType : 'qq',
												pasteType : 1,
												items : ['emoticons'],
												newlineTag:'br',
												afterChange : function() {
													var v='还可以输入<b class="chLeft">500</b>个字';
													if(this.count('text')==0){
														KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
													}else if(this.count('text')>500){
														v='<b class="chLeft">已超出'+(this.count('text')-500)+'个字</b>';
														KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
													}else if(1<this.count('text')<500){
														v='还可以输入<b class="chLeft">'+(500-this.count('text'))+'</b>个字';
														KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn">');
													}
													KindEditor(".rep-font-nu").html(v);
												},
												readonlyMode : true
											});
										});	
									}		  
								},"json");
							},1);
						}else{
							ajaxRe('/topicReplyList.html?topicId='+tid+'&circleId='+circleId+"&tab="+tab,tid+"_TPBox",function(){
							obj.css("color","#FFF").attr("Reing","0");
							},1);
						}
					}
					else{
						if(msg==='sns_disable_word'){
							var wjcTxt;
							for(var key in data.data){ wjcTxt = data.data[key]; }
							artDialog({
								id:'errorTip',
								title:false,
								content:'<h2 style="font-size:16px;">对不起，您回复的内容不规范！</h2><p><strong>评论</strong>&nbsp;中的<span style="color:#f00;">"'+wjcTxt+'"</span>,属于违禁词或敏感词,请修改!</p>',
								fixed: true,
								lock:true,
								width:380,
								opacity:0,
								icon:'mem-n',
								ok:function(){}
							});
						}
						else if(msg==='login_fail'){
							login();
						}
						else if(msg==='sns_param_wrong'){
							csc.tip("参数数据错误！",2);
						}
						else if(msg==='sns_black_list'){
							csc.tip("该用户在黑名单中！",2);
						}
						else if(msg==='sns_circle_status_Abnormal'){
							csc.tip("圈子是非正常状态！",2);
						}
						else{
							csc.tip("操作失败！",2);
						}
						obj.css("color","#FFF").attr("Reing","0");
					}
				},'json');
				
			}
		}
	});
}

//字数倒记
var checkLength=function (which,um,id){
	var maxChars = um;
	var $th=$(which);
	if (which.value.length > maxChars)
	which.value = which.value.substring(0,maxChars);
	var curr = maxChars - which.value.length;
	$th.siblings(".trr-r2").find(".rep-font-nu").children(".chLeft").html(curr.toString());
	if(curr<500){
		$th.siblings(".trr-r2").find("input.r2-btn1").removeAttr("disabled").removeClass("r2-btn1").addClass("r2-btn");
	}else if(curr==500){
		$th.siblings(".trr-r2").find("input.r2-btn").attr("disabled","true").removeClass("r2-btn").addClass("r2-btn1");
	}
}

//对评论进行回复
var replyTopicComment=function(topicId,tmp){
	var obj=$(tmp),Reing_B = obj.attr("Reing") || "0";
	var le=obj.parent(".trr-r2").prev(".rep-text").val().length;
	if(le<=0){
		csc.alert("请输入回复内容！");
		return false;
	}else if(le>500){
		csc.alert("回复内容在500字之内！");
		return false;
	}else{
		if(Reing_B == 0){
			obj.css("color","#DDD").attr("Reing","1");
			var url="/activity/doReply?t=add&"+$("#"+topicId+"ReplyForm").serialize()+"&topicId="+topicId;	
			$.post(url,function(data){
				if("sns_newComment_000"==data.code){
						csc.success("回复成功！");
						ajaxRe("/activity/replyList?topicId="+topicId,topicId+"_APBox",function(){
								obj.css("color","#FFF").attr("Reing","0");
						});		
				}else if("login_fail"==data.code){
					login();
				}else if('sns_disable_word'==data.code){
					var wjcTxt;
					for(var key in response.data){ wjcTxt = response.data[key]; }
					artDialog({
						id:'errorTip',
						title:false,
						content:'<h2 style="font-size:16px;">对不起，您回复的内容不规范！</h2><p><strong>评论</strong>&nbsp;中的<span style="color:#f00;">"'+wjcTxt+'"</span>,属于违禁词或敏感词,请修改!</p>',
						fixed: true,
						lock:true,
						width:380,
						opacity:0,
						icon:'mem-n',
						ok:function(){}
					});
					obj.css("color","#FFF").attr("Reing","0");//重新启用回复按钮
				}else
					csc.alert(data.desc);
			},"json");
		}
	}
}

//话题赞
function topicPraise(tmp){
	var obj=$(tmp);
	var topicId=obj.attr("data-topicid");
	$.get(csc.url("quan","/like.html?topicId="+topicId),function(data){
		if("sns_likeTopic_000"==data.code){
			obj.siblings(".tal-one").fadeIn(100).animate({top: '-40px'}, "1000").fadeOut(500).animate({top: '-20px'}, "1000");
			obj.html('赞(<b class="b1-1">'+data.desc+'</b>)');
		}else if("login_fail"==data.code){
			login();
		}else if("sns_likeTopic_001"==data.code){
			topicPraiseNo(obj);
		}else{
			csc.alert(data.desc);
		}
	},"json");
}
//赞过了
function topicPraiseNo(tmp){
	$th=$(tmp);
	$th.siblings(".tal-expire").stop(true).removeAttr("style")
		.fadeIn(100).animate({top: '-40px',opacity:0}, 450);//.fadeOut(200);
}

//修改公告
function reNotice(){
	$(".r-notice .rn-t2").css("display","none");
	$(".r-p-look").removeClass("mb-show");
	$(".rn-re").addClass("mb-show");
}

//话题列表展开内容
var sha=false;
function topShowAll(tmp){
	var $th=$(tmp);
	if($.trim($th.html())=="展开内容"){
		if($th.parent(".tpc-la-t2").siblings(".tp-content").find(".topic-c-all").html()==""){
			if(!sha){
				var loding=loading_box();
				$.get("topicDetail.html?topicId="+$th.closest(".tpc-list-all").attr("data-topicid"),function(data){
					if(loding){loding.close();}
					if("000"==data.code){
						$th.parent(".tpc-la-t2").siblings(".tp-content").find(".topic-c-all").html(data.desc);
						$("div.topic-c-all").css("display","none");
						$(".topic-c-sig,div.plist-img-i1").css("display","block");
						$(".tpc-la-t2 a").html("展开内容");
						$th.parent(".tpc-la-t2").siblings(".tp-content").find(".topic-c-sig,.plist-img-i1").css("display","none").siblings(".topic-c-all").css("display","block");
						$th.html("收起内容");
					}else{
						csc.alert(data.desc);
					}
				},"json");
			}
		}else{
			$("div.topic-c-all").css("display","none");
			$(".topic-c-sig,div.plist-img-i1").css("display","block");
			$(".tpc-la-t2 a").html("展开内容");
			$th.parent(".tpc-la-t2").siblings(".tp-content").find(".topic-c-sig,.plist-img-i1").css("display","none").siblings(".topic-c-all").css("display","block");
			$th.html("收起内容");
		}
	}else{					  
		$th.parent("div.tpc-la-t2").siblings(".tp-content").find(".topic-c-all").css("display","none").siblings("div.topic-c-sig,div.plist-img-i1").css("display","block");
		//$th.parent(".tpc-la-t2").siblings(".tp-content").find(".topic-c-all").animate({height: 'toggle', opacity: 'toggle' },300).siblings(".topic-c-sig").animate({height: 'toggle', opacity: 'toggle' }, { duration: "slow" });
		$th.html("展开内容");
	}
}

//5:删除话题 从tradering.js移至过来的
csc.delTopic=function(topicId,circleId,type){
	csc.useDialog(function (){
		csc.confirm("您确认要删除话题？",function (){
			$.get("/doCircle?t=delTopic&circleId="+circleId+"&topicId="+topicId,function(data){
				var $val=data.replace(/\s/g,'');
					if($val=="sns_updateTopicCheck_000"){
						csc.success("删除成功！");
						if("list"==type) ajaxRe("/topicList?circleId="+circleId+"&tab=topic"
,"dataListBox",updata_numb);
						else window.location.href="/index.html?circleId="+circleId;
					}else if("LOGIN_FAIL"==$val){ 
						login();
					}else{csc.alert("删除失败！")}					
			},"html");	
		});	
	});	
};

//屏蔽话题
csc.shadowTopic=function(topicId,circleId,state,url){
	$.get("/doCircle?t=shadowTopic&topicId="+topicId+"&circleId="+circleId+"&state="+state,function(data){
			$val=$.trim(data);
			if("sns_updateTopicCheck_000"==$val){
				if(undefined==url) location.reload();
				else ajaxRe(url,"dataListBox",function(){
					csc.success("操作成功！");
					updata_numb();
				});				
			}else if ("SNS_AUTH"==$val)	{
				csc.alert("您无权限操作当前数据");
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else csc.alert("操作失败！您无操作权限");					
	},"html");	
};

//7:隐藏话题
csc.hideTopic=function(topicId,circleId,state,url){
	$.get("/doCircle?t=hideTopic&circleId="+circleId+"&topicId="+topicId+"&state="+state,function(data){
		var $val=data.replace(/\s/g,'');
		csc.useDialog(function (){
			if($val=="sns_updateTopicCheck_000"){				
				if(undefined==url) window.location.reload();
				else ajaxRe(url,"dataListBox",function(){
					csc.success("操作成功！");
					updata_numb();
				});
				
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else{csc.alert("操作失败！")}
			});	
	},"html");	
};

//修改圈子
csc.editCircle=function(circleId){
	var src="/edit?circleId="+circleId
	$.get("/edit?circleId="+circleId,function(data){
		if("login_fail"==data){
			login();
		}else{
			csc.useDialog(function(){
				 artDialog({
					title:'圈子基本信息修改',
					content: "<iframe src='"+src+"' id='editCircleRr' frameborder='0' scrolling='no'></iframe>",
					okVal: '提交修改',
					padding:"0 10px",
					ok:function(){
						$(".fou-er-font",$("#editCircleRr").contents()).css("display","none");
						var dataVal=$("#editCircleInfoForm",$("#editCircleRr").contents()).serialize(),
							name=$("input[name=circleName]",$("#editCircleRr").contents()).val(),
							cType=$("select[name=circleType] option:selected",$("#editCircleRr").contents()).attr("value"),
							ccatId=$("select[name=catId] option:selected",$("#editCircleRr").contents()).attr("value"),
							ccity=$("#cityBox select option:selected",$("#editCircleRr").contents()).attr("value"),
							circleDescription=$("textarea[name=circleDescription]",$("#editCircleRr").contents()).val(),
							fontN=/^([\u4E00-\u9FA5]|[A-Za-z])*$/;
						if(name==""||name.length>10||!fontN.test(name)||cType==""||ccatId==""||ccity==""||circleDescription==""||circleDescription.length>200 || top.quan_title_jc){
							if(name==""){$("input[name=circleName]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block").html("请输入圈子名称");}
							if(name.length>10){$("input[name=circleName]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block").html("圈子名称不能超过10字");}
							if(!fontN.test(name)){$("input[name=circleName]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block").html("圈子名称不能含有数字或特殊符号");}
							if(top.quan_title_jc){$("input[name=circleName]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block").html("抱歉，该圈子已有人创建了，请换个名称");}
							if(cType==""){$("select[name=circleType]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block");}
							if(ccatId==""){$("select[name=catId]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block");}
							if(ccity==""){$("#cityBox",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block");}
							if(circleDescription==""){$("textarea[name=circleDescription]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block").html("请选输入圈子简介");}
							if(circleDescription.length>200){$("textarea[name=circleDescription]",$("#editCircleRr").contents()).siblings(".fou-er-font").css("display","inline-block").html("圈子简介不能超过200字");}
							return false;
						}else{
							$.get("/doCircle?t=edit&circleId="+circleId+"&"+dataVal,function(data){
								var $val=$.trim(data);
								if("sns_modifyCircle_000"==$val){ 
									csc.success("修改成功");
									setTimeout(function(){location.reload();},500);
								}else if("sns_modifyCircle_001"==$val){
									csc.alert("修改失败,圈子名称重复!");
								}else{
									 csc.alert("修改失败,请重试");
								}
							});
						}
					},
					fixed: true,
					background:"#000",
					opacity:"0.3",
					lock:true
				});
			});
		}
	},'html');
};

///删除自己的回复信息
var editor;
csc.delComment=function(cid,tid,circleId,tab,tmp){	
var obj=$(tmp);
	csc.useDialog(function(){
		csc.confirm("您确定要删除当前回复信息？",function (){
			$.get("/doCircle?t=delCom&cid="+cid,function(data){
				var $val=data.replace(/\s/g,'');
					if($val=="sns_deleteCircleComment_000"){
						csc.success("操作成功！");
						if(tab=="topic"){
							if (editor) {
								editor.remove();
								editor = null;
							}
							var repVal=obj.closest(".tpc-reply-all");
							ajaxRe("/topicReplyList?topicId="+tid+"&circleId="+circleId+"&tab="+tab,tid+'_TPBox',function(){
								$.getScript('//res.csc86.com/js/p/kindeditor/4.1.2/kindeditor-min.js', function() {
									KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
									editor = KindEditor.create(repVal.find("textarea[name=replyContent]"), {
										themeType : 'qq',
										pasteType : 1,
										items : ['emoticons'],
										afterChange : function() {
											var v='还可以输入<b class="chLeft">500</b>个字';
											if(this.count('text')==0){
												KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
											}else if(this.count('text')>500){
												v='<b class="chLeft">已超出'+(this.count('text')-500)+'个字</b>';
												KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn1">');
											}else if(1<this.count('text')<500){
												v='还可以输入<b class="chLeft">'+(500-this.count('text'))+'</b>个字';
												KindEditor(".class45").html('<input type="button" value="回复" class="g-f-r r2-btn">');
											}
											KindEditor(".rep-font-nu").html(v);
										}
									});
								});																						  
							});
						}else{
							ajaxRe("/topicReplyList?topicId="+tid+"&circleId="+circleId+"&tab="+tab,tid+'_TPBox');
						}
					}else if("LOGIN_FAIL"==$val){ 
						login();
					}else{csc.alert("操作失败！")}					
			},"html");	
		});	
	});
};

//1:修改公告
var editNotice=function(circleId){
	var dataval=$("#editNoticeForm").serialize();
	var notice=$("#notice").val(),val;
	if(notice==""&&($.trim($("#noticeBox").html())=="暂无公告")){
		$(".r-p-look").addClass("mb-show");
		$(".rn-re").removeClass("mb-show");	
		$(".r-notice .rn-t2").css("display","block");
	}else{
		$.get("/doCircle?t=editNotice&circleId="+circleId+"&"+dataval,function(data){
			var $val=$.trim(data);
			if("sns_newCircleNotice_000"==$val){ 
				csc.success("修改成功");
				ajaxRe("/notice?circleId="+circleId,"noticeBox",function(){
					$(".r-p-look").addClass("mb-show");
					$(".rn-re").removeClass("mb-show");	
					$(".r-notice .rn-t2").css("display","block");
				});
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else csc.alert("修改失败,请重试");

		});
	}
};


//话题置顶
var topTopic=function(topicId,url,type,page){
	csc.useDialog(function(){
		if("UT"==type){
		//如果此处为取消置顶，需要弹出框提示
			csc.confirm("您确定要取消置顶吗？",function (){
				$.post("/topTopic.html",{"topicId":topicId,"type":type},function(data){
					if("login_fail"==data.code){
						login();
					}else if("sns_cancelOnTop_000"== data.code){
						if("list"==page){
							csc.success(data.desc);
							ajaxRe(url,"dataListBox");
						}else{
							csc.success(data.desc);
							setTimeout(function(){location.reload();},500);
						}
					}else csc.alert(data.desc);	  
				},"json");	
				
			});
		}else{
			$.post("/topTopic.html",{"topicId":topicId,"type":type},function(data){
				if("login_fail"==data.code){
					login();
				}else if("sns_onTopTopic_000"==data.code){
					if("list"==page){
						csc.success(data.desc);
						ajaxRe(url,"dataListBox");
					}else{
						csc.success(data.desc);
						setTimeout(function(){location.reload();},500);
					}
				}else csc.alert(data.desc);	  
			},"json");	
		}
	 });
}

function showTopic(){
	//showTopic_ajaxBind();
	csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){csc.hover(".q_tpc_title .f_comm");});
}


function showTopic_ajaxBind(){
	if(typeof(KindEditor) !== "undefind" && $("#replyContent").length){
		editor = KindEditor.create("#replyContent", {
			themeType : 'qq',
			pasteType : 1,
			newlineTag:'br',
			keyboardShortcut:false,
			afterChange : function() {
				//var v='还可以输入<b class="chLeft">500</b>个字';
				//$(editor.srcElement[0]);
				//this.html(this.html().replace(/<(?!img|IMG)[^\<\>]*>/g,""));
				showTopic_jc(this.count('text'));
				this.sync();
			}
		});
		seajs.use(csc.url("res","/js/m/emoticons"),function (){
			$("#addreg").find(".emoticons").on("click",function(){emoticons_ico.emoticons(editor,this)});
		})
	}
}


function showTopic_jc(n){
	var pass=false,v='还可以输入<b class="chLeft">500</b>个字';
	if(n==0){
		$("#submitBtn").attr({"class":"r2-btn1","disabled":true});
	}else if(n>500){
		v='<b class="chLeft">已超出'+(n-500)+'个字</b>';
		$("#submitBtn").attr({"class":"r2-btn1","disabled":true});
	}else if(1<=n && n<=500){
		v='还可以输入<b class="chLeft">'+(500-n)+'</b>个字';
		$("#submitBtn").attr({"class":"r2-btn","disabled":false});
		pass = true;
	}
	$(".rep-font-nu").html(v);
	return pass;
}

function showTopic_Reply(form){//圈子详情页面发表回复
	var n = editor.count('text'),
		o = form ? $(form): $("#addreg"),
		tid = o.find("input[name='topicId']").val(),
		circleId = o.find("input[name='circleId']").val();
	/*if($("#submitBtn").prop("disabled")){
		return false;
	}
	$("#submitBtn").attr({"disabled":true,"class":"r2-btn1"});*/
	if(showTopic_jc(n)){
		csc.useDialog(function(){
			$("#replyContent").val($("#replyContent").val().replace(/<(?!img|IMG)[^\<\>]*>/g,""));
			var f_data = o.serialize();
			$("#submitBtn").attr({"disabled":true,"class":"r2-btn1"}).val('提交中');
			$.post('/doCircle?t=replyTopic',f_data,function(response){
				var msg=response.msg;
				if(response.success && msg == "sns_newComment_000"){
					ajaxRe('/topicReplyList.html?topicId='+tid+'&circleId='+circleId+"&tab=&t=replyTopic",tid+"_TPBox",function(){},0);
				}else{
					if(msg == "login_fail"){
						login();
					}else if(msg == "sns_disable_word"){//违禁词判断
						var wjcTxt;
						for(var key in response.data){ wjcTxt = response.data[key]; }
						artDialog({
							id:'errorTip',
							title:false,
							content:'<h2 style="font-size:16px;">对不起，您回复的内容不规范！</h2><p><strong>评论</strong>&nbsp;中的<span style="color:#f00;">"'+wjcTxt+'"</span>,属于违禁词或敏感词,请修改!</p>',
							fixed: true,
							lock:true,
							width:380,
							opacity:0,
							icon:'mem-n',
							ok:function(){}
						});
					}
					else if(msg == "sns_param_wrong"){
						csc.tip('参数数据错误！',2);
					}
					else if(msg=="sns_black_list"){
						csc.tip('该用户在黑名单中！',2);
					}
					else if(msg=="sns_circle_status_Abnormal"){
						csc.tip('圈子是非正常状态！',2);
					}
					else{
						csc.tip("操作失败！",2);
					}
					$("#submitBtn").attr({"class":"r2-btn","disabled":false}).val('回复');
				}
			},"json");
		})
	}
	return false;
}

//邀请链接打开圈子页的提示;
csc.invite_quan_msg = function(type,msg){
	if(type == "1"){//成功
		csc.useDialog(function(){
			csc.success(msg);
		});
	}
	if(type == "2"){//失败
		csc.useDialog(function(){
			csc.error(msg);
		});
	}
	if(type == "3"){//未登陆
		seajs.use(csc.url("res","/f=js/m/sign"),function (){
			csc.checkSign("location.reload");
		});
	}
};

//邀请链接打开活动页的提示;
csc.invite_event_msg = function(type,msg){
	if(type == "1"){//成功
		csc.useDialog(function(){
			csc.success(msg);
		});
	}
	if(type == "2"){//失败
		csc.useDialog(function(){
			csc.error(msg);
		});
	}
	if(type == "3"){//未登陆
		seajs.use(csc.url("res","/f=js/m/sign"),function (){
			csc.checkSign("location.reload");
		});
	}
	if(type == "4"){//要先加入圈子
		csc.useDialog(function(){
			artDialog({
				id:"cscConfirm",
				content:"你访问的活动仅限圈内成员能参加，你暂时还不是此圈子的成员，你现在是想要？",
				fixed: true,
				title: false,
				icon: _ARTDIALOG_SKINS_ICOS_[3] || 'mem-q',
				ok:function(){
					$.get("/activity/joinCircleActivity",msg,function(data){
						if(data.code == "invite_join_circle_success"){
							location.reload();
						}else{
							csc.error("参加失败!");
						}
					},"json");
				},
				cancel:function(){
					window.close();
				}
			});
		});
	}
};
