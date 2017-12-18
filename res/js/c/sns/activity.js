//置顶
var imgUrl=csc.url("img");
csc.topActivity=function (activityId){
	$.get("/activity/doActivity?t=top&activityId="+activityId,function(data){
		if("sns_activityOnTop_000"==data.code){	
			csc.success(data.desc);
			url="/activity/activityList?circleId="+$("#activityCircleId").val()+"&catId="+$("#activityListUrlType").val();	
			ajaxRe(url,"activityBox",updata_numb);
		}else if("login_fail"==data.code){
			login();
		}else
		csc.alert(data.desc);
	},"json");		
};

//是否登录
csc.loginStutas = function(fun){
	var $name="";
	$.post("/public/personal/username",function($name){
		$name=$.trim($name);
		if($name=="NotLogin"){
			csc.useDialog(function (){
				csc.alert("您还没有登录，请先登录！",function(){
					location = "//member.csc86.com/login/phone";
					return false;
				});	
			});
		}else{
			if(typeof(fun) == "function"){
				fun();
			}	
		}
	});
}


//加入活动
csc.addActivity=function (url,activityId,box){
	$.get("/activity/doActivity?t=add&activityId="+activityId,function(data){
		if("sns_JoinActivity_000"==data.code){	
			csc.success(data.desc);
			ajaxRe(url,box,updata_numb);
		}else if("login_fail"==data.code){
		login();
		}else
			csc.alert(data.desc);
	},"json");
};

//审核通过 or 不通过
csc.passActivity=function (activityId,state,box,url){
	$.get("/activity/doActivity?t=audit&activityId="+activityId+"&isPass="+state,function(data){
		if("sns_activityAuditPass_000"==data.code){	
			csc.success(data.desc);			
			ajaxRe(url,box,updata_numb);
		}else if("login_fail"==data.code){
			login();
		}else
		csc.alert(data.desc);
	},"json");
};

// 感兴趣
csc.favorActivity=function (activityId,type,url,box){
		$.get("/activity/doActivity?t=inst&activityId="+activityId+"&type="+type,function(data){
			if("sns_cancel_or_favoriteActivity_000"==data.code){	
				switch(type){
					case "u":
						csc.confirm("是否取消感兴趣?",function (){
							csc.success(data.desc);
							window.location.reload();						
						});
					break;
					case "f":
						csc.success(data.desc);
						ajaxRe(url,box,updata_numb);
					break;
				}
			}else if("login_fail"==data.code){
			login();
			}else
			csc.alert(data.desc);
		},"json");
};

//申请新活动
csc.newActivity=function(id){
	var
		$id= $(id),
		href = $id.attr("href"),
		dataMember = $id.data("member"),
		dataLogin = $id.data("login"),
		dataUrl = $id.data("url"),
		dataId = $id.data("id");
	$id.bind("click",function(event){
		if(dataLogin==1){
			event.preventDefault();
			csc.alert("您当前未登录，请先登录",function(){
				location = "//member.csc86.com/login/phone";
			});
		}else if(dataLogin==''){
			if(dataMember=="NO"){
				event.preventDefault();
				artDialog({
					content:'该活动发布权限仅圈内成员，请先加入圈子！',
					fixed: true,
					ok:function(){
						csc.addCircle(dataId);
					},
					lock:true
			});
			}
		}
	});
}

//选择线下活动
csc.selActX=function(tmp){
	if(tmp==true){
		$(".at-addr-p").addClass("ap-sh");
	}
}
csc.selSctL=function(tmp){
	if(tmp==true){
		$(".at-addr-p").removeClass("ap-sh");
	}
}

//5秒倒计时自动跳转
csc.automatic = function(id,timer,url){ 
	var
		id = $(id),
		$timer = timer,
		url = url;
	if($timer > 0){
		id.html($timer); 
		setTimeout(function(){
			csc.automatic(id,--$timer,url);
		},1000);
	}else{
		window.location.herf = url;
	};
};
	
