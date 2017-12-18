var fTitle=true;
top.quan_title_jc = false;

$(function(){
	//对生意圈头部搜索增加埋点
	$('.m-search form').on('submit',function(){
		var val= $.trim($(this).find('#search-txt').val());
		cscga('create', 'SU-10001-1', 'auto','searchTracker');
		cscga('searchTracker.require', 'cscplugin',{
			searchKeyWord:val,
			eventAction:'searchSuccess'
		});
		cscga('searchTracker.cscplugin:searchInit');
	});

	//话题内容升展
	/*$("#editTagNameForm input").blur(function(){
		$(this).css("border","none");
		var etag=document.getElementById("etagName").value;
		if(etag==""||etag=="点击添加我的圈标"){
			$.get("/doCircle?t=editTagName&etagName=",function(data){});
		}else{
			$.get("/doCircle?t=editTagName&"+$("#editTagNameForm").serialize(),function(data){});
		}
	}).focus(function(){
		$(this).css({"borderLeft":"1px solid #e3e9ef","borderRight":"1px solid #e3e9ef","borderBottom":"1px solid #e3e9ef","borderTop":"1px solid #abadb3"});
	});*/
	$(".tr-sea ul").hover(
	  function () {
		$(this).addClass("sea-hove");
	  },
	  function () {
		$(this).removeClass("sea-hove");
	  }
	);
	$(".tr-sea ul li").hover(
	  function () {
		$(this).addClass("cur");
	  },
	  function () {
		$(this).removeClass("cur");
	  }
	);
	$(".tr-sea ul li").live("click",function () {
		var $val=$(".tr-sea ul li.cur .t-s-c").html();
		$(".tr-sea ul li.cur .t-s-c").html($(".tr-sea ul li .t-s-f").html());
		$(".tr-sea ul li .t-s-f").html($val);
		$(".tr-sea ul").removeClass("sea-hove");
	  }
	);
	$(".tr-more").hover(
	  function () {
		$(this).children(".tr-m-h").addClass("tr-m-s");
	  },
	  function () {
		$(this).children(".tr-m-h").removeClass("tr-m-s");
	  }
	);
	$(".tr-main-list>li").live("mouseenter",function(){
		$(this).addClass("cur");										  
	});
	$(".tr-main-list>li").live("mouseleave",function(){
		$(this).removeClass("cur");										  
	});
	
	//创建圈子名称不能相同	
	$("input[name=circleName]").blur(function(){
		var data=typeof($(this).attr("data-oldcirclename"))=="undefined"?false:true;
		var fontN=/^([\u4E00-\u9FA5]|[A-Za-z])*$/;
		if($(this).val()!=""){
			if($(this).val().length>10){
				fTitle=true;
				$("input[name=circleName]").siblings(".fou-er-font").html("圈子名称不能超过10字").css("display","inline-block");
			}else if(!fontN.test($(this).val())){
				fTitle=true;
				$("input[name=circleName]").siblings(".fou-er-font").html("圈子名称不能含有数字或特殊符号").css("display","inline-block");
			}else{
				if(data){
					if($(this).attr("data-oldcirclename")!=$(this).val()){
						$.post("/cSname.html",{"name":$(this).val()},function(data){
							if(data=="Y"){
								fTitle=false;
								top.quan_title_jc = true;
								$("input[name=circleName]").siblings(".fou-er-font").html("抱歉，该圈子已有人创建了，请换个名称").css("display","inline-block");
							}else{
								fTitle=true;
								top.quan_title_jc = false;
								$("input[name=circleName]").siblings(".fou-er-font").css("display","none");
							}						 
						})
					}else{
						top.quan_title_jc = false;
						$("input[name=circleName]").siblings(".fou-er-font").css("display","none");
					}
				}else{
					$.post("/cSname.html",{"name":$(this).val()},function(data){
						if(data=="Y"){
							fTitle=false;
							top.quan_title_jc = true;
							$("input[name=circleName]").siblings(".fou-er-font").html("抱歉，该圈子已有人创建了，请换个名称").css("display","inline-block");
						}else{
							fTitle=true;
							top.quan_title_jc = false;
							$("input[name=circleName]").siblings(".fou-er-font").css("display","none");
						}						 
					})
				}
			}
		}else{
			fTitle=true;
			$("input[name=circleName]").siblings(".fou-er-font").html("请输入圈子名称").css("display","inline-block");
		}
	});
	
	//圈子搜索 右则荐圈子
	$("div.q-s-r ul.qsr-nmt").live("mouseenter",function(){
		$(this).find(".q-add").css("display","inline-block");							  
	}).live("mouseleave",function(){
		$(this).find(".q-add").removeAttr("style");	
	});
	
	//圈子搜索 展开
	$(".qsl-con .q-more").live("click",function(){
		$(".qsl-con .de,.qsl-con .full").removeAttr("style");
		$(this).parent().css("display","none").siblings(".full").css("display","block");
	})
	
	//圈子搜索 收起
	$(".qsl-con .q-show").live("click",function(){
		$(".qsl-con .de,.qsl-con .full").removeAttr("style");
		//$(this).parent().siblings(".de").css("display","none").siblings(".full").css("display","block");
	})
	
	//创建圈子加标签删除
	if(typeof($del_tag)=="undefined"){
		$del_tag = true;
		$(".lqt-all span a").live("click",function(){
			var text=$("input[name=tagName]").val();
				tary=text.split(","),
				index=$(".lqt-all span").index($(this).parent()),
				tary.splice(index,1);
			$(this).closest(".label-quan").siblings(".fip-br").removeAttr("style").html("最多可用"+$(this).attr("data")+"个关键词做为标签，每个标签用逗号（,）或分号（;）分隔。");
			$(".lqt-all span:eq("+index+")").detach();
			$("input[name=tagName]").val(tary.join(","));
			return false;
		})		
	}
	
	//创建圈子提交申请
	$("#crtQwanFrm").on("submit",function(){
		var $this=$(this),
			$smt=$this.find("button[type=submit]");
			
		//验证表单
		var validStaus=checkNull();
		if(!validStaus){
			return false;
		}
		
		//ajax提交
		$smt.val("提交中...").text("提交中...").attr("disabled",true);
		$.ajax({
			url:$this.attr('action'),
			type:"post",
			data:$this.serializeArray(),
			dataType:"jsonp",
			success:function(data){
				var success=data.success,
					msg=data.msg;
				if(success==="true"){
					location.href=data.url;
				}else{
					if(msg=="sns_disable_word"){
						var wjcTip="",arry=[];
						$.each(data.data,function(i,n){
							if(n!=""){
								switch (i){
									case "circleName":
									wjcTip+='<p><strong>圈子名称</strong>中的<span style="color:#f00;">“'+n+'”</span>,属于违禁词或敏感词,请修改!</p>';
									break;
									case "circleDescription":
									wjcTip+='<p><strong>圈子简介</strong>中的<span style="color:#f00;">“'+n+'”</span>,属于违禁词或敏感词,请修改!</p>';
									break;
									case "tagName":
									wjcTip+='<p><strong>圈子标签</strong>中的<span style="color:#f00;">“'+n+'”</span>,属于违禁词或敏感词,请修改!</p>';
									break;
									default:
									wjcTip+='<p><strong>申请理由</strong>中的<span style="color:#f00;">“'+n+'”</span>,属于违禁词或敏感词,请修改!</p>';
									break;
								}
								arry.push(i);
							}
						});
						csc.useDialog(function(){
							art.dialog({
								id:'errorTip',
								title:false,
								content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2>'+wjcTip,
								fixed: true,
								lock:true,
								width:380,
								padding:'25px 50px 25px 25px',
								opacity:0.2,
								icon:'mem-n',
								ok:function(){},
								close:function(){
									if(arry[0]=="circleName"){
										$("input[name="+arry[0]+"]").focus();
									}else{
										$("textarea[name="+arry[0]+"]").focus();
									}
								}
							});
						});
							
					}
					else if(msg=="login_fail"){
						dialogTip("登录超时！",2,function(){
							location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
						});
					}else{
						dialogTip("操作失败！",2);
					}
				}
			},
			error:function(){
				dialogTip("操作失败！",2);
			},
			complete:function(){
				$smt.val("提交申请").text("提交申请").removeAttr("disabled");
			}
		});
		return false;
	});
});
//弹窗提示信息
function dialogTip(msg, closeTime, callback){
	csc.useDialog(function(){
		art.dialog({
			id: "cscTip",
			content: msg || '提示信息',
			fixed: true,
			lock:true,
			opacity:0.2,
			title:false,
			icon: "mem-w",
			time: closeTime || 1.5,
			close: callback || null
		});
	});
}
//创建圈子判断提示语
function controlF(tag,val){
	tag.siblings(".fou-er-font").css("display","inline-block").html(val);
}
//圈子申请提交
var check=false;
function checkNull(){
	$(".fou-er-font").css("display","none");
	var cName=$("input[name=circleName]"),
		cType=$("select[name=circleType]"),
		ccatId=$("select[name=catId]"),
		ccity=$("#cityBox select"),
		cDescription =$("textarea[name=circleDescription]"),
		cReason =$("textarea[name=createReason]"),
		ctagName =$("input[name=tagName]"),
		readingHnc=$("input[name=readingHnc]"),
		fontN=/^([\u4E00-\u9FA5]|[A-Za-z])*$/,
		fontN2=/^([\u4E00-\u9FA5]|[A-Za-z0-9]|\s|\,|;|，|；)*$/; 
	if(cName.val()==""||cName.val().length>10||(!fontN.test(cName.val()))||fTitle==false||cType.val()==""||ccatId.val()==""||cDescription.val()==""||cDescription.val().length>200||cReason.val()==""||cReason.val().length>200||ccity.val()==""||(!fontN2.test(ctagName.val()))||ctagName.val().length>60||readingHnc.attr("checked")!="checked"){
		var festE = null;	
		if(cName.val()==""){controlF(cName,"请输入圈子名称"); if(!festE){festE=cName;}}
		if(cName.val().length>10){controlF(cName,"圈子名称不能超过10字"); if(!festE){festE=cName;}}
		if(!fontN.test(cName.val())){controlF(cName,"圈子名称不能含有数字或特殊符号"); if(!festE){festE=cName;}}
		if(fTitle==false){controlF(cName,"抱歉，该圈子已有人创建了，请换个名称"); if(!festE){festE=cName;}}
		if(cType.val()==""){controlF($("select[name=circleType]"),"请选择圈子类型"); if(!festE){festE=cType;}}
		if(ccatId.val()==""){controlF($("select[name=catId]"),"请选择行业类型"); if(!festE){festE=ccatId;}}
		if(ccity.val()==""){controlF($("#cityBox"),"请选择所属地区"); if(!festE){festE=ccity;}}
		if(cDescription.val()==""){controlF(cDescription,"请选输入圈子简介"); if(!festE){festE=cDescription;}}
		if(cDescription.val().length>200){controlF(cDescription,"圈子简介不能超过200字"); if(!festE){festE=cDescription;}}
		if(ctagName.val().length>60){controlF(ctagName,"圈子标签不能超过60字"); if(!festE){festE=ctagName;}}
		if(!fontN2.test(ctagName.val())){controlF(ctagName,"圈子标签不能含有特殊符号"); if(!festE){festE=fontN2;}}		
		if(cReason.val()==""){controlF(cReason,"请填写申请理由"); if(!festE){festE=cReason;}}
		if(cReason.val().length>200){controlF(cReason,"申请理由不能超过200字"); if(!festE){festE=cReason;}}
		if(readingHnc.attr("checked")!="checked"){controlF(readingHnc.parent(),"您要同意“生意圈”使用须知，才能创建圈子。"); if(!festE){festE=readingHnc;}}
		festE.focus();
		return false;
	}else{
		/*if(!check){
			check=true;
			return true;	
		}*/
		return true;
	}
	return false;
}
//创建圈子加标签
function labelNu(event,um,obj,isBlur){//isBlur为true 或 false 或 直接省略，为true代表文本框只输入了一标签就失去焦点时
	event=event||window.event;
	var textVal=$("#tagName").val(),
		divBox=$(".lqt-all"),
		lastv=textVal.charCodeAt(textVal.length-1),
		spanl=$(".lqt-all span").length,
		tagName=$("input[name=tagName]").val(),inputVal;
		font=/^([\u4E00-\u9FA5]|[A-Za-z0-9]|\s|\,|;|，|；)*$/;  
	
	var fun=function(){
		if(spanl>=um){
			$(obj).closest(".label-quan").siblings(".fip-br").css("color","#FE0000").html("最多只能设置"+um+"个标签。");
		}else{
			if(!font.test(textVal)||textVal.replace(/\,+|\，+|；+|;+/,"")==""){
				$(obj).closest(".label-quan").siblings(".fip-br").css("color","#FE0000").html("只能输入汉字、字母、数字、空格。");
				return;
			}else{
				$(obj).closest(".label-quan").siblings(".fip-br").removeAttr("style").html("最多可用"+um+"个关键词做为标签，每个标签用逗号（,）或分号（;）分隔。");
				var val=textVal.replace(/\,|\，|；|;/,"").replace(/\s/," ");
				divBox.append('<span class="lab-lqs">'+val+'<a href="javascript:;" data="'+um+'">删除</a></span>');
				inputVal=tagName+","+val;
				$("input[name=tagName]").val(inputVal.replace(/^\,/,""));
			}
		}
		$("#tagName").val("");
	};
	/*if(event.keyCode==188||(event.target&&event.keyCode==59)||(event.srcElement&&event.keyCode==186)||event.keyCode==13||lastv==65292||lastv==65307){*/
	if(!isBlur){
		if(event.keyCode==188||(event.target&&event.keyCode==59)||(event.srcElement&&event.keyCode==186)||lastv==65292||lastv==65307){
			fun();
		}
	}else{
		fun();
	}
}
$(function(){
	$("#tagName").blur(function(){
		var val=$.trim($(this).val());
		if(val){
			labelNu(event,'10',this,true);
		}
	});
});

