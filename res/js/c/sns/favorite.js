$(function(){
	if($('link[href*="sns/visiting-card.css"]').length < 1){//加载名片样式
		seajs.use(csc.url('res','/f=css/c/sns/visiting-card.css'));
	}
	$('div.fa-card').delegate('ul.sh-pr li', 'mouseenter', function(event) {
		var
				$th=$(this),
				i = $th.index()%2.5;
		if(i != parseInt(i)){
			$th.find("div.pr-card:not(.ad-por-px)").addClass("ad-por-px");
		}
		$th.find(".fp-br,.fp-group").addClass("fb-show");
		$th.parent(".mor-sig").css("z-index","1")
		$("#groupBox").addClass("fa-c-findex");

		var $card = $th.find(".pr-card"),
			box=$card.attr("id"),
			ta=box.split("_");
		if(!$card.is('.g-snscard')){
			showPersonalCard(ta[0],box);
		}
		$card.addClass("pr-show g-snscard").css('z-index','2');
	}).delegate('li', 'mouseleave',function(){
		var $t = $(this);
		$t.find(".fb-show").removeClass("fb-show");
		$t.find(".pr-card").removeClass("pr-show");
		$t.parent(".mor-sig").removeAttr("style");
		$("#groupBox").removeClass("fa-c-findex");
		$t.removeAttr('style');
	});
		
	//分组
	$("div.fp-group .fg1").live("click",function(){
		$(this).closest(".fa-card").children(".fa-art-ly").addClass("fb-show");	
		$("#_groupNameForm").removeClass("fb-show");
		$("#_groupName").val("");
		$("#TfavorId").attr("value",$(this).closest("li").data("id"));
	})
	
	//收藏
	$("div.fp-group .fg3").live("click",function(){
		var $id=$(this).closest("li").data("id");
		scCard(0,$id);
	});
	//清空临时文件
	$(".fa-title .ft2").live("click",function(){
		csc.useDialog(function (){
			csc.confirm("确定清空临时名片夹吗？",function (){
				emptyTempCards();
			});
		});	
	});
	
	//创建弹出层操作
	$(".rb-add").live("click",function(){
			$(".ral-ra").addClass("fb-show");
	});
	$("#_groupNameForm .rl2").live("click",function(){	
		if(!$.trim($("#_groupName").val())){csc.alert("分组名不能为空,请输入分组名");return;}
		addCardType1();
	});
	//给名片分组
	$(".fa-art-ly .ral-btn .b1").live("click",function(){
		var $leng=$(".fal-d input:checked").length;
		if($leng<=0){
			csc.useDialog(function (){csc.alert("请选择一个分组！");});
		}else{
			goType();
		}
	});
	
	$("div.fa-art-ly .fal-close,div.fa-art-ly .b2").live("click",function(){
		$(this).closest(".fa-card").children(".fa-art-ly").removeClass("fb-show");
	});
	//修改分组
	$("ul.fa-c-f li.cur .fa-rev .i1").live("click",function(){
		$(this).parent(".fa-rev").removeClass("f-s");
		$("ul.fa-c-f li.cur .fa-ra-m .fa-n").removeClass("f-h");
		$("ul.fa-c-f li.cur .del-re").removeClass("f-h").addClass("f-s");
		var $var=$(this).prev().attr("value");
		var $id=$(this).closest("li").data("id");
		EditCardType(0,$id);	
	});
	$(".fa-c-f li .fa-n").live("click",function(){
		$(".fa-c-f li").removeClass("cur");
		$(this).closest("li").addClass("cur");
	});
	//分组切换
	$(".fa-c-f li .fa-n").live("click",function(){
		$(".add-ca").removeClass("fads-h");
		$(".fa-ad-h").removeClass("fa-ad-s");
		$("ul.fa-c-f li.cur .fa-rev").removeClass("f-s");
		$("ul.fa-c-f li.cur .fa-ra-m .fa-n").removeClass("f-h");
		$("ul.fa-c-f li.cur .del-re").removeClass("f-h").addClass("f-s");	
		var $id=$(this).closest("li").data("id");
		$("#TcurGroupId").val($(this).closest("li").data("id"));
		reloadCordList();
	});
	//删除分组
	$("ul.fa-c-f li.cur .fa-del").live("click",function(){
		var $id=$(this).closest("li").data("id");
		csc.useDialog(function (){
		csc.confirm("确定删除该分组吗？",function (){
			delType(0,$id);
		});	});	
	});
	
	$(".del-re").live("mouseover",
	  function () {
		$(this).children(".fa-mp").addClass("f-s");
	  });
	$(".del-re").live("mouseout",
	  function () {
		$(this).children(".fa-mp").removeClass("f-s");
	  });
	//修改分组名样式显示
	$("ul.fa-c-f li.cur a.d").live("click",function(){
		$("ul.fa-c-f li.cur .fa-ra-m .del-re").addClass("f-h");
		$("ul.fa-c-f li.cur .fa-n").addClass("f-h");
		$("ul.fa-c-f li.cur .fa-rev").addClass("f-s");
	});
	$(".add-ca").live("click",function(){
		$(this).prev().addClass("fa-ad-s");	
		$(this).addClass("fads-h");
		$("#gName").val("");
	});
	//创建分组
	$("#carAdd").live("click",function(){
		var inVal=document.getElementById("gName").value;
		csc.useDialog(function (){
			if(inVal==""||inVal==null){
				csc.alert("请输入分组名！")
			}else{
				addCardType();
			}
		});
	});
	$("#carPo").live("click",function(){
		$(".fa-ad-h").removeClass("fa-ad-s");	
		$(".add-ca").removeClass("fads-h");	
	});

});

