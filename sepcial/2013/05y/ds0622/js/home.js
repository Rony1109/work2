$(function(){
	//var top = $("#fiexd_nav").position().top;
	$(document).scroll(function(){
		var topscr = $(this).scrollTop();
		if(topscr<705){
			$("#fiexd_nav").removeClass("fiexd_nav");	
		}else{
			$("#fiexd_nav").addClass("fiexd_nav");	
		}
	});	

	$(".m-img,.m-pr05").live("mouseenter",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").css("display","block");
	}).live("mouseleave",function(){
		var $th=$(this);
		$th.children(".li-bg,.li-f").removeAttr("style"); 
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