$(function () {
	var dv = $('.found-i-w').val(),
		divBox=$(".lqt-all");
	if (!$.trim(dv)) {
		return;
	}
	dv = dv.replace(/[\,\，\;]/g, ',');
	var arr = dv.split(',');
	for (var i = 0, len = arr.length; i < len; i ++) {
		divBox.append('<span class="lab-lqs">'+ arr[i] +'<a href="javascript:;" data="10">删除</a></span>');
	}
});

var csc= csc || {};
//加入圈子
csc.addCircleCircleId = "";
csc.addCircleObj = null;
csc.SNSURLs = {
	addTopickURL:"/thread/post/{CircleId}.html",
	addEventURL:"/event/post/{CircleId}.html"
}

csc.addCircleComm = function(r){
	if(r){csc.signDialogClose();}//清理登陆穿窗口
	$.get("/doCircle?t=authC&circleId="+csc.addCircleCircleId,function(data){
		var $val=data.code;
		if($val=="NO_POWER"){//无权加入
			csc.alert("你的身份不满足加入该圈子！")	
		}else if($val=="join_000"){//已加入
			if(csc.addCircleObj.attr("class") && csc.addCircleObj.attr("class").indexOf("tml-t2") != -1 ){
				csc.addCircleObj.removeClass("tml-t2").addClass("tml-t3").html("己加入").removeAttr("onclick");
			}else{
				location.reload();
				//location.href = "/?circleId=" + csc.addCircleCircleId;
			}
			if(r) {setTimeout(function(){location.reload();},500);}
		}else if($val=="join_001"){//己审请
			var boj_f = csc.addCircleObj.parent();
			boj_f.find("a.tml-t2").removeClass("tml-t2").addClass("tml-t3").html("等待审核中").removeAttr("onclick");
			csc.alert("您已经申请加入该圈子，请等待审核");
			if(r) {setTimeout(function(){location.reload();},500);}
		}else if($val=="LOGIN_FAIL"){//未登陆
			seajs.use(csc.url("res","/f=js/m/sign"),function (){
				csc.checkSign("csc.addCircleComm(1);eval");
			});
		}else if("no_auth"==$val){
			csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
		}else{//已登陆,未加入,未审请,有权审请
			csc.useDialog(function(){
				art.dialog({
				title:'申请加入商圈',
				content: data.code,
				fixed: true,
				okVal: '确定',
				background:"#000",
				opacity:"0.3",
				ok: function () {				
					//需要判断加入类型不能为空
					$.get("/doCircle?t=addC&circleId="+csc.addCircleCircleId+"&"+$("#addCircleForm").serialize(),function(data){
								var val=data.code;
								if("join_001"==val){
									csc.success("申请加入成功！");
									if(r) {
										 setTimeout(function(){location.reload();},500);
									}else{
										var sx_obj;
										if(csc.addCircleObj.attr("class")&&csc.addCircleObj.attr("class").indexOf("tml-t2")!=-1){
											sx_obj = csc.addCircleObj;
										}else{
											sx_obj = csc.addCircleObj.parent().find("a.tml-t2");
											location.href = "/" + csc.addCircleCircleId+".html";
										}
										sx_obj.removeClass("tml-t2").addClass("tml-t3").html("等待审核中").removeAttr("onclick");
									}
								}else if("join_000"==val){
									csc.success("您已成功加入！");
									if(r) {
										setTimeout(function(){location.reload();},500);
									}else{
										var sx_obj;
										if(csc.addCircleObj.attr("class")&&csc.addCircleObj.attr("class").indexOf("tml-t2")!=-1){
											sx_obj = csc.addCircleObj;
										}else{
											sx_obj = csc.addCircleObj.parent().find("a.tml-t2");
											location.href = "/" + csc.addCircleCircleId+".html";
										}	
										sx_obj.removeClass("tml-t2").addClass("tml-t3").html("己加入").removeAttr("onclick");
									}
								}else if("sns_fail_id"==val){
									csc.alert("ID无效！");
								}else{csc.alert("申请加入失败！,请重试");}		
							},"jsonp");																 
						
					},
					cancel: true,
					lock:true
				});	
			})
		}	
		
		
	},'jsonp')
}

