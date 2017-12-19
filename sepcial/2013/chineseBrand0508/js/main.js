$(function(){
	$("div.c-sig ul .ad-l .ad-l01").live("click",function(){
		var th=$(this);
		var divp=th.siblings(".ad-l05").children("a:visible");
		var num=divp.prevAll().length,maxl=th.siblings(".ad-l05").length;
		if(num==0){
			th.attr("title","第一个");
			th.siblings(".ad-l02").attr("title","下一个");
		}else{
			th.attr("title","上一个");
			th.siblings(".ad-l02").attr("title","下一个");
			divp.css("display","none").prev().css("display","block");
		}
		/*if(divp.is(".ad05")){divp.css("left","-1032px").removeClass().addClass("ad-l05 ad04");}
		if(divp.is(".ad04")){divp.css("left","-774px").removeClass().addClass("ad-l05 ad03");}
		if(divp.is(".ad03")){divp.css("left","-516px").removeClass().addClass("ad-l05 ad02");}
		if(divp.is(".ad02")){divp.css("left","-258px").removeClass().addClass("ad-l05 ad01");}
		if(divp.is(".ad01")){divp.css("left","0").removeClass().addClass("ad-l05 ad01");}*/
	});
	$("div.c-sig ul .ad-l .ad-l02").live("click",function(){
		var th=$(this);
		var divp=th.siblings(".ad-l05").children("a:visible");
		var num=divp.nextAll().length,maxl=th.siblings(".ad-l05").length;
		if(num==0){
			th.attr("title","最后一个");
			th.siblings(".ad-l01").attr("title","上一个");
		}else{
			th.attr("title","下一个");
			th.siblings(".ad-l01").attr("title","上一个");
			divp.css("display","none").next().css("display","block");
		}
		/*if(divp.is(".ad05")){divp.css("left","-1032px").removeClass().addClass("ad-l05 ad05");}
		if(divp.is(".ad04")){divp.css("left","-1032px").removeClass().addClass("ad-l05 ad05");}
		if(divp.is(".ad03")){divp.css("left","-774px").removeClass().addClass("ad-l05 ad04");}
		if(divp.is(".ad02")){divp.css("left","-516px").removeClass().addClass("ad-l05 ad03");}
		if(divp.is(".ad01")){divp.css("left","-258px").removeClass().addClass("ad-l05 ad02");}*/
	});
});

var csc=csc||{};
//加好友
var addfriendAct = function($id) {
  csc.useDialog(function(){	
		seajs.use(csc.url("res","/f=js/m/sign"),function(){
			csc.checkSign();
		});
	});
  //要加处理登录页判断
   var $name="", sname ='<div class="g-f-msg-box"><input type="text" class="txt" id="uname" value=""/><p class="tps" style="margin-top:6px;"><strong>提示</strong>请输入您的姓名</p></div>';
	$.get(csc.url("member","/public/personal/username"),function(data){
		$name=$.trim(data.username);
		if($name=="NotLogin"){
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
//交互名片
function cardfriend(fuid, obj) {
    $.post(csc.url("member","/public/personal/card"), {"t": "change","fuid": fuid},function(data){
        if ("sns_cardchange_000" == data.code) {
        	csc.useDialog(function (){csc.success("交换成功");})
        } else if("sns_cardchange_003"==data.code){
           csc.useDialog(function (){ csc.success("名片已收");})
        }else if("login_fail"==data.code){
			login();
		}else{
        	csc.alert("操作失败,请重试"); 
        }
    },'jsonp');
}
//提交表单
function subForm(){
	$(".addi-r table td span").html("");
	var companyname=$("input[name=companyname]").val(),
		industry=$("input[name=industry]").val(),
		contact=$("input[name=contact]").val(),
		tel=$("input[name=tel]").val(),
		qq=$("input[name=qq]").val();
	//var regval=tel.search(/^([0-9]{11})?$/);
	var qqval=(/^([1-9]\d*)$/).test(qq);
	var qqt=!(qq==""||qqval);
	if(companyname==""||contact==""||tel==""||qqt){
		if(companyname==""){$("input[name=companyname]").siblings("span").html("*")}
		if(contact==""){$("input[name=contact]").siblings("span").html("*")}
		if(tel==""){$("input[name=tel]").siblings("span").html("*")}
		if(qqt){$("input[name=qq]").siblings("span").html("*");}
		return false;
	}
	$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 15,"subtype": "ajax","dosubmit":"活动信息","info[companyname]":companyname,"info[industry]":industry,"info[contact]":contact,"info[tel]":tel,"info[qq]":qq},function(data){
			if(data.status == true){
				alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
				$("input[name=companyname]").val("");
				$("input[name=industry]").val("");
				$("input[name=contact]").val("");
				$("input[name=tel]").val("");
				$("input[name=qq]").val("");
			}else{
				alert("申请失败，请刷新后重试！");
			}
		},"jsonp");
}

//加入圈子
csc.addCircleCircleId = "";csc.addCircleObj = null;
csc.addCircleCommC = function(){
	$.get("http://quan.csc86.com/doCircle?t=authC&circleId="+csc.addCircleCircleId,function(data){
		var $val=data.code;
		if($val=="NO_POWER"){//无权加入
			csc.alert("你的身份不满足加入该圈子！")	
		}else if($val=="join_000"){//已加入
			csc.alert("已加入");
		}else if($val=="join_001"){//己审请
			csc.alert("您已经申请加入该圈子，请等待审核");
		}else if($val=="LOGIN_FAIL"){//未登陆
			login();
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
					$.get("http://quan.csc86.com/doCircle?t=addC&circleId="+csc.addCircleCircleId+"&"+$("#addCircleForm").serialize(),function(data){
								var val=data.code;
								if("join_001"==val){
									csc.success("申请加入成功！");
								}else if("join_000"==val){
									csc.success("您已成功加入！");
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
csc.addCircleCncms=function(circleId,o){
	csc.addCircleCircleId = circleId;
	csc.addCircleObj = $(o);
	csc.useDialog(function(){
		csc.addCircleCommC();
	})
};