//丢掉
function delTempCard(tmp,id){
	csc.useDialog(function (){
		csc.confirm("确定丢掉此张名片吗？",function (){
			switch(tmp){
				case "t":
					delTempCard_t(0,id)
					break;
				case "c":
					delTempCard_c(0,id);
					break;
				default:
					break;
			}
		});
	});	
}

/**登陆超时问题解决(2013年6月28日why)**/
var $Card_temp$ = {noLogin : "LOGIN_FAIL"};

//创建分组
function addCardType(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doGroup?t=add&"+$("form#groupNameAddFrom").serialize(),function(data){
		var $val=$.trim(data);
		if($val == $Card_temp$.noLogin){
			$_open_login(encodeURIComponent("addCardType(1);eval"));
		}else if($val=="sns_newGroup_000"){
			csc.success("创建成功！");
			$(".fa-ad-h").removeClass("fa-ad-s");
			$(".add-ca").removeClass("fads-h");	
			reloadCordType();
			reloadgroupTplBox();
			$.get("/sns/card/groupTpl",function(data){$("#groupTplBox").html(data);},"html");	
		}else{csc.alert("创建失败,请重试！")}
	},"html");
}

//创建分组_弹出框中
function addCardType1(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doGroup?t=_add&"+$("#_groupNameForm").serialize(),function(data){
		var $val=data.replace(/\s/g,'');
		csc.useDialog(function (){
			if($.trim(data) == $Card_temp$.noLogin){
				$_open_login(encodeURIComponent("addCardType(1);eval"))
			}else if($val=="sns_newGroup_000"){
				csc.success("创建成功！");
				reloadCordType();
				reloadgroupTplBox();	
				$(".ral-ra").removeClass("fb-show");
			}else{csc.alert("创建失败！")}		
		});
	},"html");
}

//修改分组
function EditCardType(login,id){
	var $id = id || $Card_temp$.t_cardid;
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doGroup?t=e&groupId="+$id+"&"+$("#"+$id+"gNameForm").serialize(),function(data){
		csc.useDialog(function (){
			var $val=$.trim(data);
			if($val == $Card_temp$.noLogin){
				$Card_temp$.t_cardid = $id;
				$_open_login(encodeURIComponent("EditCardType(1);eval"));
			}else if($val=="sns_modifyGroup_000"){
				csc.success("修改成功！");					
				reloadCordType();
				reloadgroupTplBox();
				$(".fa-ad-h").removeClass("fa-ad-s");
			}else{csc.alert("修改失败！")}
		});
	},"html");
}

//删除分组
function delType(login,id){
	var $id = id || $Card_temp$.d_typeid;
	$.get("/sns/card/doGroup?t=d",{"groupList":$id},function(data){
		var $val=$.trim(data);
			if($val == $Card_temp$.noLogin){
				$Card_temp$.d_typeid = $id;
				$_open_login(encodeURIComponent("delType(1);eval"))
			}else if($val=="sns_deleteGroup_000"){
				csc.success("删除成功！");
					$("#TcurGroupId").val("0-0");
					reloadCordType();
					reloadCordList();
					reloadgroupTplBox();
			}else{csc.alert("删除失败！")}					
	},"html");
}