//加入圈子按钮
csc.addCircle=function(circleId,o){
	csc.addCircleCircleId = circleId;
	csc.addCircleObj = $(o);
	csc.useDialog(function(){
		csc.addCircleComm();
	})
};

//打开创建话题页
csc.newHT = function(circleId){
	csc.LoginToURLMain(circleId,"addTopickURL");
}

//打开创建活动页
csc.newHD = function(circleId){
	csc.LoginToURLMain(circleId,"addEventURL");
}

//登陆并加入圈,跳转URL
csc.LoginToURLMain = function(circleId,url_key){
	csc.addCircleCircleId = circleId;
	csc.toURL = csc.SNSURLs[url_key].replace("{CircleId}",csc.addCircleCircleId);
	csc.useDialog(function(){
		csc.LoginToURL();
	})
}

csc.LoginToURL = function(r){
	if(r){csc.signDialogClose();}
	$.get("/doCircle?t=authC&circleId="+csc.addCircleCircleId,function(data){
		var $val=data.code;
		if($val=="NO_POWER"){//无权加入
			csc.alert("你的身份不满足加入该圈子！")	
		}else if($val=="join_000"){//已加入
			location.href = csc.toURL;
		}else if($val=="join_001"){//己审请
			csc.success("申请加入成功！请等待审核。");
			if(r){
				setTimeout(function(){location.reload();},500);
			}
		}else if($val=="LOGIN_FAIL"){//未登陆
			seajs.use(csc.url("res","/f=js/m/sign"),function (){
				csc.checkSign("csc.LoginToURL(1);eval");
			});
		}else if("no_auth"==$val){
			csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
		}else{//已登陆,未加入,未审请,有权审请
			csc.useDialog(function(){
				art.dialog({
				title:'申请加入商圈',
				content: data.code,
				fixed: true,
				okVal: '确定',
				background:"#000",
				opacity:"0.3",
				ok: function () {				
					//需要判断加入类型不能为空
					$.get("/doCircle?t=addC&circleId="+csc.addCircleCircleId+"&"+$("#addCircleForm").serialize(),function(data){
								var val=data.code;
								if("join_001"==val){//申请成功!
									csc.success("申请加入成功！请等待审核。");
									if(r){
										setTimeout(function(){location.reload();},500);
									}
								}else if("join_000"==val){//加入成功!
									location.href = csc.toURL;
								}else if("sns_fail_id"==val){//超时?
									csc.alert("ID无效！");
									setTimeout(function(){location.reload();},500);
								}else{//其他
									csc.alert("申请加入失败！,请重试");
									setTimeout(function(){location.reload();},500);
								}		
							},"jsonp");																 
						
					},
					cancel: true,
					lock:true
				});	
			})
		}	
	},'jsonp')	
}



