/*
* 邀请好友（加入圈，参与活动）
* author: why
* Date: 2013年10月30日
*/
$(function(){
	iframe_bind();
	if(document.location.hash == "#invite"){
		$(".invite_but").click();
	}
});
(function($,win){
	var iframe_src = csc.url("quan","/circle/FriendsList"),//"ifram_invite.html"; //,
		notips_src = csc.url("quan","/circle/Notips");
	var types = {
		"0": ["activityId","邀请加入活动"],
		"1": ["circleId","邀请加入圈子"]
	};
	//打开邀请好友对话框
	function invite(type,id){
		var url = iframe_src + "?" + types[type][0] + "=" + id;
		csc.useDialog(function(){
			art.dialog.open(url, {
				id:"inviteDialog",
				title: types[type][1],
				lock:true,
				resize:false,
				width:720,
				padding:"0",
				init:function(){}
			});
		});
	};
	

	//表单提交
	function inviteSubmit(form){
		var form = $(form);
		if(form.find(".friendlist :checked").length<=0){
			/*csc.useDialog(function(){
				top.csc.alert("请选择要邀请的好友!");
			})*/
			return false;
		};
		csc.useDialog(function(){
			top.artDialog.list['inviteDialog'].hide();
		});
		$.ajax({
			type: form.attr("method"),
			url: form.attr("action"),
			data: form.serialize(),
			dataType: "json",
			success: function(data){
				if(data.result == "sns_success"){
					csc.useDialog(function(){			
						top.csc.success("发送邀请成功!",1.5,function(){
							art.dialog.close();
						})
					})
				}else{
					csc.useDialog(function(){
						top.csc.error("邀请过程出错,请稍候再试!",function(){
							art.dialog.close();
						});
					
					});
				}
			},
			error: function(){
				csc.useDialog(function(){
					top.csc.error("邀请过程出错,请稍候再试!",function(){
						art.dialog.close();
					});
				});
			}
		});
		
		return false;
	};
	//邀请浮动层_"不再提醒"
	function inviteTipsOff(type,id){
		var url = notips_src + "?" + types[type][0] + "=" + id;
		$.get(url,function(data){});
		inviteTipsHide();
	};
	//邀请浮动层_"我知道了"
	function inviteTipsHide(){
		csc.useDialog(function(){
			$(".invite_tips").hide();
		});
	};

	win.csc.inviteSubmit = inviteSubmit;
	win.csc.invite = invite;
	win.csc.inviteTipsOff = inviteTipsOff;
	win.csc.inviteTipsHide = inviteTipsHide;
	//win.csc.invite_quan_msg = invite_quan_msg;
	iframe_bind($,win);
})(jQuery,window)

//选择好友事件绑定;
function iframe_bind(){
	//if(self == top) {return;}
	function inviteClose(){
		csc.useDialog(function(){
			art.dialog.close();	
		});
	};
	
	$(".friendlist li").on("click",function(){
		var c = $(this).find(":checkbox");
		c.trigger("dj");
	}).find(":checkbox").on("dj",function(e,ch){
		var o = $(this),li = o.parent();
		zt = typeof(ch) == "undefined" ? !o.attr("checked") : ch;
		o.attr("checked",zt);
		if(o.attr("checked")){
			li.addClass("s");
		}else{
			li.removeClass("s");	
		}
	}).on("click",function(e){
		var o = $(this);
		setTimeout(function(){o.trigger("dj")},10);
		return false;
	});
	
	$("#allcheck").on("click",function(){
		var lis = $(".friendlist li");
		lis.find(":checkbox").trigger("dj",[!!$(this).attr("checked")]);
	});
	
	$(".but2").on("click",function(){
		inviteClose(1);
	});
};