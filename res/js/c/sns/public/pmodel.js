/** * author:zdq * desc：js公共模板调用js库文件 * date:2012-10-24 */

//显示名片
function showPersonalCard(fuid, box) {
	csc = csc || {};
	csc.snsCard = csc.snsCard || {};
	csc.snsCard.Cache = csc.snsCard.Cache || {};/*为了和 public/cardHead.js缓存路径保持统一 */
	if(csc.snsCard.Cache[fuid]){
		$("#" + box).html(csc.snsCard.Cache[fuid]);
		return;
	}
	$.get(csc.url("quan","/interface/pcard"), {"fuid": fuid},function(data){
		$("#" + box).html(data.code);
		csc.snsCard.Cache[fuid] = data.code;
	},'jsonp');
}

function loading_box(id){
	var options_ = {title:false,cancel:false,drag: false,padding:"0px 25px",esc:false,fixed:true,top:"60%"};
	options_["content"] = "<div class=\"aui_loading\"><span>loading..</span></div>";
	if(id){options_["id"]=id};
	return art.dialog(options_);
}

//分页
function sepPage(url, box ,rtype,callback , loading) {
	ajaxRe.call(this,url,box,1,callback,rtype);
	/*var fun = csc.typeOf(arguments[2]) == "function" ? 
			arguments[2] : csc.typeOf(arguments[3])=="function" ? 
			arguments[3] : function(){}
	,loading = csc.typeOf(arguments[2]) != "function" ? 
			arguments[2] : csc.typeOf(arguments[3])!="function" ? 
			arguments[3] : false 
	, loading_div = false;
	
	if(loading){csc.useDialog(function(){
		loading_div = loading_box();
		$.post(url,function(data){
			if(loading_div){loading_div.close();}
			$("#"+box).html($.trim(data));
			if(fun){fun(data);}
		},"html");	
	})}else{
		$.post(url,function(data){
			if(loading_div){loading_div.close();}
			$("#"+box).html($.trim(data));
			if(fun){fun(data);}
		},"html");
	}

	csc.useDialog(function(){
		var loading_div = loading_box();
		$.post(url, function(data) {
			if(loading_div){loading_div.close();}
			$("#" + box).html($.trim(data));
			if(callback){callback(data,url)}
		});
	})*/
}

function cardChange(fuid, obj) {
	$.get(csc.url("member","/public/personal/card"), {"t": "change","fuid": fuid},function(data){
    	//data = $.trim(data);
		csc.snsCard && csc.snsCard.Cache[fuid] && (csc.snsCard.Cache[fuid] = null);
		csc.useDialog(function(){
			if ("sns_cardchange_000" == data.code) {
				csc.success("交换成功");
				obj.className = "card-received";
				$(obj).html("名片已收");
				$(obj).removeAttr("onclick");
			} else if("sns_cardchange_003"==data.code){
				csc.success("名片已收");
			}else if("login_fail"==data.code){
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}else{
				csc.alert("操作失败,请重试"); 
			}
		});
    },'jsonp');
}

function ajaxRe(url,box,callback,loading,rtype){
	var fun = csc.typeOf(arguments[2]) == "function" ? 
				arguments[2] : csc.typeOf(arguments[3])=="function" ? 
				arguments[3] : function(){}
		,loading = csc.typeOf(arguments[2]) != "function" ? 
				arguments[2] : csc.typeOf(arguments[3])!="function" ? 
				arguments[3] : false 
		, loading_div = false;
	if(loading){csc.useDialog(function(){
		loading_div = loading_box();
		$.post(url,function(data){
			if(loading_div){loading_div.close();}
			if("jsonp"==rtype||"json"==rtype){
				data=data.code;
			}
			$("#"+box).html($.trim(data));
			if(fun){fun(data);}
		},rtype);
	})}else{
		$.post(url,function(data){
			if(loading_div){loading_div.close();}
			if("jsonp"==rtype||"json"==rtype){
				data=data.code;
			}
			$("#"+box).html($.trim(data));
			if(fun){fun(data);}
		},rtype);
		
	}
}

function ajaxLoading(box,url,option){
	var _option = {lag:200,loadtxt:"<p>正在加载数据...</p>"};
	var o = $(box),option = option || {};
	$.extend(_option,option);
	o.html(_option.loadtxt);
	setTimeout(function(){
		o.load(url);
	},_option.lag);
}

function login(command){
	var comm = command || "location.reload";
	csc.useDialog(function(){	
		seajs.use(csc.url("res","/f=js/m/sign"),function(){		
			csc.checkSign(comm);
		});
	});
}

//限制文字数量
var textarea_maxlen = {
  isMax : function (id,tmp){
	var textarea =document.getElementById(id);
	var max_length =tmp;
	if(textarea.value.length > max_length){
	  textarea.value = 
		textarea.value.substring(0, max_length);
	}
  },
  dRMouse : function (){
	document.oncontextmenu = 
	  function (){ return false; }
  },
  eRMouse : function (){
	document.oncontextmenu = null;
  }
};

