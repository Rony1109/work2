$(function() {
    //seajs.use(csc.url("res", "/f=js/p/artDialog/4.1.5/skins/blue.css"));
	$("dl.h-f-top6 dd:lt(4)>div,dl.h-f-inst dd:lt(4)>div").children(".pr-card").addClass("ad-pol-px");
    $("dl.h-f-top6 dd:gt(3)>div,dl.h-f-inst dd:gt(3)>div").children(".pr-card").addClass("ad-por-px");
    csc.useDialog(function() {
	$("#interstBox>dd.g-c-f").live("mouseenter",function(event){
		var $th=$(this);
		//$("dl.h-f-top6 dd:lt(4)>div,dl.h-f-inst dd:lt(4)>div").children(".pr-card").addClass("ad-pol-px");
        //$("dl.h-f-top6 dd:gt(3)>div,dl.h-f-inst dd:gt(3)>div").children(".pr-card").addClass("ad-por-px");
		//$(this).children("div.pr-card").addClass("pr-show");
         var box = $(this).children("div.pr-card").attr("id");
         var ta = box.split("_");
		  if(($("#SNSCardDIV").is(":hidden"))){
		 if(!($th.children(".pr-card").children().is(".ly-a-l"))){
			showPersonalCard(ta[0],box);
		 }
		}
	}).live("mouseleave",function(){
		 $(this).children("div.pr-card").removeClass("pr-show");
	});
		
		

        function okFun() {
            $("#n-tips").hide();
            $.post("/sns/home/closeNotice.html", function() {
                if (!data.status) {
                    csc.alert(data.msg);
                }
            }, "jsonp");
        };
        function cancelfriend() {

        };
        function relfirend($id, $name) {
            var msg = '<div><textarea id="msg" name="" cols="60" rows="">请手动填写申请理由...</textarea></div><p class="tips"><strong>提示</strong>若不需要填写申请理由，请直接点击“确定”。</p>';
            artDialog({id: "addfriend1",content: msg,fixed: true,title: "发送好友请求",width: 380,padding: "10px 19px 10px 15px",init: function() {
                    $("#msg").live("focus", function() {
                        var $val = $(this).val(), defaultValue = $("#msg")[0].defaultValue;
                        if ($val === defaultValue) {
                            $(this).val("");
                        }
                    });
                },ok: function() {
                    var defaultValue = $("#msg")[0].defaultValue, $msg = $.trim($("#msg").val());
                    if ($msg === defaultValue) {
                        $msg = "";
                    }
                    $.get(csc.url("member","/sns/home/addFriend.html"), {"id": $id,"message": $msg,"relname": $name , "ajax":true}, function(data) {
                      	   if("2"==data.status){
							csc.alert(data.msg);					 		
						 }else   if (data.status) {
                            csc.success(data.msg, 2);
                           // setTimeout(function() {
                            //    location.reload();
                           // }, 2000);
                        } else {
                            csc.alert(data.msg);
                        }
                    }, "jsonp");
                },cancel: cancelfriend,lock: true});
        }
		
		/*
       csc.addfriend = function($id) {
		  // seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				//csc.checkSign("toAddFriend($id)");
				//toAddFriend();  todo
			//});
		  //要加处理登录页判断
		   var $name="", sname ='<div class="g-f-msg-box"><input type="text" class="txt" id="uname" value=""/><p class="tps" style="margin-top:6px;"><strong>提示</strong>请输入您的姓名</p></div>';
			$.get(csc.url("member","/public/personal/username"),function(data){
				$name=$.trim(data.username);
				if($name=="NotLogin"){
					csc.useDialog(function (){
						csc.alert("您还没有登录，请先登录！");				
					});
				}else if (!$name) {
					artDialog({id: "addfriend0",content: sname,fixed: true,title: "请输入您的姓名",width: 280,padding: "10px 19px 10px 15px",init: function() {
							$("#uname").live("focus", function() {
								var $val = $(this).val(), defaultValue = $("#uname")[0].defaultValue;
								if (!$val || $val === defaultValue) {
									$(this).val("");
									$("#tps").hide();
								}
							});
						},ok: function() {
							var defaultValue = $("#uname")[0].defaultValue, $name = $.trim($("#uname").val());
							if (!$name || $name === defaultValue) {
								$("#uname").focus();
								$("#tps").show();
								return false;
							}
							relfirend($id, $name);
						},cancel: cancelfriend,lock: true});
				} else{
					relfirend($id);
				}
			},"jsonp");
        };*/
		
		
        $("#close-tips").live("click",function() {
            var msg = '<div>关闭企业会员升级流程引导，以后将不再置顶提示，您确定要关闭？</div>';
            csc.confirm(msg, okFun, cancelfriend, "是否确定关闭提示？");
        });
        $("#addfriendproup").live("click",function() {
            var $val = $(this).attr("id"), msg = '<div class="conn" style="text-align: center;">请填写分组名称(不超过6个字)</div><br /><div class="conn" style="text-align: center;"><input id="Ngroup" name="" class="group" type="text" maxLength="6" /></div><div class="g-f-msg-box"><p id="w-error" class="g-f-error">分组名不能为空</p></div>';
            artDialog({id: "addfriend",content: msg,fixed: true,title: "添加好友分组",width: 280,padding: "25px 19px 25px 15px",ok: function() {
                    var $val = $.trim($("#Ngroup").val());
                    if (!$val) {
                        $("#w-error").show();
                        return false;
                    }
                    $.post("/sns/home/addGroup.html", {"groupName": $val}, function(data) {
                        if (data.status) {
                            location.reload();
                        } else {
                            csc.alert(data.msg);
                        }
                    }, "jsonp");
                },cancel: cancelfriend,lock: true});
        });
        $("#flit-group>span>i").live("click", function() {
            var msg = '<div class="conn"><strong>提示：</strong>删除该分组，该分组内好友将保存到“未分组好友“中。</div>', $this = $(this).parent(), $val = $.trim($this.text());
            csc.confirm(msg, function() {
                var l = $this.parent().children().length;
                if (!l) {
                    $this.parent().append("<em>未设置分组</em>");
                }
                $.post("/sns/home/deleteGroup.html", {"id": $this.attr("id"),"groupName": $val}, function(data) {
                    if (data.status) {
                        location.href = "//member.csc86.com/sns/home/friends";
                    } else {
                        csc.alert(data.msg);
                    }
                }, "jsonp");
            }, cancelfriend, "是否确定删除该好友分组？");
        });
        $("#list-friend select").change(function() {
            var $this = $(this), $groupId = $this.val(), $id = $this.parents("li").find("a.img").attr("id");
            $.post("/sns/home/moveGroup.html", {"id": $id,"groupId": $groupId}, function(data) {
                if (data.status) {
                    location.href = "/sns/home/friends.html?groupId=" + $groupId;
                } else {
                    csc.alert(data.msg);
                }
            }, "jsonp");
        });
        $("#dynamic .accept").live("click",function() {
			var $name=''; $this = $(this), msg = '<div class="g-f-msg-box"><p id="w-error" class="g-f-error">不能发送空的信息</p></div><div class="conn"><strong>提示：</strong>若不需要发送消息请直接点击"确定"即可双方自动成为好友，对方将出现在您的"未分组好友"中。</div>',sname = '<div class="g-f-msg-box"><input type="text" class="txt" id="uname" value=""/><div id="tps" class="g-f-error">请输入您姓名</div><p class="tps"><strong>提示</strong>请输入您的姓名</p></div>';
			$.post("/public/personal/username",function(data){
				$name=$.trim(data);
				if(!$name){
				 artDialog({id: "addfriend0",content: sname,fixed: true,title: "请输入您的姓名",width: 280,padding: "10px 19px 10px 15px",init: function() {
                        $("td.aui_icon").addClass("g-d-n");
                        $("#uname").live("focus", function() {
                            var $val = $(this).val(), defaultValue = $("#uname")[0].defaultValue;
                            if (!$val || $val === defaultValue) {
                                $(this).val("");
                                $("#tps").hide();
                            }
                        });
                    },ok: function() {
                        var defaultValue = $("#uname")[0].defaultValue, $name = $.trim($("#uname").val());
                        if (!$name || $name === defaultValue) {
                            $("#uname").focus();
                            $("#tps").show();
                            return false;
                        }
						artDialog({id: "acceptfriend",content: msg,fixed: true,title: "同意加为好友",width: 380,padding: "25px 19px 25px 15px",ok: function() {
							var $id = $this.parent("li").find("a.SNScard").attr("id"), $messageId = $this.parent("li").find("a.SNScard").attr("messageId");
							$.post("/sns/home/acceptFriend.html", {"id": $id,"messageId": $messageId,"username":$.trim($("#uname").val())}, function(data) {
								if("2"==data.status){
									csc.alert(data.msg);
								}else if (data.status) {
									location.href = "/sns/home/friends";
								} else {
									csc.alert(data.msg);
								}
							}, "jsonp");
						},cancel: cancelfriend,lock: true});
                    },cancel: cancelfriend,lock: true});
			}else{
				artDialog({id: "acceptfriend",content: msg,fixed: true,title: "同意加为好友",width: 380,padding: "25px 19px 25px 15px",ok: function() {
						var $id = $this.parent("li").find("a.SNScard").attr("id"), $messageId = $this.parent("li").find("a.SNScard").attr("messageId");
						$.post("/sns/home/acceptFriend.html", {"id": $id,"messageId": $messageId}, function(data) {
							if (data.status) {
								location.href = "/sns/home/friends";
							} else {
								csc.alert(data.msg);
							}
						}, "jsonp");
					},cancel: cancelfriend,lock: true});
			}
			},"html");
			
        });
        $("#dynamic .reject").live("click",function() {
            var $this = $(this), msg = '<div style="text-align: center;">您确认拒绝&nbsp;'+$this.siblings(".SNScard").html()+'&nbsp;的加好友请求？</div>';
            artDialog({id: "rejectfriend",content: msg,fixed: true,title: "拒绝好友请求",width: 380,padding: "25px 19px 25px 15px",ok: function() {
                    var $id = $this.parent("li").find("a.SNScard").attr("id"), $messageId = $this.parent("li").find("a.SNScard").attr("messageId");
                    $.post("/sns/home/refuseFriend.html", {"id": $id,"isOmit": "","messageId": $messageId}, function(data) {
                        if (data.status) {
                            location.reload();
                        } else {
                            csc.alert(data.msg);
                        }
                    }, "jsonp");
                },cancel: cancelfriend,lock: true});
        });
        $("#upload-btn").live("click",function() {
			$("div.aui_content").html();
            artDialog({id: "uploadinner",padding:"20px 0 10px 10px",content: '<iframe src="/personal/personal/album" style="width:510px;height:137px;overflow:hidden" frameborder="0"></iframe>',fixed: true,title: "<strong>管理个人相册</strong>（限4张相片  单张小于600K）",width:510,height: 137,close: function() {
                   // csc._ajax("show-win", '/personal/personal/flashAlbum');
                },lock: true});
            return false;
        });
        $("#outer-font .previewcard,#outer-input .previewcard,#previewcard").live("click", function() {
			$("div.aui_content").html("");																			
            artDialog({id: "previewcard",content: '<iframe id="iframeId" src="/personal/personal/card?str=previewcard&t=view" style="width:540px;height:202px;" frameborder="0"></iframe>',fixed: true,title: "预览个人名片",width:550,height: 202,lock: true});
            return false;
        });
		/*
		$("#dynamic .first .look").live("click",function(){
				var $id=$(this).siblings("a.info").attr("id");
				artDialog({id: "previewcard",content: $id,fixed: true,title: "预览个人名片",padding: 0,width: 540,init: function() {
                    $("div.aui_content").css({width: 540,height: 255}).html('<iframe src="/personal/personal/card?str=previewcard&t=view&fuid='+$id+'" style="width:100%;height:100%;overflow:visible" frameborder="0"></iframe>');
                },lock: true});
            return false;
		});*/
		
    });
});

function showFriendCard(tmp){
	$("div.aui_content").html("");																			
	artDialog({id: "previewcard",content: '<iframe src="/personal/personal/card?str=previewcard&t=view&fuid='+tmp+'" style="width:540px;height:202px;" frameborder="0"></iframe>',fixed: true,title: "预览个人名片",width:550,height: 202,lock: true});
	return false;
}