$(function(){
	$("span.al-title a").each(function(i){
	 	var $tcsVal=$("span.al-title a").eq(i).html().toString().length;
		if($tcsVal>16){
			var toval=$("span.al-title a").eq(i).html().toString().substring(0,14);
			$("span.al-title a").eq(i).html(toval+"...");
		}
	 });
	$(".ai-s-con div.asc-s1").each(function(i){
		var str=$(".ai-s-con div.asc-s1").eq(i).html();
		//str= str.replace(/<\/?[^>]*>/g,''); 
		//str=str.replace(/[ | ]*n/g,'');
		//str=str.replace(/\s/ig,'');
		//str=str.replace(/\&bsp;/ig,'');
		var stleng=str.toString().length;
		if(stleng>80){
			var toval=str.substring(0,80);
			$(".ai-s-con div.asc-s1").eq(i).html(toval+"...");
		}else{
			$(".ai-s-con div.asc-s1").eq(i).html(str);
		}
	});
	
	$A_ImgOpen();//查看的原图
});
	
$(function(){
	//管理显示与隐藏
	$("#tr-mb-content").delegate(".ai-mange","mouseover",function () {
		$(this).children(".am-ul").addClass("show-at").prev(".am-pa").children("a").addClass("hove");
	  }).delegate(".ai-mange","mouseout",function () {
		$(this).children(".am-ul").removeClass("show-at").prev(".am-pa").children("a").removeClass("hove");
	  });
	if(typeof(KindEditor)!="undefined"){
		KindEditor.each({
			'plug-align' : {
				name : '对齐方式',
				method : {
					'justifyleft' : '左对齐',
					'justifycenter' : '居中对齐',
					'justifyright' : '右对齐'
				}
			},
			'plug-indent' : {
				name : '缩进',
				method : {
					'indent' : '向右缩进',
					'outdent' : '向左缩进'
				}
			}
		}, function (pluginName, pluginData) {
			var lang = {};
			lang[pluginName] = pluginData.name;
			KindEditor.lang(lang);
			KindEditor.plugin(pluginName, function (K) {
				var self = this;
				self.clickToolbar(pluginName, function () {
					var menu = self.createMenu({
							name : pluginName,
							width : pluginData.width || 100
						});
					KindEditor.each(pluginData.method, function (i, v) {
						menu.addItem({
							title : v,
							checked : false,
							iconClass : pluginName + '-' + i,
							click : function () {
								self.exec(i).hideMenu();
							}
						});
					});
				});
			});
			KindEditor.options.cssData='body {font-size: 14px;}';
			KindEditor.options.fontSizeTable = ['12px', '14px', '16px', '18px', '24px', '32px'];
			KindEditor.options.filterLink = true;
			KindEditor.options.untarget = true;
			KindEditor.plugin('multiimage', function (K) {
				var self = this,name = 'multiimage';
				self.clickToolbar(name, function () {
					up10img();
				})
			})
		});
		var $EditouM1 = $EditouM-0 ? true : false;
		Kmsg_text = KindEditor.create("#activityDescription", {
			themeType : 'qq',
			//items : ['bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-indent','link'],
			items : $EditouM1 ? ['bold','italic','fontsize','forecolor','hilitecolor','plug-align','plug-indent','table','link','unlink','emoticons','multiimage'] : ['bold','italic','fontsize','forecolor','plug-align','link','unlink','emoticons','multiimage'],
			afterChange : function(){
				this.sync();
				var msg_txt = $("#activityDescription").parent().find(".pct_po");
				msg_txt.text(this.count('text') + "/2000");
				if(this.count('text')<=2000){
					msg_txt.removeAttr("style");
				}else{
					msg_txt.attr("style","color:#F00;");
				}
			}
		});
	}
	
	//活动预览
	$(".pb_btn .pb_b").bind("click",function(){
		var
		$t = $(this),
		$con = $(".tr-mb-content-preview"),
		$con2 = $(".tr-mb-con"),
		activityTitle = $("#activityTitle").val(),
		off_on_line = ($("input[value='OFFLINE']").is(":checked"))?'[线下活动]':'[线上活动]',
		range = ($("input[value='ALL']").is(":checked"))?'所有成员':'圈内成员',
		time = $("#startTime").val()+" "+$("select[name=startTime]").val()+ ' 至 ' + $("#endTime").val()+" "+$("select[name=endTime]").val(),
		picSrc = $("span.pl_img img").attr("src"),
		areaStr = '';
		editorTxt = $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() ;
		$.each($("#ac-area select"),function(){
			var
				$t = $(this);
			if($t.find(":selected").val()===''){
				areaStr += ' ';
			}else{
				areaStr += ' ' + $t.find(":selected").text();
			}
		});
		area = areaStr+$("#address").val();
		if($con.is(":hidden")){
			var 
			$ti = $("#activityTitle"),
			$st = $("#startTime"),
			$et = $("#endTime"),
			$p = $("#province"),
			$a = $("#city"),
			$c=$("#circleLogoUrl"),
			err ='',
			editorTxt = $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() ;
			var $stm=$.trim($st.val())+" "+$("select[name=startTime]").val()+":00",
				  $ete=$.trim($et.val())+" "+$("select[name=endTime]").val()+":00";
			var d1=Date.parse($stm.replace(/-/g,"/")),
				  d2=Date.parse($ete.replace(/-/g,"/"));
			var efl=$.trim($(".pct_po").html()).split("/");
			var sels=$("input[name=activityType]:checked");
			var self=$("input[name=activityCrow]:checked");
			if(editorTxt===""||editorTxt==="<br>"){
				err = "活动描述不能为空";
			}
			if(efl[0]>2000){
				err = "活动描述不能超出2000字";
			};
			if($.trim($c.val())==""){
				err = "请上传活动图片";
			}
			if(sels.length==1){
				if(sels.attr("value")=="OFFLINE"){
					if($.trim($p.find(":selected").val())===""){
					err = "请选择活动地点所在省";
					}else if($.trim($a.val())===""){
						err = "请填写活动地点所在市";
					}
				}
			}
			if(d1>=d2){
				err = "结束时间要大于开始时间，请重新选择";
				$et.next("a").trigger("click");
			}
			if($.trim($et.val())===""){
				err = "请填写活动结束时间";
				$et.next("a").trigger("click");
			}
			if($.trim($st.val())===""){
				err = "请填写活动开始时间";
				$st.next("a").trigger("click");
			}
			if(self.length<=0){
				err = "请选择参与范围";
			}
			if(sels.length<=0){
				err = "请选择活动类型";
			}
			if($.trim($ti.val())===""){
				err = "活动标题不能为空";
			}
			if(err!==""){
				csc.useDialog(function (){
					csc.alert(err);					
				});
				//$("#ac-err").html(err).show();
				return false;
			}
			$t.val("返回");
			if(activityTitle.length>18){
				var ayt=activityTitle.toString().substring(0,16);
				$con.find("ul.ai-l li").eq(0).find(".al-title").html('<a href="javascript:" title="'+activityTitle+'">'+ayt+'...</a>');
			}else{
				$con.find("ul.ai-l li").eq(0).find(".al-title").html('<a href="javascript:" title="'+activityTitle+'">'+activityTitle+'</a>');
			}
			$con.find("ul.ai-l li").eq(0).find("span.a1-1").html(off_on_line);
			$con.find("ul.ai-l li").eq(2).html("参与范围："+range);
			$con.find("ul.ai-l li").eq(3).html("活动时间："+time);
			if(off_on_line=="[线上活动]"){
				$con.find("ul.ai-l li").eq(4).html("");
			}else{
				$con.find("ul.ai-l li").eq(4).html('<span title="'+area+'">活动地点：'+area+'</span>');
			}
			$(".det-infe pre").html(editorTxt);
			$(".at-img img").attr("src",picSrc);
			$con.show();$con2.hide();
		}else{
			$t.val("预览");
			$con.hide();$con2.show();
		}
	});
	
	//活动进行中、重复发布提示
	//$("#activiForm").submit(function(){
//		$.post("/activity/doActivity?t=check",{},function(data){
//			if(!data.msg){
//				csc.tip(data.msg);
//				return false;
//			}
//		});
//	});
		//回复隐藏
	$("div.dc-btn a").live("click",function(){
		var $th=$(this);
		if($th.is(".db-ry-n")){
			$(".dk-con").find(".dc-con").removeClass("mb-show");
			$(".dc-btn").find(".db-bg-h").removeClass("drw-s");
			$(".dc-btn").find(".db-ry-n").removeClass("drw-h");
			$th.parent(".dc-btn").find(".db-bg-h").addClass("drw-s");
			$th.parent(".dc-btn").find(".db-ry-n").addClass("drw-h");
			$th.closest(".dk-con").find(".dc-con").addClass("mb-show");
		}else{
			$th.closest(".dk-con").find(".dc-con").removeClass("mb-show");
			$th.parent(".dc-btn").find(".db-bg-h").removeClass("drw-s");
			$th.parent(".dc-btn").find(".db-ry-n").removeClass("drw-h");
		}		   
	});
	
	//文本编辑，字数统计
	
});