function linkHS(url,box){
	$("#"+box).toggle();
	ajaxRe(url,box);
}

//限制字符个数
$(function (){
	$(".fp-in .fi-1,.tr-partake li a em,.tr-add-tr li a em").each(function(){
		var maxwidth=8;
		if($(this).text().length>maxwidth){
		$(this).text($(this).text().substring(0,maxwidth));
		$(this).html($(this).html()+'...');
		}
	});		
});

function autoCreateCard(){
	var $name=$("#guideForm #name").val();
	var $sel=$("#guideForm #province").children("option:selected").attr("value");
	var dataVal=$("#guideForm").serialize();
	if($name==""&&$sel==""){
		$("#catProPo,#catNamePo").css("color","#f30");
		return false;
	}else if($sel==""){
		$("#catNamePo").css("color","#888");
		$("#catProPo").css("color","#f30");
		return false;
	}else if($name==""){
		$("#catProPo").css("color","#888");
		$("#catNamePo").css("color","#f30");
		return false;
	}else{
		$.get("/personal/personal/edit?t=guide&data&"+dataVal,function(data){
			var $val=data.replace(/\s/g,'');
			if($val>=1){
				location.reload();
			}else{
				csc.alert("名片生成失败！");
			}
		});
	}
}
function pAlert(obj){csc.alert(obj.desc);}

function relfirend($id, $name) {
            var msg = '<div><textarea id="msg" name="" cols="60" rows="">给对方打个招呼</textarea></div><p class="tips" style="color:#888">提示：也可以直接点击“确定”发送请求。</p>';
            csc.useDialog(function (){
				artDialog({id: "addfriend1",content: msg,fixed: true,title: "发送好友请求",padding: "25px 50px 20px 30px",init: function() {
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
	                    $.get(csc.url("member","/sns/home/addFriend.html"), {"id": $id,"message": $msg,"relname": $name, "ajax":true}, function(data) {
	                      	   if("2"==data.status){
								csc.alert(data.msg);
							 }else   if (data.status) {
	                            csc.success(data.msg, 2);
								var len=$("#interstBox").length;
								if(len){
									ajaxRe('/Ajax/Sns','interstBox');
								}
	                            
	                        } else {
	                            csc.alert(data.msg);
	                        }
	                    }, "jsonp");
	                },cancel: function(){},lock: true});
			});
        }
		
		
       csc.addfriend = function($id) {
		   //alert(1);
		  // seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				//csc.checkSign("toAddFriend($id)");
				//toAddFriend();  todo
			//});
		  //要加处理登录页判断
		   var $name="", sname ='<div class="g-f-msg-box"><input type="text" class="txt" id="uname" value=""/><p class="tps" style="margin-top:6px;"><strong>提示</strong>请输入您的姓名</p></div>';
			$.get(csc.url("member","/public/personal/username"),function(data){
				$name=$.trim(data.username);
				if($name=="NotLogin"){
					/*csc.useDialog(function (){
						csc.alert("您还没有登录，请先登录！");				
					});*/
					seajs.use(csc.url("res","/f=js/m/sign"),function (){			
						csc.checkSign("location.reload");
					});
				}else if (!$name) {
					csc.useDialog(function (){
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
						},cancel:function(){},lock: true});
						})
				} else{
					relfirend($id);
				}
			},"jsonp");
        };
		
	//发布新话题|新活动
function isLogin(url){
	$.get("/interface/islogin.html",function(data){
			if("0"==data.islogin){
				login();
			}else
				location.href=url;
		},"json");
}

//刷新数据（成员数，话题数等）
function updata_numb(){
	if($("#applyUserCount").length){
		$(".list-sel-tr").find("li:eq(2) i").attr("class","n"+$("#applyUserCount").html());
	};
	if($("#newActivityCount").length){
		$(".at-all").find("a:eq(4) i").attr("class","n"+$("#newActivityCount").html());
	};
	if($("#activityWeeklyCount").length){
		$(".list-sel-tr").find("li:eq(1) i").attr("class","n"+$("#activityWeeklyCount").html());
	};
	if($("#sumNumber").length){
		$(".tsc-head").find(".tn-n1-2:eq(1)").html($.trim($("#sumNumber").html()));
		$(".tpc-slip").find("b").html($.trim($("#sumNumber").html()));
	};
	if($("#memberSum").length){
		$(".tsc-head").find(".tn-n1-2:eq(0)").html($.trim($("#memberSum").html()));
	}
	if(typeof hs === "object"){
		try{
			var i = hs.expanders.length-1;
			if (hs.expanders[i] && !hs.expanders[i].onLoadStarted) {
				hs.expanders[i].cancelLoading();
			}
		}catch(e){}
	}
}

//打开登框
function $_open_login(comm){
	csc.useDialog(function(){
		seajs.use(csc.url("res","/f=js/m/sign"),function(){
			csc.checkSign(comm);
		});
	});
}