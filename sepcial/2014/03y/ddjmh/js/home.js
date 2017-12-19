
function bname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
				artDialog({padding:"0",content:'<div class="tablewidth"><h1 class="lay-h1">优质供应商报名订座</h1><div class="g-h-30"></div><ul><li class="l">企业名称</li><li class="r"><input type="text" class="lay-input02" name="cy"/><span></span></li></ul>'+
			'<ul><li class="l">联系人</li><li class="r"><input type="text" class="lay-input02" name="name"/><span></span></li></ul>'+
			'<ul><li class="l">联系电话</li><li class="r"><input type="text" class="lay-input02" name="tel"/></li></ul>'+
			'<ul><li class="l">主营产品</li><li class="r"><input type="text" class="lay-input02" name="str"/></li></ul>'+
			'<ul><li class="l">对哪个订单感兴趣？</li><li class="r"><input type="text" class="lay-input" name="xq"/></li></ul><div class="g-h-10"></div></div>',fixed: false,lock:'false',ok: function(){
			$(".tablewidth span").removeClass("cur");
			var cy=$("input[name=cy]").val(),
			name=$("input[name=name]").val(),
			tel=$("input[name=tel]").val(),
			str=$("input[name=str]").val(),
			xq=$("input[name=xq]").val();
			if(cy==''||name==''){
				if(cy==""){$("input[name=cy]").siblings("span").addClass("cur");}
				if(name==""){$("input[name=name]").siblings("span").addClass("cur");}
				return false;
			}
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid":48,"subtype": "ajax","dosubmit":"订单见面会",
			
					 "info[qiye01]":cy,"info[lianxiuren]":name,"info[liaxi]":tel,"info[zhuying]":str,"info[xingqu]":xq},
				function(data){
					if(data.status == true){
						alert("亲，您填写的信息提交成功！");
					}else{
						alert("信息提交失败！");
					}
				},"jsonp");	
			},okVal: '确认'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

function bnametwo(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
					artDialog({padding:"0",id:"atrbtn",content:'<div class="tablewidth"><h1 class="lay-h1">优质采购商发布订单</h1><div class="g-h-30"></div><div class="tolink"><a class="lay-l" href="javascript:;" onclick="infotwo()"></a><a class="lay-r" href="http://member.csc86.com/inquiry/openpublish.html" target="_blank"></a></div><div class="g-h-10"></div></div>',fixed: false,lock:'false'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

function infotwo(){
	art.dialog({id:'atrbtn'}).close();
	artDialog({padding:"0",content:'<div class="tablewidth"><h1 class="lay-h1">优质采购商发布订单</h1><div class="g-h-30"></div><ul><li class="l">企业名称</li><li class="r"><input type="text" class="lay-input02" name="cy"/><span></span></li></ul>'+
	'<ul><li class="l">联系人</li><li class="r"><input type="text" class="lay-input02" name="name"/><span></span></li></ul>'+
	'<ul><li class="l">联系电话</li><li class="r"><input type="text" class="lay-input02" name="tel"/></li></ul>'+
	'<ul><li class="l">订单详情</li><li class="r"><input type="text" class="lay-input02" name="str"/></li></ul><div class="g-h-10"></div></div><a class="lay-alink" href="http://member.csc86.com/inquiry/openpublish.html" target="_blank">自行发布订单</a>',fixed: false,lock:'false',ok: function(){
	$(".tablewidth span").removeClass("cur");
	var cy=$("input[name=cy]").val(),
	name=$("input[name=name]").val(),
	tel=$("input[name=tel]").val(),
	str=$("input[name=str]").val();
	if(cy==''||name==''){
		if(cy==""){$("input[name=cy]").siblings("span").addClass("cur");}
		if(name==""){$("input[name=name]").siblings("span").addClass("cur");}
		return false;
	}
	$.post("http://cncms.csc86.com/formguide/index.php",{"formid":50,"subtype": "ajax","dosubmit":"订单见面会",
			 "info[qiye02]":cy,"info[lianxi]":name,"info[dianh]":tel,"info[xiangqing]":str},
		function(data){
			if(data.status == true){
				alert("亲，您填写的信息提交成功！");
			}else{
				alert("信息提交失败！");
			}
		},"jsonp");	
	},okVal: '确认',init:function(){
		$(".aui_c button.aui_state_highlight").css("background","url(images/btn02.png) no-repeat left top");
	}});
}

$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-sign-info").find("span.bd").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");
	
	$.get(csc.url("api","/api/search/hotkey"),function (data){
		var con=$("#dist-list");
		var str='';
		for(var i = 0,len = data.length;i<len;i++){
			str+='<li><a target="_blank" href="http://search.csc86.com/offer/products.html?q='+encodeURIComponent(data[i])+'">'+data[i]+'</a></li>';
			//console.log(data[i]);
		}
		
		$("#didst-list").html(str);
		//console.log(str);
	},"jsonp");
});