//移动分组
function goType(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doCard?t=mv&"+$("#favorForm").serialize(),function(data){
		var $val=data.replace(/\s/g,'');
		csc.useDialog(function (){
			if($val == $Card_temp$.noLogin){
				$_open_login(encodeURIComponent("goType(1);eval"));
			}else if($val == "sns_groupFavorCards_000")	{
				csc.success("分组成功！");
				reloadCordType();
				reloadCordList();
				$("div.fa-art-ly").removeClass("fb-show");
			}else{csc.alert("分组失败！")}		
		});
	},"html");
}

//丢掉卡片_t
function delTempCard_t(login,id){
	var $id = id || $Card_temp$.d_id;
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doTempCard?t=del&fuid="+$id,function(data){
		var $val=$.trim(data);
		csc.useDialog(function (){
			if($val == $Card_temp$.noLogin){
				$Card_temp$.d_id = $id;
				$_open_login(encodeURIComponent("delTempCard_t(1);eval"));
			}else if($val=="sns_deleteTempCards_000"){
				csc.success("丢掉成功！");
				reloadTempCords();
			}else{csc.alert("丢掉失败！")}		
		});								
	},"html");
}

//丢掉卡片_c
function delTempCard_c(login,id){
	var $id = id || $Card_temp$.d_id;
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doCard?t=del&favId="+$id+"&groupId="+$("#TcurGroupId").val(),function(data){
		var $val=$.trim(data);
		csc.useDialog(function (){
			if($val == $Card_temp$.noLogin){
				$Card_temp$.d_id = $id;
				$_open_login(encodeURIComponent("delTempCard_c(1);eval"));
			}else if($val=="sns_deleteFavorCards_000"){
				csc.success("丢掉成功！");
				reloadCordList();
				reloadCordType();
			}else{csc.alert("丢掉失败！")}		
		});								
	},"html");
}

//收藏卡片
function scCard(login,id){
	var $id = id || $Card_temp$.t_cardid;
	if(login){csc.signDialogClose();}
	$.get(" /sns/card/doTempCard?t=rec&fuid="+$id,function(data){
		var $val=$.trim(data);
		csc.useDialog(function (){
			if($val == $Card_temp$.noLogin){
				$Card_temp$.t_cardid = $id;
				$_open_login(encodeURIComponent("scCard(1);eval"))
			}else if($val=="sns_cardchangeResponse_000"){
				csc.success("收藏成功！");
				reloadCordType();
				("0-0" == $("#TcurGroupId").val() || $("#TcurGroupId").val()=="" )&& reloadCordList();
				reloadTempCords();
			}else{csc.alert("收藏失败！")}
		});
	},"html");
}

//清空零时名片夹
function emptyTempCards(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/doTempCard?t=cln",function(data){
		if($.trim(data) == $Card_temp$.noLogin){
			$_open_login(encodeURIComponent("emptyTempCards(1);eval"))
		}else if($.trim(data) == "sns_emptyTempCards_000"){
			csc.success("操作成功！");
			reloadTempCords();
		}else{
			csc.alert("操作失败！")
		}
	},"html");
}

//刷新零时名片
function reloadTempCords(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/tempCard",function(data){
		if($.trim(data) == $Card_temp$.noLogin){
			$_open_login(encodeURIComponent("reloadTempCords(1);eval"))
		}else{
			$("#tempCardBox").html(data);
		}
	},"html");
}

//刷新分类列表
function reloadCordType(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/group?groupId="+$("#TcurGroupId").val(),function(data){
		if($.trim(data) == $Card_temp$.noLogin){
			$_open_login(encodeURIComponent("reloadCordType(1);eval"))
		}else{
			$("#groupBox").html(data);
		}
	},"html");
}

//刷新名片框
function reloadCordList(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/cardList?groupId="+$("#TcurGroupId").val(),function(data){
		if($.trim(data) == $Card_temp$.noLogin){
			$_open_login(encodeURIComponent("reloadCordList(1);eval"))
		}else{
			$("#cardListBox").html(data);
		}
	},"html");
}

//刷新移至分组弹出框
function reloadgroupTplBox(login){
	if(login){csc.signDialogClose();}
	$.get("/sns/card/groupTpl",function(data){
		if($.trim(data) == $Card_temp$.noLogin){
			$_open_login(encodeURIComponent("reloadgroupTplBox(1);eval"))
		}else{
			$("#groupTplBox").html(data);
		}
	},"html");
}

//打开登框
function $_open_login(comm){
	csc.useDialog(function(){
		seajs.use(csc.url("res","/f=js/m/sign"),function(){
			csc.checkSign(comm);
		});
	});
}