var anc=false;
//对活动进行评论
csc.newActivityComment=function(aid,tmp){
	var le=$("#activityCOmmentForm textarea").val().length;
	var obj=$(tmp),Reing_B = obj.attr("Reing") || "0";
	if(le<=0){
		csc.tip("请输入评论内容！",2);
		return false;
	}else if(le>1000){
		csc.tip("评论内容在1000字之内！",2);
		return false;
	}else{
		if(Reing_B == 0){
			obj.css("color","#DDD").attr("Reing","1");
			var url="/activity/doComment?t=add&"+$("#activityCOmmentForm").serialize()+"&activityId="+aid;
			$.post(url,function(data){
				var status=data.success,
					msg=data.msg;
				if(status==='true'){
					csc.success("评论成功！");
					ajaxRe("/activity/commentList?activityId="+aid,"det-ask",function(){
							obj.css("color","#FFF").attr("Reing","0");
							updata_numb();
					});	
				}else{
					if(msg==='sns_disable_word'){
						var wjcTxt;
						for(var key in data.data){ wjcTxt = data.data[key]; }
						artDialog({
							id:'errorTip',
							title:false,
							content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2><p><strong>评论</strong>&nbsp;中的<span style="color:#f00;">"'+wjcTxt+'"</span>,属于违禁词或敏感词,请修改!</p>',
							fixed: true,
							lock:true,
							width:380,
							opacity:0,
							icon:'mem-n',
							ok:function(){$("textarea[name='content']").focus();}//默认第一个设置焦点
						});
						obj.css("color","#FFF").attr("Reing","0");
					}
					else if(msg==='login_fail'){
						login();
					}
					else{
						csc.tip("操作失败！",2);
						obj.css("color","#FFF").attr("Reing","0");
					}
				}
			},"json");
		}
	}
}
//对评论进行回复
csc.replyActivityComment=function(topicId,tmp){
	var obj=$(tmp),Reing_B = obj.attr("Reing") || "0";
	var le=obj.parent(".dc-sub").prev(".replay-to").val().length;
	if(le<=0){
		csc.tip("请输入回复内容！",2);
		return false;
	}else if(le>500){
		csc.tip("回复内容在500字之内！",2);
		return false;
	}else{
		if(Reing_B == 0){
			obj.css("color","#DDD").attr("Reing","1");
			var url="/activity/doReply?t=add&"+$("#"+topicId+"ReplyForm").serialize()+"&topicId="+topicId;	
			$.post(url,function(data){
				var status=data.success,
					msg=data.msg;
				if(status==='true'){
					csc.success("回复成功！");
					ajaxRe("/activity/replyList?topicId="+topicId,topicId+"_APBox",function(){
						obj.css("color","#FFF").attr("Reing","0");
					});
				}else{
					if(msg==='sns_disable_word'){
						var wjcTxt;
						for(var key in data.data){ wjcTxt = data.data[key]; }
						artDialog({
							id:'errorTip',
							title:false,
							content:'<h2 style="font-size:16px;">对不起，您回复的内容不规范！</h2><p>回复内容中的<span style="color:#f00;">“'+wjcTxt+'”</span>，属于违禁词或敏感词，请修改！</p>',
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
					else if(msg==='sns_fail_id'){
						csc.tip("登录会员ID为空！",2);
					}
					else if(msg==='sns_nonexistence_id'){
						csc.tip("话题ID不存在！",2);
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
			},"json");
			
		}
	}
}

//技术部-杨小华  18:28:26
//删除活动
csc.delActivity=function (activityId,type,urlD){
	csc.confirm("是否删除活动?",function (){
		$.get("/activity/doActivity?t=delete&activityId="+activityId,function(data){
			if("sns_deleteActivity_000"==data.code){	
					csc.success(data.desc);
					switch(type){
						case "list":
							url="/activity/activityList?circleId="+$("#activityCircleId").val()+"&catId="+$("#activityListUrlType").val();	
							ajaxRe(url,"activityBox",updata_numb);
						break;
						case "detail":
							var strHref =window.location.href;
							var intPos = strHref.indexOf("/");
							if(intPos>-1){
								var arrTmp = strHref.split("/");
								strHref = arrTmp[0]+urlD;
							}
							 window.document.location.href=strHref;
						break;
					}
			}else if("login_fail"==data.code){
				login();
			}else
			csc.alert(data.desc);
		},"json");
	});
};
//停止活动
csc.stopActivity=function (activityId,type,urlD){
	csc.confirm("是否停止活动?",function (){
		$.get("/activity/doActivity?t=stop&activityId="+activityId,function(data){
			if("sns_stopActivity_000"==data.code){
					csc.success(data.desc);
					switch(type){
						case "list":
							url="/activity/activityList?circleId="+$("#activityCircleId").val()+"&catId="+$("#activityListUrlType").val();	
							ajaxRe(url,"activityBox",updata_numb);
						break;
						case "detail":
							var strHref =window.location.href;
							var intPos = strHref.indexOf("/");
							if(intPos>-1){
								var arrTmp = strHref.split("/");
								strHref = arrTmp[0]+urlD;
							}
							 window.document.location.href=strHref;
						break;
					}
			}else
			csc.alert(data.desc);
		},"json");
	});
};
//取消置顶
csc.untopActivity=function (activityId){
	csc.confirm("是否取消置顶?",function (){
		$.get("/activity/doActivity?t=untop&activityId="+activityId,function(data){
			if("sns_activityOnTop_000"==data.code){
					csc.success(data.desc);
					url="/activity/activityList?circleId="+$("#activityCircleId").val()+"&catId="+$("#activityListUrlType").val();	
					ajaxRe(url,"activityBox",updata_numb);
			}else if("login_fail"==data.code){
				login();
			}else
			csc.alert(data.desc);
		},"json");	
	});	
};
//退出活动
csc.quitActivity=function (url,activityId,box){
	csc.confirm("是否退出活动?",function (){
		$.get("/activity/doActivity?t=quit&activityId="+activityId,function(data){
			if("sns_quitActivity_000"==data.code){								
				csc.success(data.desc);
				ajaxRe(url,box,updata_numb);
			}else if("login_fail"==data.code){
				login();
			}else{
				csc.alert(data.desc);
			}
		},"json");
	});
};

//活动表单验证
var sb=false;
function a_submit(){
	var 
		$ti = $("#activityTitle"),
		$st = $("#startTime"),
		$et = $("#endTime"),
		$p = $("#province"),
		$a = $("#city"),
		$c=$("#circleLogoUrl"),
		err ='',
		editorTxt = $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() ;
		var $stm=$.trim($st.val())+" "+$("select[name=startTime]").val()+":00",
			  $ete=$.trim($et.val())+" "+$("select[name=endTime]").val()+":00";
		var d1=Date.parse($stm.replace(/-/g,"/")),
			  d2=Date.parse($ete.replace(/-/g,"/"));
		var efl=$.trim($(".pct_po").html()).split("/");
		var sels=$("input[name=activityType]:checked");
		var self=$("input[name=activityCrow]:checked");
		if(editorTxt===""||editorTxt==="<br>"){
			err = "活动描述不能为空";
		}
		if(efl[0]>2000){
			err = "活动描述不能超出2000字";
		};
		if($.trim($c.val())==""){
			err = "请上传活动图片";
		}
		if(sels.length==1){
			if(sels.attr("value")=="OFFLINE"){
				if($.trim($p.find(":selected").val())===""){
				err = "请选择活动地点所在省";
				}else if($.trim($a.val())===""){
					err = "请填写活动地点所在市";
				}
			}
		}
		if($.trim($et.val())===""){
			err = "请填写活动结束时间";
			$et.next("a").trigger("click");
		}
		if($.trim($st.val())===""){
			err = "请填写活动开始时间";
			$st.next("a").trigger("click");
		}
		if(d1>=d2){
			err = "结束时间要大于开始时间，请重新选择";
			$et.next("a").trigger("click");
		}
		if(self.length<=0){
			err = "请选择参与范围";
		}
		if(sels.length<=0){
			err = "请选择活动类型";
		}
		if($.trim($ti.val())===""){
			err = "活动标题不能为空";
		}
		if(err!==""){
			csc.useDialog(function (){
				csc.alert(err);					
			});
			//$("#ac-err").html(err).show();
			return false;
		}
	if(!sb){
		sb=true;
		return true;
	}else{
		return false;
	}
}

//查看原图事件绑定
function $A_ImgOpen(){
	$("a.at-img img").on("error",function(){
		$(this).attr("hs_on",1);
	})
	highslide_info(function(){
		hs.graphicsDir = csc.url("res","/js/p/highslide/graphics/");
		hs.align = 'center';
		hs.showCredits = false;
		hs.outlineType = 'rounded-white';
		hs.wrapperClassName = 'draggable-header';
		hs.captionEval = false;
		hs.dimmingOpacity = 0.1;
		hs.lang["restoreTitle"] = "点击还原,支持鼠标拖动.";
		
		$("#activityBox").on("click","a.at-img",function(a){
			$(this).attr("hs_on") || hs.expand(this);
			return false
		})
		$("#tr-mb-content").on("click","a.at-img",function(a){
			$(this).attr("hs_on") || hs.expand(this);
			return false
		})
	})
}
function highslide_info(fun){
	if(typeof(hs) === "undefined"){
		seajs.use(csc.url("res","/js/p/highslide/highslide-full.js"),function(){
			seajs.use(csc.url("res","/js/p/highslide/highslide.css"),fun)
		})
	}else{
		fun();
	}
}

function up10img() {
	csc.useDialog(function(){
	artDialog({
			title:'上传图片',
			cancelVal:'取消',
			cancel: true,
			content: "<iframe src='//quan.csc86.com/picupload.html' style='width:530px; height:330px;' id='editTopicImg' frameborder='0' scrolling='no'></iframe>",
			okVal: '插入图片',
			padding:"0 10px",
			ok:function(){
				var iul=$("#upMsg",$("#editTopicImg").contents()),
					imgLg=$("#upMsg",$("#editTopicImg").contents()).children("li").html(),
					img=[],
					$lg=$("#upMsg",$("#editTopicImg").contents()).children("li").length;
				if($lg<=0){
					csc.useDialog(function(){csc.alert("未有图片，请选择图片！");});
					return false;
				}else if(imgLg.indexOf("图片上传中")>0){
					csc.useDialog(function(){csc.alert("图片正在上传，请稍等！");});
					return false;
				}else if($lg>10){
					csc.useDialog(function(){csc.alert("最多10张图片！");});
					return false;
				}else{
					if($lg>0){
						for(var i=0;i<$lg;i++){
							if($("#upMsg",$("#editTopicImg").contents()).children("li").eq(i).html().indexOf("上传失败")>0){
								
							}else{
								img.push("<img alt='' src='"+imgUrl+$("#upMsg",$("#editTopicImg").contents()).children("li").eq(i).children("a").attr("data-img")+"' />");
							}
							
						}
						//alert(img.join(''));return;
						var imgall=img.join('');
						Kmsg_text.insertHtml(imgall);
					}
				}
			},
			fixed: true,
			background:"#000",
			opacity:"0.3",
			lock:true
		});	
	});	
}