//退出圈子
csc.exitCircle=function(circleId){
		$.get("/doCircle?t=exit&circleId="+circleId,function(data){
		var $val=data.replace(/\s/g,'');
			if($val=="sns_success"){
				csc.success("退出成功");
				setTimeout(function(){location.reload();},500);
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else{csc.alert("退出失败！")}					
	},"html");
};

//编辑圈标
/*csc.editTagname=function(circleId){
	$.get("/doCircle?t=editTagname&circleId="+circleId+"&content="+$("#tagName").val(),function(data){
		var $val=data.replace(/\s/g,'');
			if($val=="success"){
				csc.success("操作成功！");
			}else{csc.alert("操作失败！")}					
	},"html");	
};*/

//2:接受加入圈子的申请信息
csc.receiveApply=function(aid,circleId){
	$.get("/doCircle?t=receive&aid="+aid+"&circleId="+circleId,function(data){
		var $val=data.replace(/\s/g,'');	
			if($val=="sns_replyJoinCircle_000"){
				csc.success("操作成功！");				
				ajaxRe("/memberList?circleId="+circleId,'tr-mb-content',updata_numb);
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else{csc.alert("操作失败！")}					
	});	
};
//3:拒绝加入圈子的申请信息
csc.refuseApply=function(aid,circleId){
	$.get("/doCircle?t=refuse&aid="+aid+"&circleId="+circleId,function(data){
		var $val=data.replace(/\s/g,'');
			if($val=="sns_replyJoinCircle_000"){
				csc.success("操作成功！");
				//ajaxRe("/newMemberList?circleId="+circleId,'applyMemberListBox',updata_numb);
				ajaxRe("/memberList?circleId="+circleId,'tr-mb-content',updata_numb);
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else{csc.alert("操作失败！")}					
	},"html");	
};
//4:把成员踢出圈子
csc.kickedoutCircle=function(circleId,fuid,cid){
	csc.confirm("是否把该成员踢出当前圈子?",function (){
		$.get("/doCircle?t=kickout&circleId="+circleId+"&fuid="+fuid+"&cid="+cid,function(data){
			var $val=data.replace(/\s/g,'');
				if($val=="sns_kickOutCircle_000"){
					csc.success("操作成功！");
					ajaxRe("/memberList?circleId="+circleId,'tr-mb-content',updata_numb);
				}else if("LOGIN_FAIL"==$val){ 
					login();
				}else{csc.alert("操作失败！")}	
		},"html");	
	});
};

//1:加管理 
csc.addManage=function(circleId,fuid,cid){
	$.get("/doCircle?t=addM&circleId="+circleId+"&fuid="+fuid+"&cid="+cid,function(data){		
		var $val=data.replace(/\s/g,'');
		csc.useDialog(function (){
			if($val=="sns_newCircleManage_000"){
				csc.success("操作成功！");
				ajaxRe("/memberList?circleId="+circleId,'tr-mb-content',updata_numb);
			}else if("LOGIN_FAIL"==$val){ 
				login();
			}else{csc.alert("操作失败！")}	
			});	
	},"html");	
};
//2:取消管理
csc.cancelManage=function(circleId,fuid,cid){
	csc.useDialog(function (){
		csc.confirm("您确认要取消管理？",function (){
			$.get("/doCircle?t=cancelM&circleId="+circleId+"&fuid="+fuid+"&cid="+cid,function(data){
				var $val=data.replace(/\s/g,'');
					if($val=="sns_undoCircleManage_000"){
						csc.success("操作成功！");
						ajaxRe("/memberList?circleId="+circleId,'tr-mb-content',updata_numb);
					}else if("LOGIN_FAIL"==$val){ 
						login();
					}else{csc.alert("操作失败！")}
			},"html");	
		});	
	});	
};
//3:注销商圈
csc.destroyCircle=function(circleId){
	csc.useDialog(function (){
		csc.confirm("您确认要注销商圈？",function (){
			$.get("/doCircle?t=destroy&circleId="+circleId,function(data){
				var $val=data.replace(/\s/g,'');
				if($val=="sns_closeCircle_000"){
					csc.success("操作成功！");
					location.href='/default';
				}else if("LOGIN_FAIL"==$val){ 
					login();
				}else csc.alert("操作失败，请重试!");							
			},"html");	
		});	
	});	
};

//关闭
$(".sub-clo").live("click",function(){
	$(this).parents(".si-r-send").removeClass("mb-show");	
	//$(".ls-in").css("z-index","0");
	//$(".ls-opt li:eq(0)").click();
});


//话题图片放大
csc.showMax=function(img){
	var
		//maxWidth = document.documentElement.clientWidth - 20,
		//maxHeight = document.documentElement.clientHeight - 50,
		maxWidth = (document.documentElement.clientWidth||document.body.clientWidth)- 20,
		maxHeight =(document.documentElement.clientHeight||document.body.clientHeight)- 50,
		othis = this;
	othis.useDialog(function (){
		 artDialog({
			padding: "0 10px",
			title: '照片',
			content:othis.ie6 ? '' : '<div id="tp-max-img"><img src="'+img+'" style="max-width:'+maxWidth+'px;max-height:'+maxHeight+'px;" /></div>',
			lock: true,
			fixed:true,
			init:function(){		
				if(othis.ie6){
					var that = this;
					seajs.use(csc.url("res","/f=js/m/imgReady"),function (){
						imgReady(img, function () {
							var
								ratio = Math.min(maxWidth /this.width,maxHeight /this.height),
								width = ratio < 1 ? this.width*ratio : this.width;
							that.content('<div id="tp-max-img"><img src="'+img+'" width="'+width+'" /></div>').position("50%","50%");
						});
					});
				}
			},
			close:function (){
				this.hide();
				return false;
			}
		});
	});	
};

//栏目的排序方式
function circleDsort(t,val,obj){
	//circleType 商圈类型 如 地区商圈
	//memberSum:成员数
	//ctime:创建时间
	//city 城市
	//catType="行业类型";
	var circleType="";
	var catType="";
	var province="";
	var orderMode="";
	var orderDate="";
	var orderMemberN="";
	var url="/dCircleList?";
	switch(t){
		case "circleType":
			catType=$("#catType").val("");
			$("#circleType").val(val);
			break;
		case "memberSum":
			$("#orderMode").val(val);
			$("#_memberNumber").val(t);
			$("#createTime").val("");
			$("#_city").val("");	
			$(".cm-r-sea select").val("");
			$(obj).data("id",val);
			break;
		case "ctime":		
			$("#createTime").val(t);
			$("#orderMode").val(val);
			$("#_memberNumber").val("");
			$("#_city").val("");	
			$(".cm-r-sea select").val("");
			$(obj).data("id",val);
			
			break;
		case "city":
			$("#_city").val($(obj).val());	
			$("#createTime").val("");
			$("#orderMode").val("");
			$("#_memberNumber").val("");
			break;
		case "catType":
			//$(".cm-r-sea select ").find("option[value='0']").attr("selected",true);
			circleType=$("#circleType").val("");
			$("#catType").val(val);
			break;
	}
	circleType=$("#circleType").val();
	catType=$("#catType").val();	
	province=$("#_city").val();
	province=("undefined"==province || ""==province)?"":province;
	orderDate=$("#createTime").val();
	orderDate=("undefined"==orderDate || ""==orderDate)?"":orderDate;
	orderMode=$("#orderMode").val()
	orderMode=("undefined"==orderMode || ""==orderMode)?"":orderMode;
	orderMemberN=$("#_memberNumber").val();
	orderMemberN=("undefined"==orderMemberN || ""==orderMemberN)?"":orderMemberN;
	
	url+="circleType="+circleType
		+"&catType="+catType
		+"&province="+province
		+"&orderMode="+orderMode
		+"&orderDate="+orderDate
		+"&orderMemberN="+orderMemberN;
		
	csc.useDialog(function(){
		//csc.ART_loading_dialog = art.dialog({id:"ART_loading",title:false,cancel:false,drag: false,padding:"0px 25px",esc:false,fixed:true,top:"60%"});
		ajaxRe(url,"dataListBox",function(){
			//if(csc.ART_loading_dialog){csc.ART_loading_dialog.close();}
				switch(t){
					case "circleType":
						$(obj).addClass("cur");
						$(".mr-cf-t dd a").removeClass("cur");
						$(".cm-ring-all a").removeClass("cur");
						$(obj).addClass("cur");
						$(".mr-cf-t dd a").removeClass("cur");
						break;
					case "memberSum":
						$(".crs-p").removeClass("cp-t cp-b");		
						if(val=="desc"){
							$(obj).parent().addClass("cp-t");
						}else{
							$(obj).parent().addClass("cp-b");
						}
						break;
					case "ctime":
						$(".crs-p").removeClass("cp-t cp-b");			
						if(val=="desc"){
							$(obj).parent().addClass("cp-t");
						}else{
							$(obj).parent().addClass("cp-b");
						}
						break;
					case "city":
						$(".cm-r-sea .crs-p").removeClass("cp-b").removeClass("cp-t");
						break;
					case "catType":
						$(".cm-r-sea select ").find("option[value='0']").attr("selected",true);
						$(".cm-ring-all a").removeClass("cur");
						$(".mr-cf-t dd a").removeClass("cur");
						$(obj).addClass("cur");
						break;
				}
		},1);	
	})
}

//?列表排序
function circleIndexSort(t,obj,circleId){
	var aVal;
	if($(obj).data("id")=="DESC"){
		aVal="ASC";
		$("a.ls-sort").removeClass().addClass("ls-sort");
		$(obj).addClass("lss-bot");
	}else{
		aVal="DESC";
		$("a.ls-sort").removeClass().addClass("ls-sort");
		$(obj).addClass("lss-cur");
	}
	$(obj).data("id",aVal);
	ajaxRe("/topicList?circleId="+circleId+"&type="+t+"&s="+aVal+"&tab=topic",'dataListBox',1,updata_numb);
}

//
function loading_box(id){
	var options_ = {title:false,cancel:false,drag: false,padding:"0px 25px",esc:false,fixed:true,top:"60%"};
	if(id){options_["id"]=id};
	return art.dialog({title:false,cancel:false,drag: false,padding:"0px 25px",esc:false,fixed:true,top:"60%"});
}

//创建圈子页 中选私有圈
function checkPrivate(){
	var $th=$("input:radio[name=privateCircle]:checked");//privateCircle
	if($th.attr("value")=="private"){
		$("input[name=checkApply]").attr({checked:"true",disabled:"true"});
	}else{
		$("input[name=checkApply]").removeAttr("disabled").removeAttr("checked");
	}
}

//圈子广场2013年9月5日
$(function(){
	$(".wherelist a.remo").on("click",select_remo);
	$(".wherelist").each(function(index, element) {
		var o = $(element);
		if(o.find("a.remo").length){
			var a = o.find("a.hover");
			if(a.offset().top !== o.find("a").offset().top){
				select_remo.call(element);
			};
		};
	});
})
function select_remo(){
	var fdiv = $(this).parents(".quan_sql").find(".wherelist"),
		remoa = fdiv.find("a.remo");
	if(fdiv.attr("mark_zk") == "1"){
		fdiv.css("height","25px").attr("mark_zk","0");
		remoa.html('<i class="i_down"></i>更多');
	}else{
		fdiv.css("height","auto").attr("mark_zk","1");
		remoa.html('<i class="i_up"></i>收起');
	}
}


